create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  bio text,
  timezone text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists timezone text;
alter table public.profiles add column if not exists created_at timestamptz not null default timezone('utc'::text, now());

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  completed_at timestamptz not null default timezone('utc'::text, now()),
  primary key (user_id, lesson_slug)
);

create table if not exists public.learning_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null,
  lesson_slug text not null,
  lesson_title text not null,
  activity_context text,
  correct_count integer,
  total_questions integer,
  passed boolean,
  response_preview text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.learning_activity add column if not exists activity_context text;
alter table public.learning_activity add column if not exists response_preview text;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update
set public = excluded.public;

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.learning_activity enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can read their own lesson progress" on public.lesson_progress;
drop policy if exists "Users can insert their own lesson progress" on public.lesson_progress;
drop policy if exists "Users can delete their own lesson progress" on public.lesson_progress;
drop policy if exists "Users can read their own learning activity" on public.learning_activity;
drop policy if exists "Users can insert their own learning activity" on public.learning_activity;
drop policy if exists "Users can delete their own learning activity" on public.learning_activity;
drop policy if exists "Users can upload their own avatars" on storage.objects;
drop policy if exists "Users can update their own avatars" on storage.objects;
drop policy if exists "Users can delete their own avatars" on storage.objects;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read their own lesson progress"
on public.lesson_progress
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own lesson progress"
on public.lesson_progress
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own lesson progress"
on public.lesson_progress
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Users can read their own learning activity"
on public.learning_activity
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own learning activity"
on public.learning_activity
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own learning activity"
on public.learning_activity
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Users can upload their own avatars"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update their own avatars"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own avatars"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);
