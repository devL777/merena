create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  image_url text not null,
  sort_order integer not null unique
);

alter table public.products enable row level security;

insert into public.products (id, name, description, image_url, sort_order)
values
  ('model-01', 'Modelo 01', '', '/biquini1.png', 1),
  ('model-02', 'Modelo 02', '', '/biquini2.png', 2),
  ('model-03', 'Modelo 03', '', '/biquini3.png', 3),
  ('model-04', 'Modelo 04', '', '/biquini4.png', 4),
  ('model-05', 'Modelo 05', '', '/biquini5.png', 5),
  ('model-06', 'Modelo 06', '', '/biquini6.png', 6)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('merena-product-images', 'merena-product-images', true)
on conflict (id) do nothing;
