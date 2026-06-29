import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Loader2, Plus, LogIn, Palette, Sparkles, Users, Languages,
  ChevronRight, ChevronLeft, Volume2, VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { AVATAR_COLORS, loadProfile, saveProfile, useGuestSession } from "@/hooks/use-guest";
import { createRoom, joinRoom, listPublicRooms } from "@/lib/game.functions";
import { useQuery } from "@tanstack/react-query";
import { useLang, t } from "@/lib/i18n";
import { sfx, isMuted, setMuted } from "@/lib/sounds";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نقاشک — بازی حدس نقاشی آنلاین" },
      { name: "description", content: "بازی نقاشی حدس بزن چندنفره با دوستان به صورت آنلاین." },
    ],
  }),
  component: Lobby,
});

function AdSlot({ orientation, label }: { orientation: "v" | "h"; label?: string }) {
  return (
    <aside
      data-ad-slot
      className={`flex items-center justify-center text-xs text-muted-foreground bg-muted/30 border border-dashed border-border rounded-lg ${
        orientation === "v" ? "min-h-[500px] w-full" : "min-h-[90px] w-full"
      }`}
    >
      {label ?? "تبلیغات"}
    </aside>
  );
}

function langLabel(code: string, lang: "fa" | "en") {
  if (code === "fa") return t("fa", lang);
  if (code === "en") return t("en", lang);
  return t("both", lang);
}

function Lobby() {
  const [lang, setUiLang] = useLang();
  const { loading: authLoading, userId } = useGuestSession();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => loadProfile());
  const [joinCode, setJoinCode] = useState("");
  const [busy, setBusy] = useState<"create" | "join" | null>(null);
  const [page, setPage] = useState(1);
  const [muted, setMutedState] = useState(() => isMuted());

  const createRoomFn = useServerFn(createRoom);
  const joinRoomFn = useServerFn(joinRoom);
  const listPublicFn = useServerFn(listPublicRooms);

  const publicRooms = useQuery({
    queryKey: ["public-rooms", page],
    queryFn: () => listPublicFn({ data: { page, pageSize: 12 } }),
    refetchInterval: 5000,
    enabled: !!userId,
  });

  const totalPages = Math.max(1, Math.ceil((publicRooms.data?.total ?? 0) / 12));

  useEffect(() => { saveProfile(profile); }, [profile]);

  const ready = !authLoading && !!userId;

  const handleQuickPlay = async () => {
    if (!profile.nickname.trim()) { toast.error(t("needName", lang)); return; }
    setBusy("create");
    sfx.click();
    try {
      const r = await createRoomFn({
        data: {
          nickname: profile.nickname, avatarColor: profile.avatarColor,
          isPublic: true, maxPlayers: 8, totalRounds: 3, roundSeconds: 80,
          chooseSeconds: 15, language: "fa", useCustomOnly: false, customWords: [],
        },
      });
      navigate({ to: "/room/$code", params: { code: r.code } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    } finally { setBusy(null); }
  };

  const handleJoin = async (code: string) => {
    if (!profile.nickname.trim()) { toast.error(t("needName", lang)); return; }
    if (!code.trim()) { toast.error(t("needCode", lang)); return; }
    setBusy("join");
    sfx.click();
    try {
      const r = await joinRoomFn({
        data: { code: code.toUpperCase(), nickname: profile.nickname, avatarColor: profile.avatarColor },
      });
      navigate({ to: "/room/$code", params: { code: r.code } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا در ورود");
    } finally { setBusy(null); }
  };

  return (
    <main className="min-h-screen px-3 py-6 md:py-10" dir={lang === "fa" ? "rtl" : "ltr"}>
      <Toaster richColors position="top-center" dir={lang === "fa" ? "rtl" : "ltr"} />

      {/* Top bar: lang + sound */}
      <div className="mx-auto max-w-7xl flex items-center justify-end gap-2 mb-4">
        <Button size="sm" variant="outline" onClick={() => {
          const nm = !muted; setMuted(nm); setMutedState(nm);
        }}>
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </Button>
        <Button size="sm" variant="outline" onClick={() => { setUiLang(lang === "fa" ? "en" : "fa"); sfx.click(); }}>
          <Languages className="size-4" /> {lang === "fa" ? "EN" : "فا"}
        </Button>
      </div>

      <div className="mx-auto max-w-7xl grid gap-4 lg:grid-cols-[160px_1fr_160px]">
        {/* Left vertical ad */}
        <div className="hidden lg:block"><AdSlot orientation="v" /></div>

        <div className="space-y-8">
          <header className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/40 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="size-4" /> {t("tagline", lang)}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="scribble-underline">{t("title", lang)}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("subtitle", lang)}</p>
          </header>

          {/* Horizontal bottom-of-header banner */}
          <AdSlot orientation="h" />

          <Card className="paper-card p-6 md:p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-base">{t("nickname", lang)}</Label>
                <Input
                  id="nickname"
                  placeholder={t("nicknamePh", lang)}
                  maxLength={20}
                  value={profile.nickname}
                  onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                  className="text-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-1.5"><Palette className="size-4" /> {t("color", lang)}</Label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_COLORS.map(c => (
                    <button key={c} aria-label={`color ${c}`}
                      onClick={() => setProfile({ ...profile, avatarColor: c })}
                      className={`size-9 rounded-full border-2 transition-transform ${profile.avatarColor === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Button size="lg" onClick={handleQuickPlay} disabled={!ready || busy !== null} className="h-14 text-base">
                {busy === "create" ? <Loader2 className="size-5 animate-spin" /> : <><Plus className="size-5" /> {t("quickPlay", lang)}</>}
              </Button>
              <CreateCustomDialog
                profile={profile} disabled={!ready || busy !== null} lang={lang}
                onCreated={(code) => navigate({ to: "/room/$code", params: { code } })}
              />
              <div className="flex gap-2">
                <Input
                  placeholder={t("roomCode", lang)}
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="h-14 text-lg tracking-widest uppercase text-center font-bold"
                />
                <Button size="lg" variant="secondary" onClick={() => handleJoin(joinCode)} disabled={!ready || busy !== null} className="h-14 px-5">
                  {busy === "join" ? <Loader2 className="size-5 animate-spin" /> : <LogIn className="size-5" />}
                </Button>
              </div>
            </div>
          </Card>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="size-5" /> {t("publicRooms", lang)}
              </h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                  {lang === "fa" ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />} {t("prev", lang)}
                </Button>
                <span className="text-sm text-muted-foreground">{page}/{totalPages}</span>
                <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  {t("next", lang)} {lang === "fa" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
                </Button>
              </div>
            </div>
            {publicRooms.isLoading ? (
              <p className="text-muted-foreground text-sm">{t("loading", lang)}</p>
            ) : (publicRooms.data?.rooms.length ?? 0) === 0 ? (
              <Card className="paper-card p-8 text-center text-muted-foreground">{t("noPublic", lang)}</Card>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {publicRooms.data!.rooms.map((r) => (
                  <Card key={r.id} className="paper-card p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg tracking-widest">{r.code}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {r.playerCount}/{r.max_players} {t("players", lang)} · {r.total_rounds} {t("rounds", lang)} · {r.round_seconds}{lang === "fa" ? "ث" : "s"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <span>{r.status === "waiting" ? t("waiting", lang) : t("playing", lang)}</span>
                        <span className="px-1.5 py-0.5 rounded bg-accent/40 text-[10px]">
                          <Languages className="size-3 inline" /> {langLabel(r.language, lang)}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleJoin(r.code)} disabled={!ready || busy !== null}>
                      {t("enter", lang)}
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <footer className="text-center text-xs text-muted-foreground pt-4">{t("maker", lang)}</footer>
        </div>

        {/* Right vertical ad */}
        <div className="hidden lg:block"><AdSlot orientation="v" /></div>
      </div>
    </main>
  );
}

function CreateCustomDialog({
  profile, disabled, onCreated, lang,
}: {
  profile: { nickname: string; avatarColor: string };
  disabled: boolean;
  onCreated: (code: string) => void;
  lang: "fa" | "en";
}) {
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState<string>("8");
  const [totalRounds, setTotalRounds] = useState<string>("3");
  const [roundSeconds, setRoundSeconds] = useState<string>("80");
  const [chooseSeconds, setChooseSeconds] = useState<string>("15");
  const [language, setLanguage] = useState<"fa" | "en" | "both">("fa");
  const [useCustomOnly, setUseCustomOnly] = useState(false);
  const [wordsText, setWordsText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const createRoomFn = useServerFn(createRoom);

  // Simple captcha
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    return { a, b, answer: a + b };
  }, [open]);
  const [captchaInput, setCaptchaInput] = useState("");

  const submit = async () => {
    if (!profile.nickname.trim()) { toast.error(t("needName", lang)); return; }
    if (Number(captchaInput) !== captcha.answer) { toast.error(t("captchaWrong", lang)); return; }
    const customWords = wordsText.split(/[\n,،]/).map(s => s.trim()).filter(Boolean).slice(0, 400);
    if (useCustomOnly && customWords.length < 3) {
      toast.error(lang === "fa" ? "حداقل ۳ کلمه سفارشی وارد کن" : "At least 3 custom words"); return;
    }
    setSubmitting(true);
    try {
      const r = await createRoomFn({
        data: {
          nickname: profile.nickname, avatarColor: profile.avatarColor,
          isPublic,
          maxPlayers: Math.max(2, Math.min(12, Number(maxPlayers) || 8)),
          totalRounds: Math.max(1, Math.min(25, Number(totalRounds) || 3)),
          roundSeconds: Math.max(30, Math.min(200, Number(roundSeconds) || 80)),
          chooseSeconds: Math.max(5, Math.min(30, Number(chooseSeconds) || 15)),
          language,
          useCustomOnly,
          customWords,
        },
      });
      setOpen(false);
      onCreated(r.code);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    } finally { setSubmitting(false); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" disabled={disabled} className="h-14 text-base border-2">
          <Plus className="size-5" /> {t("customRoom", lang)}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir={lang === "fa" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("create", lang)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div className="grid grid-cols-2 gap-4">
            <Field label={t("numPlayers", lang)}>
              <input type="number" min={2} max={12} value={maxPlayers}
                onChange={e => setMaxPlayers(e.target.value)}
                onBlur={() => setMaxPlayers(String(Math.max(2, Math.min(12, Number(maxPlayers) || 8))))}
                className="select-base" />
            </Field>
            <Field label={t("numRounds", lang)}>
              <input type="number" min={1} max={25} value={totalRounds}
                onChange={e => setTotalRounds(e.target.value)}
                onBlur={() => setTotalRounds(String(Math.max(1, Math.min(25, Number(totalRounds) || 3))))}
                className="select-base" />
            </Field>
            <Field label={t("roundTime", lang)}>
              <input type="number" min={30} max={200} step={5} value={roundSeconds}
                onChange={e => setRoundSeconds(e.target.value)}
                onBlur={() => setRoundSeconds(String(Math.max(30, Math.min(200, Number(roundSeconds) || 80))))}
                className="select-base" />
            </Field>
            <Field label={t("chooseTime", lang)}>
              <input type="number" min={5} max={30} value={chooseSeconds}
                onChange={e => setChooseSeconds(e.target.value)}
                onBlur={() => setChooseSeconds(String(Math.max(5, Math.min(30, Number(chooseSeconds) || 15))))}
                className="select-base" />
            </Field>
            <Field label={t("langWords", lang)}>
              <select value={language} onChange={e => setLanguage(e.target.value as "fa"|"en"|"both")} className="select-base">
                <option value="fa">{t("fa", lang)}</option>
                <option value="en">{t("en", lang)}</option>
                <option value="both">{t("both", lang)}</option>
              </select>
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="size-4" />
            <span>{t("publicRoom", lang)}</span>
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("customWords", lang)}</Label>
              <a
                href="https://chat.deepseek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1 font-medium animate-pulse"
              >
                <Sparkles className="size-3 text-primary" />
                <span>{lang === "fa" ? "ایده گرفتن با هوش مصنوعی DeepSeek" : "Get ideas with DeepSeek AI"}</span>
              </a>
            </div>
            <textarea
              value={wordsText}
              onChange={e => setWordsText(e.target.value)}
              rows={4}
              placeholder={lang === "fa" ? "مثال: گربه، خانه، آفتاب" : "e.g. cat, house, sun"}
              className="w-full rounded-md border bg-input/30 p-3 text-base"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={useCustomOnly} onChange={e => setUseCustomOnly(e.target.checked)} className="size-4" />
              {t("useCustomOnly", lang)}
            </label>
          </div>

          {/* Captcha */}
          <div className="space-y-2 p-3 rounded-md bg-muted/40">
            <Label>{t("captcha", lang)} <span className="font-mono font-bold">{captcha.a} + {captcha.b} = ?</span></Label>
            <Input type="number" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="?" className="h-10" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={submitting} className="w-full h-12 text-base">
            {submitting ? <Loader2 className="size-5 animate-spin" /> : t("create", lang)}
          </Button>
        </DialogFooter>
      </DialogContent>
      <style>{`
        .select-base {
          width: 100%; height: 2.5rem; border-radius: 0.5rem;
          border: 1px solid var(--color-border); background: var(--color-input);
          padding: 0 0.75rem; font-size: 1rem;
        }
      `}</style>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
