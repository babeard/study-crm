-- -- System configurations
-- create table public.configs (
--   id serial not null primary key,
  
--   name text not null,
--   value text not null,

--   possible text[],
  
--   created_at timestamptz default now()
-- );
-- -- For example
-- -- insert into public.configs (name, value, possible) values (
-- --  'ASSIGNMENT_RULE', 'ROUND_ROBIN', '{"ROUND_ROBIN", "MANUAL"}'
-- -- ),(
-- --   'ROUND_ROBIN_LAST_ID', '0', null
-- );

-- Workers
create type worker_role as enum ('administrator', 'worker');
create table public.workers (
  id uuid references auth.users on delete cascade not null primary key,

  rr_id serial not null unique,
  
  first_name text,
  last_name text,
  
  role worker_role not null default 'worker'::worker_role,

  max_students smallint not null default 20,

  address text,

  avatar_url text,

  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz
);

-- RLS for workers
alter table workers
  enable row level security;

create policy "Worker profiles are viewable by all logged in" 
  on public.workers for select
  to authenticated
  using (true);

create policy "Workers can insert their own profile." 
  on public.workers for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Workers can update own profile or admins." 
  on public.workers for update
  to authenticated
  using ((select auth.uid()) = id or role = 'administrator'::worker_role);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.workers (id, first_name, last_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create students table
create type student_stage as enum ('lead', 'enrolled', 'alumni');

create table public.students (
  id uuid not null primary key default uuid_generate_v4(),
  name text not null,

  email text,
  phone text,

  stage student_stage not null default 'lead'::student_stage,

  do_not_contact boolean not null default false,
  internal_notes text,
  lead_source text, -- VOP, Amazing Facts, Other

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.addresses (
  id serial not null primary key,
  student_id uuid not null references public.students(id) on delete cascade,
  
  address text not null,

  -- TODO: add postgis geolocation for latitude/longitude

  is_default boolean not null default false,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create studies table
create table public.studies (
  id serial not null primary key,

  name text not null,
  description text,
  image_url text,
  
  created_at timestamptz default now()
);

create table public.lessons (
  id serial not null primary key,
  study_id int not null references public.studies(id) on delete cascade,
  
  name text not null,
  description text,
  image_url text,

  total_score int not null,
  
  created_at timestamptz default now()
);

-- Create study subscriptions
create type subscription_status as enum ('active', 'graduated', 'dropped');
create table public.subscriptions (
  id serial not null primary key,
  
  student_id uuid not null references public.students(id) on delete cascade,
  study_id int not null references public.studies(id) on delete cascade,

  assigned_worker_id uuid references public.workers(id) on delete set null,
  assigned_at timestamptz,

  status subscription_status not null default 'active'::subscription_status,
  
  created_at timestamptz default now()
);

create table public.progressions (
  id serial not null primary key,
  
  lesson_id int not null references public.lessons(id) on delete cascade,
  subscription_id int not null references public.subscriptions(id) on delete cascade,

  sent_at timestamptz,
  returned_at timestamptz,

  score smallint,
  
  created_at timestamptz default now()
);

-- live corresponds with `in-person`, `call`, or `video`
create type interaction_event as enum ('sent', 'received', 'live'); 
create type interaction_type as enum ('letter', 'email', 'sms', 'call', 'video', 'in-person');
create table public.interactions (
  id serial not null primary key,

  progression_id int not null references public.progressions(id) on delete cascade,
  
  worker_id uuid not null references public.workers(id) on delete restrict,

  interaction_event interaction_event not null default 'sent'::interaction_event,
  interaction_type interaction_type not null default 'letter'::interaction_type,

  -- Based on if event type letter is used.
  address_id int references public.addresses(id),

  created_at timestamptz default now()
);


create table public.interaction_files (
  id serial not null primary key,
  
  interaction_id int not null references public.interactions(id) on delete cascade,
  worker_id uuid not null references public.workers(id) on delete restrict,
  
  file_url text not null,
  
  created_at timestamptz default now()
);

create table public.progression_comments (
  id serial not null primary key,
  
  progression_id int not null references public.progressions(id) on delete cascade,  
  worker_id uuid not null references public.workers(id) on delete restrict,  
  
  comment text not null,
  is_internal boolean not null default true,
  
  created_at timestamptz default now()
);

-- Expenses
create table public.expenses (
  id serial not null primary key,

  requestor_id uuid not null references public.workers(id) on delete restrict,

  -- in cents
  total int not null,

  notes text,
  
  created_at timestamptz not null default now()
);

create type expense_item_type as enum ('labels', 'postage', 'envelopes', 'program fees', 'other');
create table public.expense_line_items (
  id serial not null primary key,

  expense_id int not null references public.expenses(id) on delete cascade,


  item_type expense_item_type not null,
  -- in cents
  amount int not null,
  notes text,

  created_at timestamptz not null default now()
);

create table public.expense_receipts (
  id serial not null primary key,

  image_url text,

  expense_id int not null references public.expenses(id) on delete cascade,
  -- Optionally attach to line item
  line_item_id int references public.expense_line_items(id) on delete set null,

  created_at timestamptz not null default now()
);

create table public.expense_reimbursements (
  id serial not null primary key,

  expense_id int not null references public.expenses(id) on delete cascade,
  paid_by_id uuid not null references public.workers(id) on delete restrict,

  amount int not null,

  check_num text,
  notes text,

  created_at timestamptz not null default now()
);

-- Round Robin
create table public.round_robin (
  id serial not null primary key,
  last_rr_id int not null references public.workers(rr_id)
);

