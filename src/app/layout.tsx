import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merena Beachwear | Biquínis",
  description:
    "Biquínis que traduzem sua essência. Conheça a Merena Beachwear.",

  metadataBase: new URL("https://www.merena.com.br"),

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Merena Beachwear",
    description:
      "Liberdade, beleza e estilo para aproveitar cada momento do verão.",
    url: "https://www.merena.com.br",
    siteName: "Merena Beachwear",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>{children}</body>
    </html>
  );
}