import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Room = Tables<"rooms">;
export type Player = Tables<"room_players">;
export type Message = Tables<"room_messages">;

export function useRoom(code: string, userId: string | null) {
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [myWord, setMyWord] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const roomIdRef = useRef<string | null>(null);

  const refetchAll = useCallback(async (rid: string) => {
    const [r, p, m] = await Promise.all([
      supabase.from("rooms").select("*").eq("id", rid).maybeSingle(),
      supabase.from("room_players").select("*").eq("room_id", rid).order("joined_at"),
      supabase.from("room_messages").select("*").eq("room_id", rid).order("created_at", { ascending: false }).limit(50),
    ]);
    if (r.data) setRoom(r.data);
    setPlayers(p.data ?? []);
    setMessages((m.data ?? []).reverse());
  }, []);

  const refetchRoom = useCallback(async () => {
    if (!roomIdRef.current) return;
    const { data } = await supabase.from("rooms").select("*").eq("id", roomIdRef.current).maybeSingle();
    if (data) setRoom(data);
  }, []);

  const refetchSecret = useCallback(async (rid: string) => {
    const { data } = await supabase.from("room_secrets").select("current_word").eq("room_id", rid).maybeSingle();
    setMyWord(data?.current_word ?? null);
  }, []);

  useEffect(() => {
    if (!userId || !code) return;
    let alive = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const init = async () => {
      const { data: r } = await supabase.from("rooms").select("*").eq("code", code.toUpperCase()).maybeSingle();
      if (!alive) return;
      if (!r) { setNotFound(true); setLoading(false); return; }
      roomIdRef.current = r.id;
      setRoom(r);
      await refetchAll(r.id);
      await refetchSecret(r.id);
      setLoading(false);

      channel = supabase
        .channel(`room:${r.id}`)
        .on("postgres_changes",
          { event: "*", schema: "public", table: "rooms", filter: `id=eq.${r.id}` },
          (payload) => {
            if (payload.eventType === "DELETE") { setNotFound(true); return; }
            const newRoom = payload.new as Room;
            setRoom(newRoom);
            // when drawer changes or word may have changed, refetch secret
            refetchSecret(r.id);
          })
        .on("postgres_changes",
          { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${r.id}` },
          () => { void refetchPlayers(r.id); })
        .on("postgres_changes",
          { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${r.id}` },
          (payload) => { setMessages(prev => [...prev, payload.new as Message].slice(-50)); })
        .on("postgres_changes",
          { event: "*", schema: "public", table: "room_secrets", filter: `room_id=eq.${r.id}` },
          () => { refetchSecret(r.id); })
        .subscribe();
    };

    const refetchPlayers = async (rid: string) => {
      const { data } = await supabase.from("room_players").select("*").eq("room_id", rid).order("joined_at");
      if (alive) setPlayers(data ?? []);
    };

    init();
    return () => {
      alive = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [code, userId, refetchAll, refetchSecret]);

  return { room, players, messages, myWord, loading, notFound, roomId: roomIdRef.current, refetchRoom };
}
