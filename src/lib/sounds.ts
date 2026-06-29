// Lightweight synthesized sound effects via Web Audio (no asset downloads).
let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    } catch { return null; }
  }
  return ctx;
}

export function setMuted(v: boolean) {
  muted = v;
  if (typeof window !== "undefined") localStorage.setItem("draw_muted", v ? "1" : "0");
}
export function isMuted() {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("draw_muted") === "1") muted = true;
  return muted;
}

function tone(freq: number, dur = 0.12, type: OscillatorType = "sine", gain = 0.15) {
  if (isMuted()) return;
  const c = getCtx(); if (!c) return;
  if (c.state === "suspended") c.resume().catch(() => {});
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type; osc.frequency.value = freq;
  g.gain.value = 0; g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(g); g.connect(c.destination);
  osc.start(); osc.stop(c.currentTime + dur + 0.02);
}

function sequence(notes: Array<[number, number]>, type: OscillatorType = "sine", gain = 0.15) {
  let t = 0;
  notes.forEach(([f, d]) => {
    setTimeout(() => tone(f, d, type, gain), t * 1000);
    t += d;
  });
}

export const sfx = {
  click: () => tone(620, 0.05, "square", 0.08),
  join: () => sequence([[523, 0.08], [784, 0.12]], "triangle", 0.12),
  leave: () => sequence([[523, 0.08], [392, 0.12]], "triangle", 0.1),
  correct: () => sequence([[523, 0.08], [659, 0.08], [784, 0.15]], "triangle", 0.14),
  close: () => tone(440, 0.08, "sine", 0.1),
  yourTurn: () => sequence([[698, 0.1], [880, 0.18]], "sine", 0.16),
  tick: () => tone(900, 0.05, "square", 0.05),
  roundEnd: () => sequence([[523, 0.12], [392, 0.18]], "sine", 0.14),
  gameEnd: () => sequence([[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.25]], "triangle", 0.16),
  message: () => tone(560, 0.04, "sine", 0.06),
};
