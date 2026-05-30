-- Profiles & role-based access (run in Supabase SQL Editor)

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'author' check (role in ('author', 'superadmin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
on public.profiles
for select
using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'author')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Helper for RLS policies
create or replace function public.is_superadmin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'superadmin'
  );
$$;

-- Authors can read their own posts (including drafts)
drop policy if exists "Authors can read own blog posts" on public.blog_posts;
create policy "Authors can read own blog posts"
on public.blog_posts
for select
using (auth.uid() = author_id);

-- Superadmin full access on blog_posts
drop policy if exists "Superadmin can read all blog posts" on public.blog_posts;
create policy "Superadmin can read all blog posts"
on public.blog_posts
for select
using (public.is_superadmin());

drop policy if exists "Superadmin can insert blog posts" on public.blog_posts;
create policy "Superadmin can insert blog posts"
on public.blog_posts
for insert
with check (public.is_superadmin());

drop policy if exists "Superadmin can update all blog posts" on public.blog_posts;
create policy "Superadmin can update all blog posts"
on public.blog_posts
for update
using (public.is_superadmin());

drop policy if exists "Superadmin can delete all blog posts" on public.blog_posts;
create policy "Superadmin can delete all blog posts"
on public.blog_posts
for delete
using (public.is_superadmin());

-- Grant superadmin to an existing user (replace email):
-- update public.profiles set role = 'superadmin'
-- where id = (select id from auth.users where email = 'tvoj@email.com');

-- Backfill profiles for existing users:
-- insert into public.profiles (id, role)
-- select id, 'author' from auth.users
-- on conflict (id) do nothing;
