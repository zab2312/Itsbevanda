-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  cover_image text,
  content jsonb,
  excerpt text,
  images jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid references auth.users (id) on delete set null,
  published boolean not null default false
);

-- Auto-update updated_at
create or replace function public.blog_posts_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.blog_posts_set_updated_at();

-- Enable RLS
alter table public.blog_posts enable row level security;

-- Policies
drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
using (published = true);

drop policy if exists "Authors can insert blog posts" on public.blog_posts;
create policy "Authors can insert blog posts"
on public.blog_posts
for insert
with check (auth.uid() = author_id);

drop policy if exists "Authors can update blog posts" on public.blog_posts;
create policy "Authors can update blog posts"
on public.blog_posts
for update
using (auth.uid() = author_id);

drop policy if exists "Authors can delete blog posts" on public.blog_posts;
create policy "Authors can delete blog posts"
on public.blog_posts
for delete
using (auth.uid() = author_id);

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Blog images public read" on storage.objects;
create policy "Blog images public read"
on storage.objects
for select
using (bucket_id = 'blog-images');

drop policy if exists "Blog images authenticated upload" on storage.objects;
create policy "Blog images authenticated upload"
on storage.objects
for insert
with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "Blog images authenticated delete" on storage.objects;
create policy "Blog images authenticated delete"
on storage.objects
for delete
using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

