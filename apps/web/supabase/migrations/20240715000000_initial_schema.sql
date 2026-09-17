-- Rich Tillman Portfolio Schema
-- Run with: supabase db push (after linking project)

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  tags text[] default '{}',
  metric text,
  href text not null,
  featured boolean default false,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

-- Articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text not null,
  published_at date not null,
  read_time text not null,
  featured boolean default false,
  content text[] default '{}',
  created_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "Articles are publicly readable"
  on public.articles for select
  using (true);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text not null,
  company text not null,
  created_at timestamptz default now()
);

alter table public.testimonials enable row level security;

create policy "Testimonials are publicly readable"
  on public.testimonials for select
  using (true);

-- Contact messages (insert-only for anonymous users)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_messages for insert
  with check (true);

-- Realtime for articles (optional live updates)
alter publication supabase_realtime add table public.articles;
