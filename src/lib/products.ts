export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export const defaultProducts: Product[] = [
  { id: "model-01", name: "Modelo 01", description: "", image: "/biquini1.png", alt: "Biquíni Merena, modelo 1" },
  { id: "model-02", name: "Modelo 02", description: "", image: "/biquini2.png", alt: "Biquíni Merena, modelo 2" },
  { id: "model-03", name: "Modelo 03", description: "", image: "/biquini3.png", alt: "Biquíni Merena, modelo 3" },
  { id: "model-04", name: "Modelo 04", description: "", image: "/biquini4.png", alt: "Biquíni Merena, modelo 4" },
  { id: "model-05", name: "Modelo 05", description: "", image: "/biquini5.png", alt: "Biquíni Merena, modelo 5" },
  { id: "model-06", name: "Modelo 06", description: "", image: "/biquini6.png", alt: "Biquíni Merena, modelo 6" },
];
