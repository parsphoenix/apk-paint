import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type GuestProfile = {
  nickname: string;
  avatarColor: string;
};

const STORAGE_KEY = "draw_guest_profile";

export const AVATAR_COLORS = [
  "#EF4444", "#F59E0B", "#EAB308", "#22C55E",
  "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899",
  "#F97316", "#10B981", "#0EA5E9", "#A855F7",
];

export function loadProfile(): GuestProfile {
  if (typeof window === "undefined") return { nickname: "", avatarColor: AVATAR_COLORS[0] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { nickname: "", avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)] };
}

export function saveProfile(p: GuestProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function useGuestSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      if (data.session) {
        setSession(data.session);
        setLoading(false);
        return;
      }
      const { data: anon, error } = await supabase.auth.signInAnonymously();
      if (!alive) return;
      if (error) console.error("anon signIn error", error);
      setSession(anon.session ?? null);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  return { session, loading, userId: session?.user.id ?? null };
}
