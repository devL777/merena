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

create table if not exists public.site_assets (
  id text primary key,
  label text not null,
  description text not null default '',
  image_url text not null,
  alt text not null default '',
  recommendation text not null default '',
  sort_order integer not null unique
);

alter table public.site_assets enable row level security;

insert into public.site_assets (id, label, description, image_url, alt, recommendation, sort_order)
values
  ('brand-logo', 'Logo da Merena', 'Imagem redonda no início da página.', '/logo.jpeg', 'Símbolo da Merena Beachwear', 'Quadrada 1:1 — ideal: 1080 × 1080 px.', 1),
  ('hero-campaign', 'Foto principal do cabeçalho', 'Foto grande que aparece no topo e também na seção Sobre a Merena.', '/header.png', 'Campanha Merena Beachwear', 'Vertical e alta — ideal: 900 × 1900 px. A seção Sobre pode cortar as laterais.', 2),
  ('gallery-feature-mobile', 'Vitrine: destaque no celular', 'Foto grande que aparece na vitrine em celulares e tablets.', '/1mobile.png', 'Modelo usando biquíni Merena', 'Horizontal 16:9 — ideal: 1600 × 900 px.', 3),
  ('gallery-feature-desktop', 'Vitrine: destaque no computador', 'Foto grande que aparece na vitrine em telas de computador.', '/1.png', 'Modelo usando biquíni Merena', 'Quadrada 1:1 — ideal: 1200 × 1200 px. O site corta para encaixar.', 4),
  ('gallery-identity', 'Vitrine: identidade em cada detalhe', 'Card com a sacola e a identidade visual da marca.', '/2.png', 'Identidade visual Merena', 'Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.', 5),
  ('gallery-style', 'Vitrine: estilo Merena', 'Card com os modelos Merena Beachwear.', '/3.png', 'Modelos Merena Beachwear', 'Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.', 6),
  ('gallery-essence', 'Vitrine: seu estilo, sua essência', 'Card com modelo usando biquíni Merena.', '/4.png', 'Modelo usando biquíni Merena', 'Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.', 7),
  ('gallery-details', 'Vitrine: detalhes que fazem diferença', 'Card com detalhes das peças Merena.', '/5.png', 'Detalhes das peças Merena', 'Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.', 8)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('merena-product-images', 'merena-product-images', true)
on conflict (id) do nothing;
