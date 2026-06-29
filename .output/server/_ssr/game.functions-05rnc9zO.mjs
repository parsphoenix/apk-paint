import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-CABP3xOo.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-J10uQpL-.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, s as stringType, b as booleanType, e as enumType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function genCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}
function normalize(s) {
  return s.toLowerCase().trim().replace(/[\u200c\u200f\u200e]/g, "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\s\-_.،,:;!?؟]/g, "");
}
function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array(n + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[n];
}
function buildMask(word, revealedIdx = []) {
  return Array.from(word).map((ch, i) => {
    if (ch === " ") return "  ";
    if (revealedIdx.includes(i)) return ch;
    return "_";
  }).join(" ");
}
function resolvePositiveSeconds(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}
async function getAdmin() {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  return supabaseAdmin;
}
const createRoom_createServerFn_handler = createServerRpc({
  id: "72ff94374307e72a03cde4028917799b829a2f6eed34e12870a966188fe9f057",
  name: "createRoom",
  filename: "src/lib/game.functions.ts"
}, (opts) => createRoom.__executeServer(opts));
const createRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  nickname: stringType().min(1).max(20),
  avatarColor: stringType().min(4).max(20),
  isPublic: booleanType().default(false),
  maxPlayers: numberType().int().min(2).max(12).default(8),
  totalRounds: numberType().int().min(1).max(25).default(3),
  roundSeconds: numberType().int().min(30).max(200).default(80),
  chooseSeconds: numberType().int().min(5).max(30).default(15),
  language: enumType(["fa", "en", "both"]).default("fa"),
  useCustomOnly: booleanType().default(false),
  customWords: arrayType(stringType().min(1).max(40)).max(400).default([])
}).parse(input)).handler(createRoom_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  let code = "";
  for (let i = 0; i < 6; i++) {
    code = genCode();
    const {
      data: exists
    } = await admin.from("rooms").select("id").eq("code", code).maybeSingle();
    if (!exists) break;
  }
  const {
    data: room,
    error
  } = await admin.from("rooms").insert({
    code,
    host_id: context.userId,
    is_public: data.isPublic,
    max_players: data.maxPlayers,
    total_rounds: data.totalRounds,
    round_seconds: data.roundSeconds,
    choose_seconds: data.chooseSeconds,
    language: data.language,
    use_custom_only: data.useCustomOnly,
    custom_words: data.customWords
  }).select().single();
  if (error || !room) throw new Error(error?.message ?? "Failed to create room");
  await admin.from("room_secrets").insert({
    room_id: room.id
  });
  await admin.from("room_players").insert({
    room_id: room.id,
    user_id: context.userId,
    nickname: data.nickname.trim(),
    avatar_color: data.avatarColor
  });
  return {
    code: room.code,
    roomId: room.id
  };
});
const joinRoom_createServerFn_handler = createServerRpc({
  id: "d8b9bc6ce64c74312bb0556b62400dc94581d9ce471af4daa1b67d7df916946c",
  name: "joinRoom",
  filename: "src/lib/game.functions.ts"
}, (opts) => joinRoom.__executeServer(opts));
const joinRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType().min(3).max(8),
  nickname: stringType().min(1).max(20),
  avatarColor: stringType().min(4).max(20)
}).parse(input)).handler(joinRoom_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const code = data.code.toUpperCase().trim();
  const {
    data: room,
    error
  } = await admin.from("rooms").select("*").eq("code", code).maybeSingle();
  if (error || !room) throw new Error("اتاق پیدا نشد");
  if (room.status === "game_end") throw new Error("بازی تمام شده — لطفاً اتاق دیگری انتخاب کنید");
  const {
    count
  } = await admin.from("room_players").select("id", {
    count: "exact",
    head: true
  }).eq("room_id", room.id);
  const existing = await admin.from("room_players").select("id").eq("room_id", room.id).eq("user_id", context.userId).maybeSingle();
  if (!existing.data) {
    if ((count ?? 0) >= room.max_players) throw new Error("اتاق پر است");
    await admin.from("room_players").insert({
      room_id: room.id,
      user_id: context.userId,
      nickname: data.nickname.trim(),
      avatar_color: data.avatarColor,
      score: 0
    });
    if (room.status !== "waiting") {
      const newOrder = [...room.drawer_order ?? [], context.userId];
      await admin.from("rooms").update({
        drawer_order: newOrder
      }).eq("id", room.id);
      await admin.from("room_messages").insert({
        room_id: room.id,
        user_id: null,
        nickname: "سیستم",
        content: `${data.nickname.trim()} وارد شد`,
        kind: "system"
      });
    }
  } else {
    await admin.from("room_players").update({
      nickname: data.nickname.trim(),
      avatar_color: data.avatarColor,
      is_connected: true
    }).eq("id", existing.data.id);
  }
  return {
    code: room.code,
    roomId: room.id
  };
});
async function deleteIfEmpty(roomId) {
  const admin = await getAdmin();
  const {
    count
  } = await admin.from("room_players").select("id", {
    count: "exact",
    head: true
  }).eq("room_id", roomId);
  if ((count ?? 0) === 0) {
    await admin.from("rooms").delete().eq("id", roomId);
    return true;
  }
  return false;
}
const leaveRoom_createServerFn_handler = createServerRpc({
  id: "73323c0c70d5bc3d3dbbade43bfee15ad3ac64d8e1308ffab9ade34971c75436",
  name: "leaveRoom",
  filename: "src/lib/game.functions.ts"
}, (opts) => leaveRoom.__executeServer(opts));
const leaveRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(leaveRoom_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) return {
    ok: true
  };
  if (room.host_id === context.userId) {
    await admin.from("rooms").delete().eq("id", data.roomId);
    return {
      ok: true
    };
  }
  const {
    data: player
  } = await admin.from("room_players").select("nickname").eq("room_id", data.roomId).eq("user_id", context.userId).maybeSingle();
  await admin.from("room_players").delete().eq("room_id", data.roomId).eq("user_id", context.userId);
  if (player) {
    await admin.from("room_messages").insert({
      room_id: data.roomId,
      user_id: null,
      nickname: "سیستم",
      content: `${player.nickname} خارج شد`,
      kind: "system"
    });
  }
  if (room.drawer_order?.includes(context.userId)) {
    const newOrder = (room.drawer_order ?? []).filter((u) => u !== context.userId);
    await admin.from("rooms").update({
      drawer_order: newOrder
    }).eq("id", data.roomId);
  }
  if (room.current_drawer_id === context.userId && (room.status === "drawing" || room.status === "choosing")) {
    await endRoundInternal(data.roomId);
  }
  await deleteIfEmpty(data.roomId);
  return {
    ok: true
  };
});
const kickPlayer_createServerFn_handler = createServerRpc({
  id: "e54962c1c28cba0ec44aca118430d62ad5b044758a7d83a3cb59f4f0900eec68",
  name: "kickPlayer",
  filename: "src/lib/game.functions.ts"
}, (opts) => kickPlayer.__executeServer(opts));
const kickPlayer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  targetUserId: stringType().uuid()
}).parse(input)).handler(kickPlayer_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  if (room.host_id !== context.userId) throw new Error("فقط میزبان می‌تواند بازیکن را اخراج کند");
  if (data.targetUserId === context.userId) throw new Error("نمی‌توانی خودت را اخراج کنی");
  const {
    data: target
  } = await admin.from("room_players").select("nickname").eq("room_id", data.roomId).eq("user_id", data.targetUserId).maybeSingle();
  await admin.from("room_players").delete().eq("room_id", data.roomId).eq("user_id", data.targetUserId);
  if (room.drawer_order?.includes(data.targetUserId)) {
    const newOrder = (room.drawer_order ?? []).filter((u) => u !== data.targetUserId);
    await admin.from("rooms").update({
      drawer_order: newOrder
    }).eq("id", data.roomId);
  }
  if (room.current_drawer_id === data.targetUserId && (room.status === "drawing" || room.status === "choosing")) {
    await endRoundInternal(data.roomId);
  }
  await admin.from("room_messages").insert({
    room_id: data.roomId,
    user_id: null,
    nickname: "سیستم",
    content: `${target?.nickname ?? "بازیکن"} اخراج شد`,
    kind: "system"
  });
  return {
    ok: true
  };
});
const updateRoomSettings_createServerFn_handler = createServerRpc({
  id: "1633ae07f1af5b5428d73a21080e55bd7a717aa2438c36c590bdbed096c70354",
  name: "updateRoomSettings",
  filename: "src/lib/game.functions.ts"
}, (opts) => updateRoomSettings.__executeServer(opts));
const updateRoomSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  isPublic: booleanType().optional(),
  maxPlayers: numberType().int().min(2).max(12).optional(),
  totalRounds: numberType().int().min(1).max(25).optional(),
  roundSeconds: numberType().int().min(30).max(200).optional(),
  chooseSeconds: numberType().int().min(5).max(30).optional(),
  language: enumType(["fa", "en", "both"]).optional(),
  useCustomOnly: booleanType().optional(),
  customWords: arrayType(stringType().min(1).max(40)).max(400).optional()
}).parse(input)).handler(updateRoomSettings_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("host_id,status").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  if (room.host_id !== context.userId) throw new Error("فقط میزبان می‌تواند تنظیمات را تغییر دهد");
  if (room.status !== "waiting") throw new Error("بازی شروع شده");
  await admin.from("rooms").update({
    ...data.isPublic !== void 0 && {
      is_public: data.isPublic
    },
    ...data.maxPlayers !== void 0 && {
      max_players: data.maxPlayers
    },
    ...data.totalRounds !== void 0 && {
      total_rounds: data.totalRounds
    },
    ...data.roundSeconds !== void 0 && {
      round_seconds: data.roundSeconds
    },
    ...data.chooseSeconds !== void 0 && {
      choose_seconds: data.chooseSeconds
    },
    ...data.language !== void 0 && {
      language: data.language
    },
    ...data.useCustomOnly !== void 0 && {
      use_custom_only: data.useCustomOnly
    },
    ...data.customWords !== void 0 && {
      custom_words: data.customWords
    }
  }).eq("id", data.roomId);
  return {
    ok: true
  };
});
const startGame_createServerFn_handler = createServerRpc({
  id: "7b6f56b1689db5ebcbcd991a3cbc9d3702d92d7fb35dbff4e359e27f1f3a5a9f",
  name: "startGame",
  filename: "src/lib/game.functions.ts"
}, (opts) => startGame.__executeServer(opts));
const startGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(startGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  if (room.host_id !== context.userId) throw new Error("فقط میزبان");
  if (room.status !== "waiting") throw new Error("شروع شده");
  const {
    data: players
  } = await admin.from("room_players").select("user_id").eq("room_id", data.roomId).order("joined_at", {
    ascending: true
  });
  if (!players || players.length < 2) throw new Error("حداقل ۲ بازیکن لازم است");
  const order = players.map((p) => p.user_id).sort(() => Math.random() - 0.5);
  const cs = resolvePositiveSeconds(room.choose_seconds, 15);
  const chooseEnds = new Date(Date.now() + cs * 1e3);
  await admin.from("rooms").update({
    status: "choosing",
    current_round: 1,
    current_turn: 0,
    drawer_order: order,
    current_drawer_id: order[0],
    word_choices: await pickChoices(room, []),
    word_mask: null,
    round_started_at: null,
    round_ends_at: chooseEnds.toISOString()
  }).eq("id", data.roomId);
  await admin.from("room_players").update({
    score: 0,
    round_score: 0,
    has_guessed: false,
    guess_order: null
  }).eq("room_id", data.roomId);
  await admin.from("room_messages").insert({
    room_id: data.roomId,
    user_id: null,
    nickname: "سیستم",
    content: "بازی شروع شد!",
    kind: "system"
  });
  return {
    ok: true
  };
});
async function pickChoices(room, exclude) {
  const admin = await getAdmin();
  const custom = (room.custom_words ?? []).filter((w) => !exclude.includes(w));
  if (room.use_custom_only) {
    return shuffle(custom).slice(0, 3);
  }
  let langFilter = [];
  if (room.language === "fa") langFilter = ["fa"];
  else if (room.language === "en") langFilter = ["en"];
  else langFilter = ["fa", "en"];
  const {
    data: bank
  } = await admin.from("word_bank").select("word").in("language", langFilter).limit(1e3);
  const pool = [...custom, ...(bank ?? []).map((w) => w.word).filter((w) => !exclude.includes(w))];
  return shuffle(pool).slice(0, 3);
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const chooseWord_createServerFn_handler = createServerRpc({
  id: "72b0c82d5d00ffe5429d99e5e0d8b8f65301ff57d761bd4b80924342359a0e12",
  name: "chooseWord",
  filename: "src/lib/game.functions.ts"
}, (opts) => chooseWord.__executeServer(opts));
const chooseWord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  word: stringType().min(1).max(60)
}).parse(input)).handler(chooseWord_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  if (room.current_drawer_id !== context.userId) throw new Error("نوبت شما نیست");
  if (room.status !== "choosing") throw new Error("");
  if (!room.word_choices?.includes(data.word)) throw new Error("کلمه نامعتبر");
  const now = /* @__PURE__ */ new Date();
  const rs = resolvePositiveSeconds(room.round_seconds, 80);
  const ends = new Date(now.getTime() + rs * 1e3);
  await admin.from("room_secrets").upsert({
    room_id: data.roomId,
    current_word: data.word
  });
  await admin.from("rooms").update({
    status: "drawing",
    word_mask: buildMask(data.word),
    word_choices: null,
    round_started_at: now.toISOString(),
    round_ends_at: ends.toISOString()
  }).eq("id", data.roomId);
  await admin.from("room_players").update({
    has_guessed: false,
    round_score: 0,
    guess_order: null
  }).eq("room_id", data.roomId);
  return {
    ok: true
  };
});
const submitGuess_createServerFn_handler = createServerRpc({
  id: "4f094df9e74a711c11d2262e7ce0362d372198697adf2e49f17b95d770d62f2b",
  name: "submitGuess",
  filename: "src/lib/game.functions.ts"
}, (opts) => submitGuess.__executeServer(opts));
const submitGuess = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  guess: stringType().min(1).max(150)
}).parse(input)).handler(submitGuess_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  const {
    data: player
  } = await admin.from("room_players").select("*").eq("room_id", data.roomId).eq("user_id", context.userId).maybeSingle();
  if (!player) throw new Error("Not in room");
  const {
    data: lastMsg
  } = await admin.from("room_messages").select("created_at").eq("room_id", data.roomId).eq("user_id", context.userId).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (lastMsg && Date.now() - new Date(lastMsg.created_at).getTime() < 1e3) {
    throw new Error("یک ثانیه صبر کن");
  }
  if (room.status !== "drawing" || room.current_drawer_id === context.userId || player.has_guessed) {
    await admin.from("room_messages").insert({
      room_id: data.roomId,
      user_id: context.userId,
      nickname: player.nickname,
      avatar_color: player.avatar_color,
      content: data.guess,
      kind: "chat"
    });
    return {
      correct: false,
      close: false
    };
  }
  const {
    data: secret
  } = await admin.from("room_secrets").select("current_word").eq("room_id", data.roomId).maybeSingle();
  const word = secret?.current_word ?? "";
  const ng = normalize(data.guess);
  const nw = normalize(word);
  if (ng === nw) {
    const {
      count
    } = await admin.from("room_players").select("id", {
      count: "exact",
      head: true
    }).eq("room_id", data.roomId).eq("has_guessed", true);
    const order = (count ?? 0) + 1;
    const totalSec = resolvePositiveSeconds(room.round_seconds, 80);
    const elapsed = room.round_started_at ? (Date.now() - new Date(room.round_started_at).getTime()) / 1e3 : 0;
    const remaining = Math.max(0, totalSec - elapsed);
    const guessPoints = Math.round(200 + remaining / totalSec * 400);
    const drawerBonus = Math.round(80 + remaining / totalSec * 80);
    await admin.from("room_players").update({
      has_guessed: true,
      guess_order: order,
      round_score: guessPoints,
      score: player.score + guessPoints
    }).eq("id", player.id);
    if (room.current_drawer_id) {
      const {
        data: drawer
      } = await admin.from("room_players").select("*").eq("room_id", data.roomId).eq("user_id", room.current_drawer_id).maybeSingle();
      if (drawer) {
        await admin.from("room_players").update({
          round_score: drawer.round_score + drawerBonus,
          score: drawer.score + drawerBonus
        }).eq("id", drawer.id);
      }
    }
    await admin.from("room_messages").insert({
      room_id: data.roomId,
      user_id: context.userId,
      nickname: player.nickname,
      avatar_color: player.avatar_color,
      content: `${player.nickname} درست حدس زد!`,
      kind: "correct"
    });
    const {
      data: allPlayers
    } = await admin.from("room_players").select("user_id,has_guessed").eq("room_id", data.roomId);
    const others = (allPlayers ?? []).filter((p) => p.user_id !== room.current_drawer_id);
    if (others.length > 0 && others.every((p) => p.has_guessed)) {
      await endRoundInternal(data.roomId);
    }
    return {
      correct: true,
      close: false
    };
  }
  const dist = levenshtein(ng, nw);
  const close = nw.length >= 3 && dist > 0 && dist <= 1;
  await admin.from("room_messages").insert({
    room_id: data.roomId,
    user_id: context.userId,
    nickname: player.nickname,
    avatar_color: player.avatar_color,
    content: data.guess,
    kind: close ? "close" : "chat"
  });
  return {
    correct: false,
    close
  };
});
async function endRoundInternal(roomId) {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", roomId).maybeSingle();
  if (!room) return;
  const {
    data: secret
  } = await admin.from("room_secrets").select("current_word").eq("room_id", roomId).maybeSingle();
  const word = secret?.current_word ?? "";
  await admin.from("rooms").update({
    status: "round_end",
    round_ends_at: null,
    word_mask: word
  }).eq("id", roomId);
  await admin.from("room_secrets").update({
    current_word: null
  }).eq("room_id", roomId);
  await admin.from("room_messages").insert({
    room_id: roomId,
    user_id: null,
    nickname: "سیستم",
    content: `پایان دور — کلمه: ${word}`,
    kind: "system"
  });
}
const endRound_createServerFn_handler = createServerRpc({
  id: "cca29c9610d72d2bdb8ea45d1db21d450ab13bfe8a9f314c2ed446e640e68159",
  name: "endRound",
  filename: "src/lib/game.functions.ts"
}, (opts) => endRound.__executeServer(opts));
const endRound = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(endRound_createServerFn_handler, async ({
  data
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("status,round_ends_at").eq("id", data.roomId).maybeSingle();
  if (!room) return {
    ok: true
  };
  if (room.status !== "drawing") return {
    ok: true
  };
  const re = room.round_ends_at ? new Date(room.round_ends_at).getTime() : 0;
  if (re > Date.now() + 200) return {
    ok: true
  };
  await endRoundInternal(data.roomId);
  return {
    ok: true
  };
});
const autoChooseWord_createServerFn_handler = createServerRpc({
  id: "7320d41316c850aff257b2390af8f08c7deb896e0c7d4ef2730b55ed6562ac25",
  name: "autoChooseWord",
  filename: "src/lib/game.functions.ts"
}, (opts) => autoChooseWord.__executeServer(opts));
const autoChooseWord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(autoChooseWord_createServerFn_handler, async ({
  data
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room || room.status !== "choosing") return {
    ok: true
  };
  const ce = room.round_ends_at ? new Date(room.round_ends_at).getTime() : 0;
  if (ce > Date.now() + 200) return {
    ok: true
  };
  const choices = room.word_choices ?? [];
  if (choices.length === 0) return {
    ok: true
  };
  const word = choices[Math.floor(Math.random() * choices.length)];
  const now = /* @__PURE__ */ new Date();
  const rs = resolvePositiveSeconds(room.round_seconds, 80);
  const ends = new Date(now.getTime() + rs * 1e3);
  await admin.from("room_secrets").upsert({
    room_id: data.roomId,
    current_word: word
  });
  await admin.from("rooms").update({
    status: "drawing",
    word_mask: buildMask(word),
    word_choices: null,
    round_started_at: now.toISOString(),
    round_ends_at: ends.toISOString()
  }).eq("id", data.roomId);
  await admin.from("room_players").update({
    has_guessed: false,
    round_score: 0,
    guess_order: null
  }).eq("room_id", data.roomId);
  return {
    ok: true
  };
});
const nextTurn_createServerFn_handler = createServerRpc({
  id: "9e71869b63bc0d0ac1ea40b2e5096f6ef3c7481169d7d692c3f99543b35b1216",
  name: "nextTurn",
  filename: "src/lib/game.functions.ts"
}, (opts) => nextTurn.__executeServer(opts));
const nextTurn = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(nextTurn_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room) throw new Error("Room not found");
  if (room.host_id !== context.userId) throw new Error("فقط میزبان");
  if (room.status !== "round_end") return {
    ok: true
  };
  const order = room.drawer_order ?? [];
  let nextTurnIdx = room.current_turn + 1;
  let nextRound = room.current_round;
  if (nextTurnIdx >= order.length) {
    nextTurnIdx = 0;
    nextRound = room.current_round + 1;
  }
  if (nextRound > room.total_rounds) {
    await admin.from("rooms").update({
      status: "game_end",
      current_drawer_id: null,
      word_choices: null,
      word_mask: null
    }).eq("id", data.roomId);
    await admin.from("room_messages").insert({
      room_id: data.roomId,
      user_id: null,
      nickname: "سیستم",
      content: "بازی تمام شد!",
      kind: "system"
    });
    return {
      ok: true
    };
  }
  const drawerId = order[nextTurnIdx];
  const choices = await pickChoices(room, []);
  const cs = resolvePositiveSeconds(room.choose_seconds, 15);
  const chooseEnds = new Date(Date.now() + cs * 1e3);
  await admin.from("rooms").update({
    status: "choosing",
    current_round: nextRound,
    current_turn: nextTurnIdx,
    current_drawer_id: drawerId,
    word_choices: choices,
    word_mask: null,
    round_started_at: null,
    round_ends_at: chooseEnds.toISOString()
  }).eq("id", data.roomId);
  return {
    ok: true
  };
});
const revealLetter_createServerFn_handler = createServerRpc({
  id: "b42eb7bf4c698ca3c69ebf4d50154908d6abd91ae828afc627e358bdd16eebbc",
  name: "revealLetter",
  filename: "src/lib/game.functions.ts"
}, (opts) => revealLetter.__executeServer(opts));
const revealLetter = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(revealLetter_createServerFn_handler, async ({
  data
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("*").eq("id", data.roomId).maybeSingle();
  if (!room || room.status !== "drawing") return {
    ok: true
  };
  const {
    data: secret
  } = await admin.from("room_secrets").select("current_word").eq("room_id", data.roomId).maybeSingle();
  const word = secret?.current_word;
  if (!word) return {
    ok: true
  };
  const chars = Array.from(word);
  const mask = (room.word_mask ?? "").split(" ");
  const revealed = [];
  chars.forEach((ch, i) => {
    if (ch === " ") return;
    if (mask[i] && mask[i] !== "_") revealed.push(i);
  });
  const hidden = [];
  chars.forEach((ch, i) => {
    if (ch !== " " && !revealed.includes(i)) hidden.push(i);
  });
  if (hidden.length <= 1) return {
    ok: true
  };
  const pick = hidden[Math.floor(Math.random() * hidden.length)];
  revealed.push(pick);
  const newMask = buildMask(word, revealed);
  await admin.from("rooms").update({
    word_mask: newMask
  }).eq("id", data.roomId);
  return {
    ok: true
  };
});
const resetGame_createServerFn_handler = createServerRpc({
  id: "970bdd3f08722f38c214425e409c5fb38598c4c0711e75df7a9dd9e746ff7743",
  name: "resetGame",
  filename: "src/lib/game.functions.ts"
}, (opts) => resetGame.__executeServer(opts));
const resetGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(resetGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const admin = await getAdmin();
  const {
    data: room
  } = await admin.from("rooms").select("host_id").eq("id", data.roomId).maybeSingle();
  if (!room || room.host_id !== context.userId) throw new Error("فقط میزبان");
  await admin.from("rooms").update({
    status: "waiting",
    current_round: 0,
    current_turn: 0,
    current_drawer_id: null,
    word_choices: null,
    word_mask: null,
    round_started_at: null,
    round_ends_at: null,
    drawer_order: []
  }).eq("id", data.roomId);
  await admin.from("room_secrets").update({
    current_word: null
  }).eq("room_id", data.roomId);
  await admin.from("room_players").update({
    score: 0,
    round_score: 0,
    has_guessed: false,
    guess_order: null
  }).eq("room_id", data.roomId);
  return {
    ok: true
  };
});
const listPublicRooms_createServerFn_handler = createServerRpc({
  id: "c8a29b6780a974f63fb4e68fce38ee3cb8b0b336078d3173b8f13b64132bd127",
  name: "listPublicRooms",
  filename: "src/lib/game.functions.ts"
}, (opts) => listPublicRooms.__executeServer(opts));
const listPublicRooms = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  page: numberType().int().min(1).max(50).default(1),
  pageSize: numberType().int().min(1).max(20).default(12)
}).optional().default({
  page: 1,
  pageSize: 12
}).parse(input ?? {})).handler(listPublicRooms_createServerFn_handler, async ({
  data
}) => {
  const admin = await getAdmin();
  const from = (data.page - 1) * data.pageSize;
  const to = from + data.pageSize - 1;
  const {
    data: rooms,
    count
  } = await admin.from("rooms").select("id,code,max_players,total_rounds,round_seconds,language,status,created_at", {
    count: "exact"
  }).eq("is_public", true).in("status", ["waiting", "choosing", "drawing", "round_end"]).order("created_at", {
    ascending: false
  }).range(from, to);
  const ids = (rooms ?? []).map((r) => r.id);
  const playerCounts = /* @__PURE__ */ new Map();
  if (ids.length > 0) {
    const {
      data: players
    } = await admin.from("room_players").select("room_id").in("room_id", ids);
    (players ?? []).forEach((p) => playerCounts.set(p.room_id, (playerCounts.get(p.room_id) ?? 0) + 1));
  }
  return {
    total: count ?? 0,
    page: data.page,
    pageSize: data.pageSize,
    rooms: (rooms ?? []).map((r) => ({
      ...r,
      playerCount: playerCounts.get(r.id) ?? 0
    }))
  };
});
export {
  autoChooseWord_createServerFn_handler,
  chooseWord_createServerFn_handler,
  createRoom_createServerFn_handler,
  endRound_createServerFn_handler,
  joinRoom_createServerFn_handler,
  kickPlayer_createServerFn_handler,
  leaveRoom_createServerFn_handler,
  listPublicRooms_createServerFn_handler,
  nextTurn_createServerFn_handler,
  resetGame_createServerFn_handler,
  revealLetter_createServerFn_handler,
  startGame_createServerFn_handler,
  submitGuess_createServerFn_handler,
  updateRoomSettings_createServerFn_handler
};
