import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Loader2, Copy, LogOut, Crown, Play, Pencil, Eraser, PaintBucket,
  Trash2, Undo2, Send, Clock, Settings, Users, Share2, Palette, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGuestSession, loadProfile, saveProfile, AVATAR_COLORS } from "@/hooks/use-guest";
import { useRoom } from "@/hooks/use-room";
import {
  useDrawingCanvas, PALETTE, SIZES,
} from "@/hooks/use-drawing-canvas";
import {
  joinRoom, leaveRoom, startGame, chooseWord, submitGuess, endRound,
  nextTurn, updateRoomSettings, revealLetter, resetGame, kickPlayer, autoChooseWord,
} from "@/lib/game.functions";
import { sfx } from "@/lib/sounds";

export const Route = createFileRoute("/room/$code")({
  head: ({ params }) => ({
    meta: [
      { title: `اتاق ${params.code} — نقاشک` },
      { name: "description", content: "بازی نقاشی آنلاین" },
    ],
  }),
  component: RoomPage,
});

function RoomPage() {
  const { code } = Route.useParams();
  const navigate = useNavigate();
  const { userId, loading: authLoading } = useGuestSession();
  const { room, players, messages, myWord, loading, notFound, roomId, refetchRoom } = useRoom(code, userId);
  const [profile, setProfile] = useState(() => loadProfile());
  const joinRoomFn = useServerFn(joinRoom);
  const leaveRoomFn = useServerFn(leaveRoom);
  const startGameFn = useServerFn(startGame);

  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Unmount and window unload cleanup
  const cleanupRef = useRef({ roomId, userId, players, leaveRoomFn });
  useEffect(() => {
    cleanupRef.current = { roomId, userId, players, leaveRoomFn };
  });

  useEffect(() => {
    const handleUnload = () => {
      const { roomId, userId, players, leaveRoomFn } = cleanupRef.current;
      if (roomId && userId && players.some(p => p.user_id === userId)) {
        leaveRoomFn({ data: { roomId } }).catch(() => {});
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, []);

  // Kicked check
  useEffect(() => {
    if (!loading && players.length > 0 && userId) {
      const me = players.find(p => p.user_id === userId);
      if (me) {
        setHasJoined(true);
      } else if (hasJoined) {
        sessionStorage.setItem(`kicked_${code}`, "true");
        toast.error("شما از اتاق اخراج شدید");
        navigate({ to: "/" });
      }
    }
  }, [players, loading, userId, hasJoined, code, navigate]);

  // Auto-join if not in room
  useEffect(() => {
    if (!userId || !room || loading) return;
    if (!profile.nickname) return; // name entry handled by JoinFormOverlay
    const me = players.find(p => p.user_id === userId);
    if (me) return;
    if (joining) return;
    if (hasJoined) return;
    if (sessionStorage.getItem(`kicked_${code}`)) {
      toast.error("شما از این اتاق اخراج شده‌اید");
      navigate({ to: "/" });
      return;
    }
    setJoining(true);
    joinRoomFn({ data: { code, nickname: profile.nickname, avatarColor: profile.avatarColor } })
      .catch(e => {
        toast.error(e instanceof Error ? e.message : "خطا");
        navigate({ to: "/" });
      })
      .finally(() => setJoining(false));
  }, [userId, room, players, loading, joining, code, profile, navigate, joinRoomFn, hasJoined]);

  if (authLoading || loading) {
    return <CenterLoading text="در حال آماده‌سازی..." />;
  }

  if (!profile.nickname) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Toaster richColors position="top-center" dir="rtl" />
        <JoinFormOverlay
          code={code}
          onJoin={(name, color) => {
            const newProfile = { nickname: name, avatarColor: color };
            saveProfile(newProfile);
            setProfile(newProfile);
          }}
        />
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="paper-card p-8 text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">اتاق پیدا نشد</h2>
          <p className="text-muted-foreground">شاید کد اشتباه است یا اتاق بسته شده.</p>
          <Button onClick={() => navigate({ to: "/" })}>برگشت به خانه</Button>
        </Card>
      </div>
    );
  }
  if (!room || !roomId || !userId) return <CenterLoading text="..." />;

  const me = players.find(p => p.user_id === userId);
  const isHost = room.host_id === userId;
  const isDrawer = room.current_drawer_id === userId;
  const drawer = players.find(p => p.user_id === room.current_drawer_id);

  return (
    <main className="min-h-screen p-3 md:p-5" dir="rtl">
      <Toaster richColors position="top-center" dir="rtl" />
      <div className="mx-auto max-w-7xl space-y-4">
        <TopBar
          code={code}
          status={room.status}
          round={room.current_round}
          totalRounds={room.total_rounds}
          isHost={isHost}
          onLeave={async () => {
            await leaveRoomFn({ data: { roomId } }).catch(() => {});
            navigate({ to: "/" });
          }}
        />

        {room.status === "waiting" && (
          <WaitingRoom
            room={room} players={players} userId={userId} isHost={isHost}
            roomId={roomId} refetchRoom={refetchRoom}
            onStart={async () => {
              try {
                await startGameFn({ data: { roomId } });
                await refetchRoom();
              }
              catch (e) { toast.error(e instanceof Error ? e.message : "خطا"); }
            }}
          />
        )}

        {room.status !== "waiting" && me && (
          <GameView
            room={room} players={players} messages={messages}
            userId={userId} isDrawer={isDrawer} isHost={isHost}
            roomId={roomId} myWord={myWord} drawerName={drawer?.nickname ?? "—"}
            drawerColor={drawer?.avatar_color ?? "#888"}
            refetchRoom={refetchRoom}
          />
        )}
      </div>
    </main>
  );
}

function CenterLoading({ text }: { text: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

function TopBar({
  code, status, round, totalRounds, isHost, onLeave,
}: {
  code: string; status: string; round: number; totalRounds: number; isHost: boolean; onLeave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  const share = () => {
    const url = `${window.location.origin}/room/${code}`;
    if (navigator.share) navigator.share({ title: "نقاشک", text: `بیا بازی کنیم! کد: ${code}`, url }).catch(()=>{});
    else { navigator.clipboard.writeText(url); toast.success("لینک کپی شد"); }
  };
  return (
    <Card className="paper-card flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="font-black text-xl">نقاشک</div>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm font-mono font-bold tracking-widest hover:bg-muted/70">
          {code} <Copy className="size-3.5" />
        </button>
        {copied && <span className="text-xs text-success">کپی شد</span>}
        <Button size="sm" variant="ghost" onClick={share}><Share2 className="size-4" /></Button>
      </div>
      <div className="flex items-center gap-3">
        {status !== "waiting" && (
          <div className="text-sm font-semibold">
            دور {round}/{totalRounds}
          </div>
        )}
        {isHost && <span className="text-xs bg-accent/40 px-2 py-1 rounded-full"><Crown className="size-3 inline" /> میزبان</span>}
        <Button size="sm" variant="outline" onClick={onLeave}>
          <LogOut className="size-4" /> خروج
        </Button>
      </div>
    </Card>
  );
}

function WaitingRoom({
  room, players, userId, isHost, roomId, onStart, refetchRoom,
}: {
  room: ReturnType<typeof useRoom>["room"]; players: ReturnType<typeof useRoom>["players"];
  userId: string; isHost: boolean; roomId: string; onStart: () => void; refetchRoom: () => Promise<void>;
}) {
  const updateFn = useServerFn(updateRoomSettings);
  const [saving, setSaving] = useState(false);
  const [wordsText, setWordsText] = useState((room?.custom_words ?? []).join("\n"));

  const update = async (patch: Record<string, unknown>) => {
    setSaving(true);
    try {
      await updateFn({ data: { roomId, ...patch } as any });
      await refetchRoom();
    }
    catch (e) { toast.error(e instanceof Error ? e.message : "خطا"); }
    finally { setSaving(false); }
  };

  if (!room) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card className="paper-card p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="size-5" /> تنظیمات اتاق</h2>
          {!isHost && <p className="text-sm text-muted-foreground mt-1">فقط میزبان می‌تواند تنظیمات را تغییر دهد.</p>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SettingNumber
            label="تعداد بازیکن (2–12)" value={room.max_players} min={2} max={12}
            disabled={!isHost || saving} onChange={(v) => update({ maxPlayers: v })}
          />
          <SettingNumber
            label="تعداد دور (1–25)" value={room.total_rounds} min={1} max={25}
            disabled={!isHost || saving} onChange={(v) => update({ totalRounds: v })}
          />
          <SettingNumber
            label="زمان هر دور — ثانیه (30–200)" value={room.round_seconds} min={30} max={200} step={5}
            disabled={!isHost || saving} onChange={(v) => update({ roundSeconds: v })}
          />
          <SettingNumber
            label="زمان انتخاب کلمه — ثانیه (5–30)"
            value={room.choose_seconds ?? 15}
            min={5} max={30}
            disabled={!isHost || saving} onChange={(v) => update({ chooseSeconds: v })}
          />
          <SettingSelect
            label="زبان" value={room.language}
            options={[["fa","فارسی"],["en","انگلیسی"],["both","هر دو"]]}
            disabled={!isHost || saving}
            onChange={(v) => update({ language: v })}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={room.is_public} disabled={!isHost || saving}
              onChange={e => update({ isPublic: e.target.checked })} className="size-4" />
            اتاق عمومی (در لابی نمایش داده شود)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={room.use_custom_only} disabled={!isHost || saving}
              onChange={e => update({ useCustomOnly: e.target.checked })} className="size-4" />
            فقط از کلمات سفارشی من استفاده کن
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">کلمات سفارشی (با خط جدید یا کاما)</label>
            <a
              href="https://chat.deepseek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium animate-pulse"
            >
              <Sparkles className="size-3 text-primary" />
              <span>ایده گرفتن با هوش مصنوعی DeepSeek</span>
            </a>
          </div>
          <textarea
            value={wordsText} disabled={!isHost || saving}
            onChange={e => setWordsText(e.target.value)}
            onBlur={() => {
              if (!isHost) return;
              const arr = wordsText.split(/[\n,،]/).map(s => s.trim()).filter(Boolean).slice(0, 200);
              update({ customWords: arr });
            }}
            rows={5} placeholder="مثال: گربه، خانه، آفتاب"
            className="w-full rounded-md border bg-input/30 p-3 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            {(room.custom_words ?? []).length} کلمه سفارشی ذخیره شده
          </p>
        </div>

        {isHost ? (
          <Button onClick={onStart} disabled={players.length < 2 || saving} size="lg" className="w-full h-14 text-lg">
            <Play className="size-5" />
            {players.length < 2 ? "حداقل ۲ بازیکن لازم است" : saving ? "در حال ذخیره..." : "شروع بازی"}
          </Button>
        ) : (
          <div className="text-center p-4 rounded-md bg-muted text-muted-foreground">
            منتظر شروع بازی توسط میزبان...
          </div>
        )}
      </Card>

      <Card className="paper-card p-5 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Users className="size-4" /> بازیکنان ({players.length}/{room.max_players})</h3>
        <div className="space-y-2">
          {players.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <div className="size-9 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: p.avatar_color }}>
                {p.nickname.slice(0,1).toUpperCase()}
              </div>
              <span className="font-medium flex-1">{p.nickname}</span>
              {p.user_id === room.host_id && <Crown className="size-4 text-warning" />}
              {p.user_id === userId && <span className="text-xs text-muted-foreground">(تو)</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SettingSelect<T extends string | number>({
  label, value, options, disabled, onChange,
}: {
  label: string; value: T;
  options: T[] | [T, string][];
  disabled?: boolean;
  onChange: (v: T) => void;
}) {
  const opts: [T, string][] = options.map(o =>
    Array.isArray(o) ? (o as [T, string]) : [o as T, String(o)],
  );
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={String(value)} disabled={disabled}
        onChange={e => {
          const v = typeof opts[0][0] === "number" ? Number(e.target.value) as T : (e.target.value as T);
          onChange(v);
        }}
        className="w-full h-10 rounded-md border bg-input/30 px-3 text-sm disabled:opacity-50"
      >
        {opts.map(([v, l]) => <option key={String(v)} value={String(v)}>{l}</option>)}
      </select>
    </div>
  );
}

function SettingNumber({
  label, value, min, max, step = 1, disabled, onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number;
  disabled?: boolean; onChange: (v: number) => void;
}) {
  const [tempVal, setTempVal] = useState(String(value));

  useEffect(() => {
    setTempVal(String(value));
  }, [value]);

  const commit = () => {
    const parsed = Number(tempVal);
    const n = Math.max(min, Math.min(max, Number.isFinite(parsed) ? parsed : min));
    setTempVal(String(n));
    onChange(n);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="number" min={min} max={max} step={step} value={tempVal} disabled={disabled}
        onChange={e => setTempVal(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); commit(); (e.target as HTMLInputElement).blur(); } }}
        className="w-full h-10 rounded-md border bg-input/30 px-3 text-sm disabled:opacity-50"
      />
    </div>
  );
}


function GameView({
  room, players, messages, userId, isDrawer, isHost, roomId, myWord, drawerName, drawerColor, refetchRoom,
}: {
  room: NonNullable<ReturnType<typeof useRoom>["room"]>;
  players: ReturnType<typeof useRoom>["players"];
  messages: ReturnType<typeof useRoom>["messages"];
  userId: string; isDrawer: boolean; isHost: boolean; roomId: string;
  myWord: string | null;
  drawerName: string; drawerColor: string;
  refetchRoom: () => Promise<void>;
}) {
  const chooseWordFn = useServerFn(chooseWord);
  const endRoundFn = useServerFn(endRound);
  const nextTurnFn = useServerFn(nextTurn);
  const revealFn = useServerFn(revealLetter);
  const resetFn = useServerFn(resetGame);

  // Timer
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const remaining = room.round_ends_at
    ? Math.max(0, Math.ceil((new Date(room.round_ends_at).getTime() - now) / 1000))
    : null;

  // Auto-end round when timer hits 0 (drawer triggers)
  const endTriggeredRef = useRef<string | null>(null);
  useEffect(() => {
    if (!isDrawer || room.status !== "drawing" || !room.round_ends_at) return;
    if (remaining !== 0) return;
    const key = room.round_ends_at;
    if (endTriggeredRef.current === key) return;
    endTriggeredRef.current = key;
    endRoundFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {});
  }, [remaining, isDrawer, room.status, room.round_ends_at, roomId, endRoundFn, refetchRoom]);

  // Auto-pick word if drawer doesn't choose in time (host triggers)
  const autoChooseRef = useRef<string | null>(null);
  const autoChooseFn = useServerFn(autoChooseWord);
  useEffect(() => {
    if (!isHost || room.status !== "choosing" || !room.round_ends_at) return;
    if (remaining !== 0) return;
    const key = `c-${room.round_ends_at}`;
    if (autoChooseRef.current === key) return;
    autoChooseRef.current = key;
    autoChooseFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {});
  }, [remaining, isHost, room.status, room.round_ends_at, roomId, autoChooseFn, refetchRoom]);

  // Sound effects on state transitions
  const prevStatusRef = useRef(room.status);
  const prevDrawerRef = useRef(room.current_drawer_id);
  useEffect(() => {
    const prev = prevStatusRef.current;
    if (prev !== room.status) {
      if (room.status === "drawing") sfx.yourTurn();
      else if (room.status === "round_end") sfx.roundEnd();
      else if (room.status === "game_end") sfx.gameEnd();
      prevStatusRef.current = room.status;
    }
    if (prevDrawerRef.current !== room.current_drawer_id) {
      if (room.current_drawer_id === userId) sfx.yourTurn();
      prevDrawerRef.current = room.current_drawer_id;
    }
  }, [room.status, room.current_drawer_id, userId]);

  // Tick on low time
  useEffect(() => {
    if (room.status === "drawing" && remaining !== null && remaining > 0 && remaining <= 5) sfx.tick();
  }, [remaining, room.status]);

  // Reveal letter at half time (drawer triggers)
  const revealTriggeredRef = useRef<string | null>(null);
  useEffect(() => {
    if (!isDrawer || room.status !== "drawing" || !room.round_ends_at || !room.round_started_at) return;
    const started = new Date(room.round_started_at).getTime();
    const ends = new Date(room.round_ends_at).getTime();
    const total = (ends - started) / 1000;
    const elapsed = (now - started) / 1000;
    if (elapsed < total / 2) return;
    const key = `${room.current_round}-${room.current_turn}-${room.current_drawer_id}`;
    if (revealTriggeredRef.current === key) return;
    revealTriggeredRef.current = key;
    revealFn({ data: { roomId } }).catch(() => {});
  }, [isDrawer, room.status, room.round_ends_at, room.round_started_at,
      room.current_round, room.current_turn, room.current_drawer_id, now, roomId, revealFn]);

  // Auto next turn after round_end (host triggers after small delay)
  useEffect(() => {
    if (!isHost || room.status !== "round_end") return;
    const id = setTimeout(() => {
      nextTurnFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {});
    }, 4500);
    return () => clearTimeout(id);
  }, [isHost, room.status, room.current_round, room.current_turn, roomId, nextTurnFn, refetchRoom]);

  const canvas = useDrawingCanvas({ roomId, canDraw: isDrawer && room.status === "drawing" });

  // Reset canvas when drawer changes
  const drawerKey = `${room.current_drawer_id}-${room.current_round}-${room.current_turn}`;
  const lastKeyRef = useRef(drawerKey);
  useEffect(() => {
    if (lastKeyRef.current !== drawerKey) {
      lastKeyRef.current = drawerKey;
      const c = canvas.canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        if (ctx) { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.canvasWidth, canvas.canvasHeight); }
      }
    }
  }, [drawerKey, canvas]);

  const meScore = players.find(p => p.user_id === userId)?.score ?? 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr_300px]">
      <Scoreboard
        players={players} userId={userId} drawerId={room.current_drawer_id}
        hostId={room.host_id} roomId={roomId}
      />

      <div className="space-y-3">
        {/* Horizontal ad banner above canvas */}
        <aside data-ad-slot className="min-h-[70px] w-full flex items-center justify-center text-xs text-muted-foreground bg-muted/30 border border-dashed border-border rounded-lg">
          تبلیغات
        </aside>

        <Card className="paper-card p-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: drawerColor }}>
              {drawerName.slice(0,1).toUpperCase()}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">نقاش</div>
              <div className="font-bold">{drawerName} {isDrawer && "(تو)"}</div>
            </div>
          </div>
          <WordDisplay
            status={room.status} isDrawer={isDrawer} myWord={myWord} mask={room.word_mask}
          />
          {remaining !== null && (
            <div className={`flex items-center gap-1.5 font-bold text-lg ${remaining <= 10 ? "text-destructive" : ""}`}>
              <Clock className="size-5" /> {remaining}
            </div>
          )}
        </Card>

        <div className="relative">
          <CanvasArea canvas={canvas} canDraw={isDrawer && room.status === "drawing"} />
          {room.status === "choosing" && (
            <ChoosingOverlay
              isDrawer={isDrawer} choices={room.word_choices ?? []} drawerName={drawerName}
              remaining={remaining}
              onChoose={async (w) => {
                try {
                  await chooseWordFn({ data: { roomId, word: w } });
                  await refetchRoom();
                }
                catch (e) { toast.error(e instanceof Error ? e.message : "خطا"); }
              }}
            />
          )}
          {room.status === "round_end" && (
            <RoundEndOverlay players={players} word={room.word_mask ?? ""} />
          )}
          {room.status === "game_end" && (
            <GameEndOverlay
              players={players} isHost={isHost}
              onPlayAgain={async () => { await resetFn({ data: { roomId } }).catch(() => {}); }}
            />
          )}
        </div>

        {isDrawer && room.status === "drawing" && (
          <Toolbar canvas={canvas} />
        )}
      </div>

      <ChatBox
        roomId={roomId} messages={messages} userId={userId}
        myScore={meScore}
      />
    </div>
  );
}

function WordDisplay({
  status, isDrawer, myWord, mask,
}: { status: string; isDrawer: boolean; myWord: string | null; mask: string | null }) {
  if (status === "choosing") return <div className="text-sm text-muted-foreground">انتخاب کلمه...</div>;
  if (status === "round_end") return <div className="text-sm text-muted-foreground">پایان دور</div>;
  if (status === "game_end") return <div className="text-sm text-muted-foreground">پایان بازی</div>;
  if (isDrawer && myWord) {
    return (
      <div className="text-center">
        <div className="text-xs text-muted-foreground">کلمه شما</div>
        <div className="text-2xl font-bold tracking-wider">{myWord}</div>
      </div>
    );
  }
  if (mask) {
    return (
      <div className="text-center">
        <div className="text-xs text-muted-foreground">حدس بزن</div>
        <div className="text-2xl font-mono font-bold tracking-widest">{mask}</div>
      </div>
    );
  }
  return null;
}

function CanvasArea({
  canvas, canDraw,
}: { canvas: ReturnType<typeof useDrawingCanvas>; canDraw: boolean }) {
  return (
    <Card className="paper-card overflow-hidden p-0">
      <div className="bg-white relative" style={{ aspectRatio: `${canvas.canvasWidth}/${canvas.canvasHeight}` }}>
        <canvas
          ref={canvas.canvasRef}
          width={canvas.canvasWidth} height={canvas.canvasHeight}
          onPointerDown={canvas.onPointerDown}
          onPointerMove={canvas.onPointerMove}
          onPointerUp={canvas.onPointerUp}
          onPointerCancel={canvas.onPointerUp}
          onPointerLeave={canvas.onPointerUp}
          className="w-full h-full touch-none"
          style={{ cursor: canDraw ? "crosshair" : "default" }}
        />
      </div>
    </Card>
  );
}

function Toolbar({ canvas }: { canvas: ReturnType<typeof useDrawingCanvas> }) {
  return (
    <Card className="paper-card p-3 flex items-center gap-3 flex-wrap">
      <div className="flex gap-1.5 flex-wrap">
        {PALETTE.map(c => (
          <button key={c} aria-label={c}
            onClick={() => canvas.setColor(c)}
            className={`size-7 rounded-md border-2 ${canvas.color === c ? "border-foreground scale-110" : "border-transparent"}`}
            style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex gap-1.5 items-center">
        {SIZES.map(s => (
          <button key={s} onClick={() => canvas.setSize(s)}
            className={`size-9 rounded-md border-2 flex items-center justify-center ${canvas.size === s ? "border-foreground bg-muted" : "border-border"}`}>
            <span className="rounded-full bg-foreground block" style={{ width: s/2 + 4, height: s/2 + 4 }} />
          </button>
        ))}
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="flex gap-1.5">
        <ToolBtn active={canvas.tool === "brush"} onClick={() => canvas.setTool("brush")}><Pencil className="size-4" /></ToolBtn>
        <ToolBtn active={canvas.tool === "eraser"} onClick={() => canvas.setTool("eraser")}><Eraser className="size-4" /></ToolBtn>
        <ToolBtn active={canvas.tool === "fill"} onClick={() => canvas.setTool("fill")}><PaintBucket className="size-4" /></ToolBtn>
      </div>
      <div className="h-8 w-px bg-border" />
      <Button size="sm" variant="outline" onClick={canvas.undo}><Undo2 className="size-4" /></Button>
      <Button size="sm" variant="outline" onClick={canvas.clearAll}><Trash2 className="size-4" /></Button>
    </Card>
  );
}

function ToolBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`size-9 rounded-md border-2 flex items-center justify-center ${active ? "border-foreground bg-muted" : "border-border"}`}>
      {children}
    </button>
  );
}

function Scoreboard({
  players, userId, drawerId, hostId, roomId,
}: {
  players: ReturnType<typeof useRoom>["players"]; userId: string;
  drawerId: string | null; hostId: string; roomId: string;
}) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const kickFn = useServerFn(kickPlayer);
  const iAmHost = hostId === userId;
  const doKick = async (targetUserId: string, nickname: string) => {
    if (!confirm(`اخراج ${nickname}؟`)) return;
    try { await kickFn({ data: { roomId, targetUserId } }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "خطا"); }
  };
  return (
    <Card className="paper-card p-4 space-y-3">
      <h3 className="font-bold flex items-center gap-2"><Users className="size-4" /> بازیکنان</h3>
      <div className="space-y-1.5">
        {sorted.map((p, i) => {
          const isDrawer = p.user_id === drawerId;
          const isMe = p.user_id === userId;
          const isHostP = p.user_id === hostId;
          return (
            <div key={p.id} className={`flex items-center gap-2 p-2 rounded-md ${isDrawer ? "bg-accent/40" : "bg-muted/40"} ${p.has_guessed ? "ring-2 ring-success/40" : ""}`}>
              <span className="text-xs font-bold w-5 text-muted-foreground">{i + 1}</span>
              <div className="size-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: p.avatar_color }}>
                {p.nickname.slice(0,1).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {p.nickname}{isMe && " (تو)"}{isHostP && " 👑"}
                </div>
                <div className="text-xs text-muted-foreground">{p.score} امتیاز</div>
              </div>
              {isDrawer && <Pencil className="size-3.5 text-primary" />}
              {iAmHost && !isMe && (
                <button
                  onClick={() => doKick(p.user_id, p.nickname)}
                  className="text-destructive hover:bg-destructive/10 rounded p-1"
                  title="اخراج"
                >✕</button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ChatBox({
  roomId, messages, userId, myScore,
}: { roomId: string; messages: ReturnType<typeof useRoom>["messages"]; userId: string; myScore: number }) {
  const guessFn = useServerFn(submitGuess);
  const [text, setText] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSentRef = useRef(0);
  const prevCountRef = useRef(messages.length);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (messages.length > prevCountRef.current) {
      const m = messages[messages.length - 1];
      if (m && m.user_id !== userId) {
        if (m.kind === "correct") sfx.correct();
        else if (m.kind === "close") sfx.close();
        else if (m.kind === "system") {
          if (m.content.includes("وارد شد")) sfx.join();
          else if (m.content.includes("اخراج")) sfx.leave();
        } else sfx.message();
      }
    }
    prevCountRef.current = messages.length;
  }, [messages, userId]);

  const send = async () => {
    const v = text.trim().slice(0, 150);
    if (!v) return;
    const since = Date.now() - lastSentRef.current;
    if (since < 1000) {
      toast.error("یک ثانیه صبر کن");
      return;
    }
    lastSentRef.current = Date.now();
    setText("");
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000);
    try { await guessFn({ data: { roomId, guess: v } }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "خطا"); }
  };

  return (
    <Card className="paper-card p-3 flex flex-col h-[500px] lg:h-auto lg:max-h-[calc(100vh-200px)]">
      <div className="px-1 pb-2 text-sm font-bold">چت و حدس · امتیاز شما: {myScore}</div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 px-1">
        {messages.map(m => {
          const mine = m.user_id === userId;
          const cls =
            m.kind === "system" ? "bg-muted text-center text-xs text-muted-foreground italic" :
            m.kind === "correct" ? "bg-success/20 text-success-foreground font-semibold" :
            m.kind === "close" ? "bg-warning/30" :
            mine ? "bg-secondary/10" : "bg-muted/40";
          return (
            <div key={m.id} className={`rounded-md px-2 py-1.5 text-sm break-words ${cls}`}>
              {m.kind === "system" || m.kind === "correct" ? (
                <span>{m.content}</span>
              ) : (
                <span>
                  <span className="font-bold" style={{ color: m.avatar_color }}>{m.nickname}: </span>
                  {m.kind === "close" ? "نزدیک بود!" : m.content}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 pt-2">
        <Input
          value={text}
          onChange={e => setText(e.target.value.slice(0, 150))}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
          placeholder={cooldown ? "صبر کن..." : "پیام / حدس (تا ۱۵۰ کاراکتر)"}
          maxLength={150}
          disabled={cooldown}
        />
        <Button size="icon" onClick={send} disabled={cooldown}><Send className="size-4" /></Button>
      </div>
      <div className="text-[10px] text-muted-foreground text-left mt-1 pr-1">{text.length}/150</div>
    </Card>
  );
}

function ChoosingOverlay({
  isDrawer, choices, drawerName, remaining, onChoose,
}: { isDrawer: boolean; choices: string[]; drawerName: string; remaining: number | null; onChoose: (w: string) => void }) {
  return (
    <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center rounded-lg">
      <div className="text-center space-y-5 p-6">
        {isDrawer ? (
          <>
            <h2 className="text-2xl font-bold">یک کلمه انتخاب کن {remaining !== null && <span className="text-base text-muted-foreground">({remaining}s)</span>}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {choices.map(w => (
                <Button key={w} size="lg" onClick={() => onChoose(w)} className="h-14 px-6 text-lg">
                  {w}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <Loader2 className="size-10 animate-spin mx-auto text-primary" />
            <h2 className="text-xl font-bold">{drawerName} در حال انتخاب کلمه...</h2>
            {remaining !== null && <p className="text-muted-foreground">{remaining}s</p>}
          </>
        )}
      </div>
    </div>
  );
}

function RoundEndOverlay({ players, word }: { players: ReturnType<typeof useRoom>["players"]; word?: string }) {
  const scored = [...players].filter(p => p.round_score > 0).sort((a, b) => b.round_score - a.round_score);
  return (
    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
      <Card className="paper-card p-6 max-w-md w-full mx-4 space-y-4">
        <h2 className="text-2xl font-bold text-center">پایان دور!</h2>
        {word && <p className="text-center text-lg">کلمه: <span className="font-bold text-primary">{word}</span></p>}
        <div className="space-y-2">
          {scored.length === 0 && <p className="text-center text-muted-foreground">کسی حدس نزد</p>}
          {scored.map(p => (
            <div key={p.id} className="flex items-center gap-3 bg-muted/50 rounded-md p-2">
              <div className="size-8 rounded-full text-white text-sm font-bold flex items-center justify-center" style={{ backgroundColor: p.avatar_color }}>
                {p.nickname.slice(0,1).toUpperCase()}
              </div>
              <span className="flex-1 font-medium">{p.nickname}</span>
              <span className="font-bold text-success">+{p.round_score}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground">دور بعد به‌زودی...</p>
      </Card>
    </div>
  );
}

function GameEndOverlay({
  players, isHost, onPlayAgain,
}: { players: ReturnType<typeof useRoom>["players"]; isHost: boolean; onPlayAgain: () => void }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-lg p-4">
      <Card className="paper-card p-6 max-w-md w-full space-y-5">
        <h2 className="text-3xl font-black text-center">پایان بازی!</h2>
        <div className="space-y-2">
          {sorted.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-3 rounded-md p-3 ${i === 0 ? "bg-accent/40" : "bg-muted/50"}`}>
              <span className="text-xl w-6 text-center">{medals[i] ?? `${i+1}.`}</span>
              <div className="size-9 rounded-full text-white font-bold flex items-center justify-center" style={{ backgroundColor: p.avatar_color }}>
                {p.nickname.slice(0,1).toUpperCase()}
              </div>
              <span className="flex-1 font-bold">{p.nickname}</span>
              <span className="font-black text-lg">{p.score}</span>
            </div>
          ))}
        </div>
        {isHost && (
          <Button onClick={onPlayAgain} size="lg" className="w-full h-12">
            <Play className="size-5" /> یه بازی دیگه
          </Button>
        )}
      </Card>
    </div>
  );
}

function JoinFormOverlay({ code, onJoin }: { code: string; onJoin: (name: string, color: string) => void }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      toast.error("اسم خودت رو وارد کن");
      return;
    }
    onJoin(cleanName, color);
  };

  return (
    <Card className="paper-card p-6 md:p-8 space-y-6 max-w-md w-full" dir="rtl">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black">ورود به اتاق {code}</h2>
        <p className="text-muted-foreground text-sm">برای بازی کردن، یک اسم نمایشی و رنگ انتخاب کن.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="nickname" className="text-sm font-semibold">اسم نمایشی</label>
          <Input
            id="nickname"
            placeholder="مثلاً علی"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg h-12 text-center font-bold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-1.5"><Palette className="size-4" /> رنگ آواتار</label>
          <div className="flex flex-wrap gap-2 justify-center">
            {AVATAR_COLORS.map(c => (
              <button
                type="button"
                key={c}
                aria-label={`color ${c}`}
                onClick={() => setColor(c)}
                className={`size-9 rounded-full border-2 transition-transform ${color === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full h-12 text-base">
          ورود به بازی
        </Button>
      </form>
    </Card>
  );
}
