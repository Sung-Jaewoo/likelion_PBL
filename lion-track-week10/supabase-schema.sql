create table if not exists public.lions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  part text not null check (part in ('Frontend', 'Backend', 'Design')),
  grade text not null,
  tech text[] not null default '{}',
  intro text not null,
  detail_intro text not null,
  email text not null,
  phone text not null default '',
  website text not null default '',
  comment text not null default '',
  image text not null default 'https://placehold.co/600x400?text=Lion',
  badge text,
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.lions enable row level security;

drop policy if exists "Anyone can read lions" on public.lions;
create policy "Anyone can read lions"
on public.lions for select
using (true);

drop policy if exists "Authenticated users can insert lions" on public.lions;
create policy "Authenticated users can insert lions"
on public.lions for insert
to authenticated
with check (auth.uid() = owner_id);

drop policy if exists "Authenticated users can delete lions" on public.lions;
create policy "Authenticated users can delete lions"
on public.lions for delete
to authenticated
using (auth.uid() is not null);
