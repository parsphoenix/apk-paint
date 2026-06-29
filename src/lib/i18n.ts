// Minimal i18n for the lobby (homepage). Persian default + English toggle.
import { useEffect, useState } from "react";

export type Lang = "fa" | "en";
const KEY = "draw_lang";

export function getLang(): Lang {
  if (typeof window === "undefined") return "fa";
  const v = localStorage.getItem(KEY);
  return v === "en" ? "en" : "fa";
}
export function setLang(l: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, l);
  window.dispatchEvent(new Event("lang-change"));
}
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setL] = useState<Lang>(() => getLang());
  useEffect(() => {
    const h = () => setL(getLang());
    window.addEventListener("lang-change", h);
    return () => window.removeEventListener("lang-change", h);
  }, []);
  return [lang, (l: Lang) => { setLang(l); setL(l); }];
}

const DICT = {
  tagline: { fa: "آنلاین، چندنفره، فارسی و انگلیسی", en: "Online, multiplayer, Persian & English" },
  title: { fa: "نقاشک", en: "Sketchy" },
  subtitle: {
    fa: "بکش، حدس بزن، بخند. بازی نقاشی چندنفره به سبک gartic — همین حالا با دوستات بازی کن.",
    en: "Draw, guess, laugh. A multiplayer drawing game like gartic — play with friends right now.",
  },
  nickname: { fa: "اسم نمایشی", en: "Display name" },
  nicknamePh: { fa: "مثلاً علی", en: "e.g. Ali" },
  color: { fa: "رنگ", en: "Color" },
  quickPlay: { fa: "بازی سریع (عمومی)", en: "Quick play (public)" },
  customRoom: { fa: "اتاق سفارشی", en: "Custom room" },
  roomCode: { fa: "کد اتاق", en: "Room code" },
  publicRooms: { fa: "اتاق‌های عمومی", en: "Public rooms" },
  noPublic: { fa: "اتاق عمومی فعالی نیست — اولین نفر باش!", en: "No active public rooms — be the first!" },
  loading: { fa: "در حال بارگذاری...", en: "Loading..." },
  enter: { fa: "ورود", en: "Join" },
  waiting: { fa: "در انتظار شروع", en: "Waiting to start" },
  playing: { fa: "در حال بازی", en: "Playing" },
  players: { fa: "بازیکن", en: "players" },
  rounds: { fa: "دور", en: "rounds" },
  prev: { fa: "قبلی", en: "Prev" },
  next: { fa: "بعدی", en: "Next" },
  captcha: { fa: "تأیید (پاسخ بده):", en: "Captcha (answer):" },
  captchaWrong: { fa: "پاسخ کپچا اشتباه است", en: "Wrong captcha answer" },
  needName: { fa: "اسم خودت رو وارد کن", en: "Enter your name" },
  needCode: { fa: "کد اتاق رو وارد کن", en: "Enter a room code" },
  enterName: { fa: "اول اسم خودت رو وارد کن", en: "Please enter your name first" },
  langWords: { fa: "زبان کلمات", en: "Words language" },
  fa: { fa: "فارسی", en: "Persian" },
  en: { fa: "انگلیسی", en: "English" },
  both: { fa: "هر دو", en: "Both" },
  maker: { fa: "ساخته شده با ❤ — مهمان وارد شو، بدون نیاز به ثبت‌نام", en: "Made with ❤ — Play as guest, no signup needed" },
  create: { fa: "ساخت اتاق", en: "Create room" },
  numPlayers: { fa: "تعداد بازیکن", en: "Max players" },
  numRounds: { fa: "تعداد دور (تا ۲۵)", en: "Rounds (up to 25)" },
  roundTime: { fa: "زمان هر دور (ثانیه، تا ۲۰۰)", en: "Round time (seconds, up to 200)" },
  chooseTime: { fa: "زمان انتخاب کلمه (ثانیه)", en: "Word selection time (seconds)" },
  customWords: { fa: "کلمات سفارشی (تا ۴۰۰، با خط جدید یا کاما)", en: "Custom words (up to 400, comma or newline)" },
  useCustomOnly: { fa: "فقط کلمات من", en: "Only my custom words" },
  publicRoom: { fa: "اتاق عمومی (در لابی نمایش بده)", en: "Public room (show in lobby)" },
} as const;

export function t(key: keyof typeof DICT, lang: Lang): string {
  return DICT[key][lang];
}
