import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type StrokePoint = { x: number; y: number };
export type StrokeEvent = {
  type: "stroke";
  color: string;
  size: number;
  tool: "brush" | "eraser";
  points: StrokePoint[];
};
export type ClearEvent = { type: "clear" };
export type FillEvent = { type: "fill"; x: number; y: number; color: string };
export type UndoEvent = { type: "undo" };
export type DrawEvent = StrokeEvent | ClearEvent | FillEvent | UndoEvent;

export type DrawTool = "brush" | "eraser" | "fill";

export const PALETTE = [
  "#000000", "#7F7F7F", "#C1C1C1", "#FFFFFF",
  "#EF4444", "#F97316", "#F59E0B", "#EAB308",
  "#22C55E", "#10B981", "#06B6D4", "#3B82F6",
  "#6366F1", "#8B5CF6", "#EC4899", "#A0522D",
];

export const SIZES = [4, 8, 14, 22, 32];

const CANVAS_W = 900;
const CANVAS_H = 600;

export function useDrawingCanvas(opts: {
  roomId: string | null;
  canDraw: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef<StrokePoint[]>([]);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(8);
  const [tool, setTool] = useState<DrawTool>("brush");

  const setupCtx = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return null;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctxRef.current = ctx;
    return ctx;
  }, []);

  const pushHistory = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    historyRef.current.push(ctx.getImageData(0, 0, CANVAS_W, CANVAS_H));
    if (historyRef.current.length > 30) historyRef.current.shift();
  }, []);

  const clearCanvas = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }, []);

  const drawStroke = useCallback((ev: StrokeEvent) => {
    const ctx = ctxRef.current;
    if (!ctx || ev.points.length === 0) return;
    ctx.strokeStyle = ev.tool === "eraser" ? "#FFFFFF" : ev.color;
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = ev.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (ev.points.length === 1) {
      const p = ev.points[0];
      ctx.beginPath();
      ctx.arc(p.x, p.y, ev.size / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(ev.points[0].x, ev.points[0].y);
    for (let i = 1; i < ev.points.length; i++) {
      ctx.lineTo(ev.points[i].x, ev.points[i].y);
    }
    ctx.stroke();
  }, []);

  const floodFill = useCallback((sx: number, sy: number, hex: string) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    if (ix < 0 || iy < 0 || ix >= CANVAS_W || iy >= CANVAS_H) return;
    const img = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
    const data = img.data;
    const target = getPixel(data, ix, iy);
    const replace = hexToRgba(hex);
    if (colorsEqual(target, replace)) return;
    // Scanline flood fill — fast & avoids deep stacks.
    const stack: [number, number][] = [[ix, iy]];
    while (stack.length) {
      const [x0, y] = stack.pop()!;
      let xL = x0;
      while (xL >= 0 && colorsEqual(getPixel(data, xL, y), target)) xL--;
      let xR = x0;
      while (xR < CANVAS_W && colorsEqual(getPixel(data, xR, y), target)) xR++;
      for (let x = xL + 1; x < xR; x++) {
        setPixel(data, x, y, replace);
        if (y > 0 && colorsEqual(getPixel(data, x, y - 1), target)) stack.push([x, y - 1]);
        if (y < CANVAS_H - 1 && colorsEqual(getPixel(data, x, y + 1), target)) stack.push([x, y + 1]);
      }
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  const applyEvent = useCallback((ev: DrawEvent) => {
    if (ev.type === "stroke") drawStroke(ev);
    else if (ev.type === "clear") clearCanvas();
    else if (ev.type === "fill") floodFill(ev.x, ev.y, ev.color);
    else if (ev.type === "undo") {
      const prev = historyRef.current.pop();
      const ctx = ctxRef.current;
      if (prev && ctx) ctx.putImageData(prev, 0, 0);
    }
  }, [drawStroke, clearCanvas, floodFill]);

  // Setup canvas
  useEffect(() => {
    const ctx = setupCtx();
    if (!ctx) return;
    clearCanvas();
  }, [setupCtx, clearCanvas]);

  // Realtime channel
  useEffect(() => {
    if (!opts.roomId) return;
    const ch = supabase.channel(`draw:${opts.roomId}`, { config: { broadcast: { self: false } } })
      .on("broadcast", { event: "draw" }, (msg) => {
        const ev = msg.payload as DrawEvent;
        applyEvent(ev);
      })
      .on("broadcast", { event: "request_snapshot" }, () => {
        // current drawer responds with a snapshot
        if (!opts.canDraw) return;
        const c = canvasRef.current;
        if (!c) return;
        const dataUrl = c.toDataURL("image/png", 0.6);
        ch.send({ type: "broadcast", event: "snapshot", payload: { dataUrl } });
      })
      .on("broadcast", { event: "snapshot" }, (msg) => {
        if (opts.canDraw) return; // only spectators apply snapshot
        const { dataUrl } = msg.payload as { dataUrl: string };
        const img = new Image();
        img.onload = () => {
          const ctx = ctxRef.current;
          if (ctx) ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
        };
        img.src = dataUrl;
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED" && !opts.canDraw) {
          // ask drawer for snapshot
          ch.send({ type: "broadcast", event: "request_snapshot", payload: {} });
        }
      });
    channelRef.current = ch;
    return () => { supabase.removeChannel(ch); channelRef.current = null; };
  }, [opts.roomId, opts.canDraw, applyEvent]);

  const sendEvent = useCallback((ev: DrawEvent) => {
    const ch = channelRef.current;
    if (!ch) return;
    ch.send({ type: "broadcast", event: "draw", payload: ev });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!opts.canDraw) return;
    const c = canvasRef.current;
    if (!c) return;
    c.setPointerCapture(e.pointerId);
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_W;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    if (tool === "fill") {
      pushHistory();
      const ev: FillEvent = { type: "fill", x, y, color };
      applyEvent(ev);
      sendEvent(ev);
      return;
    }
    pushHistory();
    drawingRef.current = true;
    currentStrokeRef.current = [{ x, y }];
    const ev: StrokeEvent = { type: "stroke", color, size, tool: tool === "eraser" ? "eraser" : "brush", points: [{ x, y }] };
    applyEvent(ev);
    sendEvent(ev);
  }, [opts.canDraw, tool, color, size, applyEvent, sendEvent, pushHistory]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!opts.canDraw || !drawingRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_W;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    const last = currentStrokeRef.current[currentStrokeRef.current.length - 1];
    if (Math.hypot(last.x - x, last.y - y) < 1.5) return;
    currentStrokeRef.current.push({ x, y });
    const seg: StrokeEvent = {
      type: "stroke", color, size,
      tool: tool === "eraser" ? "eraser" : "brush",
      points: [last, { x, y }],
    };
    applyEvent(seg);
    sendEvent(seg);
  }, [opts.canDraw, color, size, tool, applyEvent, sendEvent]);

  const onPointerUp = useCallback(() => {
    drawingRef.current = false;
    currentStrokeRef.current = [];
  }, []);

  const undo = useCallback(() => {
    if (!opts.canDraw) return;
    const prev = historyRef.current.pop();
    const ctx = ctxRef.current;
    if (prev && ctx) ctx.putImageData(prev, 0, 0);
    sendEvent({ type: "undo" });
  }, [opts.canDraw, sendEvent]);

  const clearAll = useCallback(() => {
    if (!opts.canDraw) return;
    pushHistory();
    clearCanvas();
    sendEvent({ type: "clear" });
  }, [opts.canDraw, clearCanvas, sendEvent, pushHistory]);

  // Reset canvas when room/drawer changes (handled by parent via key)
  return {
    canvasRef, color, setColor, size, setSize, tool, setTool,
    onPointerDown, onPointerMove, onPointerUp, undo, clearAll,
    canvasWidth: CANVAS_W, canvasHeight: CANVAS_H,
  };
}

function getPixel(data: Uint8ClampedArray, x: number, y: number) {
  const i = (y * CANVAS_W + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]] as [number, number, number, number];
}
function setPixel(data: Uint8ClampedArray, x: number, y: number, c: [number, number, number, number]) {
  const i = (y * CANVAS_W + x) * 4;
  data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = c[3];
}
function colorsEqual(a: [number, number, number, number], b: [number, number, number, number]) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function hexToRgba(hex: string): [number, number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b, 255];
}
