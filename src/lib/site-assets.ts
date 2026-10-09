export type SiteAsset = {
  id: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  recommendation: string;
};

export const defaultSiteAssets: SiteAsset[] = [
  {
    id: "brand-logo",
    label: "Logo da Merena",
    description: "Imagem redonda no início da página.",
    image: "/logo.jpeg",
    alt: "Símbolo da Merena Beachwear",
    recommendation: "Quadrada 1:1 — ideal: 1080 × 1080 px.",
  },
  {
    id: "hero-campaign",
    label: "Foto principal do cabeçalho",
    description: "Foto grande que aparece no topo e também na seção Sobre a Merena.",
    image: "/header.png",
    alt: "Campanha Merena Beachwear",
    recommendation: "Vertical e alta — ideal: 900 × 1900 px. A seção Sobre pode cortar as laterais.",
  },
  {
    id: "gallery-feature-mobile",
    label: "Vitrine: destaque no celular",
    description: "Foto grande que aparece na vitrine em celulares e tablets.",
    image: "/1mobile.png",
    alt: "Modelo usando biquíni Merena",
    recommendation: "Horizontal 16:9 — ideal: 1600 × 900 px.",
  },
  {
    id: "gallery-feature-desktop",
    label: "Vitrine: destaque no computador",
    description: "Foto grande que aparece na vitrine em telas de computador.",
    image: "/1.png",
    alt: "Modelo usando biquíni Merena",
    recommendation: "Quadrada 1:1 — ideal: 1200 × 1200 px. O site corta para encaixar.",
  },
  {
    id: "gallery-identity",
    label: "Vitrine: identidade em cada detalhe",
    description: "Card com a sacola e a identidade visual da marca.",
    image: "/2.png",
    alt: "Identidade visual Merena",
    recommendation: "Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.",
  },
  {
    id: "gallery-style",
    label: "Vitrine: estilo Merena",
    description: "Card com os modelos Merena Beachwear.",
    image: "/3.png",
    alt: "Modelos Merena Beachwear",
    recommendation: "Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.",
  },
  {
    id: "gallery-essence",
    label: "Vitrine: seu estilo, sua essência",
    description: "Card com modelo usando biquíni Merena.",
    image: "/4.png",
    alt: "Modelo usando biquíni Merena",
    recommendation: "Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.",
  },
  {
    id: "gallery-details",
    label: "Vitrine: detalhes que fazem diferença",
    description: "Card com detalhes das peças Merena.",
    image: "/5.png",
    alt: "Detalhes das peças Merena",
    recommendation: "Vertical 4:5 — ideal: 1080 × 1350 px. O site corta para encaixar.",
  },
];

export function getSiteAssetIds() {
  return new Set(defaultSiteAssets.map((asset) => asset.id));
}
