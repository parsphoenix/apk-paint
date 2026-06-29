
-- Enable extensions
create extension if not exists "pgcrypto";

-- ROOMS
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  host_id uuid not null,
  status text not null default 'waiting', -- waiting | choosing | drawing | round_end | game_end
  is_public boolean not null default false,
  max_players int not null default 8,
  total_rounds int not null default 3,
  round_seconds int not null default 80,
  choose_seconds int not null default 15,
  language text not null default 'both', -- fa | en | both
  use_custom_only boolean not null default false,
  custom_words text[] not null default '{}',
  current_round int not null default 0,
  current_turn int not null default 0,
  current_drawer_id uuid,
  word_choices text[] default null,
  word_mask text default null,
  round_started_at timestamptz,
  round_ends_at timestamptz,
  drawer_order uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.rooms to authenticated;
grant all on public.rooms to service_role;

alter table public.rooms enable row level security;

create policy "rooms readable" on public.rooms
  for select to authenticated using (true);

create policy "rooms insert by self as host" on public.rooms
  for insert to authenticated with check (host_id = auth.uid());

create policy "rooms updatable by host" on public.rooms
  for update to authenticated using (host_id = auth.uid()) with check (host_id = auth.uid());

create policy "rooms delete by host" on public.rooms
  for delete to authenticated using (host_id = auth.uid());

-- ROOM PLAYERS
create table public.room_players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null,
  nickname text not null,
  avatar_color text not null default '#3B82F6',
  score int not null default 0,
  round_score int not null default 0,
  has_guessed boolean not null default false,
  guess_order int default null,
  is_connected boolean not null default true,
  joined_at timestamptz not null default now(),
  unique (room_id, user_id)
);

grant select, insert, update, delete on public.room_players to authenticated;
grant all on public.room_players to service_role;

alter table public.room_players enable row level security;

create policy "players readable" on public.room_players
  for select to authenticated using (true);

create policy "players self insert" on public.room_players
  for insert to authenticated with check (user_id = auth.uid());

create policy "players self update" on public.room_players
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "players self delete" on public.room_players
  for delete to authenticated using (user_id = auth.uid());

-- ROOM SECRETS (current word visible only to the drawer)
create table public.room_secrets (
  room_id uuid primary key references public.rooms(id) on delete cascade,
  current_word text,
  updated_at timestamptz not null default now()
);

grant select on public.room_secrets to authenticated;
grant all on public.room_secrets to service_role;

alter table public.room_secrets enable row level security;

create policy "secrets visible to drawer" on public.room_secrets
  for select to authenticated using (
    exists (
      select 1 from public.rooms r
      where r.id = room_id and r.current_drawer_id = auth.uid()
    )
  );

-- ROOM MESSAGES (chat)
create table public.room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid,
  nickname text not null,
  avatar_color text not null default '#3B82F6',
  content text not null,
  kind text not null default 'chat', -- chat | system | correct | close
  created_at timestamptz not null default now()
);

grant select, insert on public.room_messages to authenticated;
grant all on public.room_messages to service_role;

alter table public.room_messages enable row level security;

create policy "messages readable" on public.room_messages
  for select to authenticated using (true);

create policy "messages insert by self" on public.room_messages
  for insert to authenticated with check (
    user_id = auth.uid()
    and exists (select 1 from public.room_players p where p.room_id = room_messages.room_id and p.user_id = auth.uid())
  );

-- WORD BANK
create table public.word_bank (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  language text not null, -- 'fa' | 'en'
  category text
);

grant select on public.word_bank to authenticated;
grant all on public.word_bank to service_role;

alter table public.word_bank enable row level security;

create policy "word_bank readable" on public.word_bank
  for select to authenticated using (true);

create index word_bank_lang_idx on public.word_bank(language);
create index room_players_room_idx on public.room_players(room_id);
create index room_messages_room_idx on public.room_messages(room_id, created_at);

-- Updated at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger rooms_touch before update on public.rooms
for each row execute function public.touch_updated_at();

-- Realtime
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_players;
alter publication supabase_realtime add table public.room_messages;
alter publication supabase_realtime add table public.room_secrets;

alter table public.rooms replica identity full;
alter table public.room_players replica identity full;
alter table public.room_messages replica identity full;
alter table public.room_secrets replica identity full;
