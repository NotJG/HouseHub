-- Run this once in your Supabase project's SQL editor (Database → SQL Editor → New query).

create table if not exists house_data (
  key text primary key,
  value jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table house_data enable row level security;

-- No login for this app (same pattern as your other single-purpose family/roommate tools) —
-- anyone with the site URL can read and write. Fine for a private house tool, not for anything sensitive.
create policy "public read" on house_data for select using (true);
create policy "public write" on house_data for insert with check (true);
create policy "public update" on house_data for update using (true);

-- Enable realtime so everyone's screen updates live when someone else adds something.
alter publication supabase_realtime add table house_data;
