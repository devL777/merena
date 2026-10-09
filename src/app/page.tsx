"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { defaultProducts, type Product } from "@/lib/products";
import { defaultSiteAssets, type SiteAsset } from "@/lib/site-assets";

const whatsappUrl = "https://wa.link/ohf93g";
const catalogUrl = "https://wa.me/c/250904154501186";
const instagramUrl = "https://www.instagram.com/beachwear.merena/";
const facebookUrl = "https://www.facebook.com/people/Merena-Beachwear/61570299508001/";
const whatsappProductNumber = "250904154501186";

function productWhatsAppUrl(name: string) {
  const message = `Olá! Tenho interesse no ${name} da Merena Beachwear. Pode me passar mais informações e o valor?`;
  return `https://wa.me/${whatsappProductNumber}?text=${encodeURIComponent(message)}`;
}

function trackMetaEvent(eventName: string) {
  if (typeof window === "undefined") return;

  const fbq = (
    window as typeof window & {
      fbq?: (...args: unknown[]) => void;
    }
  ).fbq;

  if (fbq) {
    fbq("trackCustom", eventName);
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [siteAssets, setSiteAssets] = useState<SiteAsset[]>(defaultSiteAssets);

  function assetImage(id: string) {
    return siteAssets.find((asset) => asset.id === id)?.image ?? "/header.png";
  }

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Product[] | null) => {
        if (Array.isArray(data) && data.length) setProducts(data);
      })
      .catch(() => undefined);

    fetch("/api/site-assets", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: SiteAsset[] | null) => {
        if (Array.isArray(data) && data.length) setSiteAssets(data);
      })
      .catch(() => undefined);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe5] text-[#34422d]">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="beach-light beach-light-one" />
        <div className="beach-light beach-light-two" />
        <div className="beach-light beach-light-three" />
      </div>

      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-5 pb-14 pt-7 sm:px-6 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10 lg:px-10 lg:py-12">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Image
              src={assetImage("brand-logo")}
              alt="Símbolo da Merena Beachwear"
              width={160}
              height={160}
              unoptimized
              priority
              className="hero-reveal hero-reveal-delay-1 h-auto w-20 rounded-full object-cover sm:w-24 lg:w-28"
            />

            <div className="hero-reveal hero-reveal-delay-2 mt-5 max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#788268] sm:text-xs">
                Merena Beachwear
              </p>

              <h1
                id="hero-title"
                className="mx-auto mt-3 max-w-[360px] text-[36px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#34422d] sm:max-w-lg sm:text-5xl lg:mx-0 lg:max-w-[500px] lg:text-6xl"
              >
                Biquínis que traduzem sua essência.
              </h1>

              <p className="mx-auto mt-4 max-w-[340px] text-[15px] leading-6 text-[#66705d] sm:max-w-md sm:text-base lg:mx-0 lg:max-w-[460px] lg:text-lg lg:leading-7">
                Liberdade, beleza e estilo para aproveitar cada momento do
                verão.
              </p>

              <div className="hero-reveal hero-reveal-delay-3 mt-7 w-full">
                <div className="mx-auto flex w-full max-w-md flex-col gap-3 lg:mx-0">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaEvent("WhatsAppClick")}
                      className="soft-button inline-flex min-h-14 items-center justify-center rounded-full bg-[#4f5f43] px-5 text-center text-sm font-semibold text-white hover:bg-[#3f4d36]"
                    >
                      Chamar no WhatsApp
                    </a>

                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaEvent("CatalogClick")}
                      className="soft-button inline-flex min-h-14 items-center justify-center rounded-full border border-[#a9ae9d] px-5 text-center text-sm font-semibold text-[#4f5f43] hover:border-[#4f5f43] hover:bg-[#4f5f43] hover:text-white"
                    >
                      Ver coleção
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-5 lg:justify-start">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaEvent("InstagramClick")}
                      aria-label="Instagram da Merena"
                      title="Instagram"
                      className="soft-button inline-flex h-12 w-12 items-center justify-center rounded-full text-[#66705d] hover:text-[#34422d]"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaEvent("FacebookClick")}
                      aria-label="Facebook da Merena"
                      title="Facebook"
                      className="soft-button inline-flex h-12 w-12 items-center justify-center rounded-full text-[#66705d] hover:text-[#34422d]"
                    >
                      <FacebookIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* HERO IMAGE */}
          <div className="hero-reveal hero-reveal-delay-4 mt-8 lg:mt-0">
            <div className="relative mx-auto w-full max-w-[680px] lg:ml-auto lg:mr-0">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[18px] border border-[#7c886d]/15 sm:-inset-3"
              />

              <div className="hero-image-frame relative overflow-hidden rounded-[14px] bg-[#ddd4c5] shadow-[0_24px_70px_rgba(61,72,52,0.14)]">
                <Image
                  src={assetImage("hero-campaign")}
                  alt="Campanha Merena Beachwear"
                  width={900}
                  height={1900}
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 92vw, 680px"
                  className="image-hover h-auto w-full object-contain"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARROSSEL DE PRODUTOS */}
      <section
        aria-labelledby="produtos-title"
        className="relative border-t border-[#556149]/10 px-4 py-14 sm:px-6 sm:py-16 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <header className="scroll-reveal mb-7 flex items-end justify-between gap-4 sm:mb-9">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#788268] sm:text-xs">
                Escolha o seu
              </p>
              <h2
                id="produtos-title"
                className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#34422d] sm:text-4xl"
              >
                Biquínis Merena
              </h2>
            </div>
            <p className="hidden pb-1 text-sm text-[#687060] sm:block">
              Deslize para ver os modelos
            </p>
          </header>

          <div
            aria-label="Modelos de biquíni. Deslize horizontalmente para navegar."
            className="carousel-no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-10 lg:px-10"
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={productWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMetaEvent("WhatsAppClick")}
                aria-label={`Consultar ${product.name} pelo WhatsApp`}
                className="soft-button group w-[72vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-[16px] border border-[#556149]/10 bg-white/60 text-left shadow-[0_10px_35px_rgba(61,72,52,0.07)] sm:w-[260px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ded7c9]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 72vw, 260px"
                    className="image-hover object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <div>
                    <p className="text-sm font-semibold text-[#34422d]">
                      {product.name}
                    </p>
                    {product.description && (
                      <p className="mt-1 line-clamp-2 min-h-10 text-sm text-[#687060]">
                        {product.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-[#687060]">Consulte o valor</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-1 text-xs text-[#687060] sm:hidden">
            Deslize para ver os modelos
          </p>
        </div>
      </section>

      {/* VITRINE */}
      <section
        aria-labelledby="modelos-title"
        className="relative border-t border-[#556149]/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="scroll-reveal mx-auto mb-10 max-w-xl text-center sm:mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#788268] sm:text-xs">
              Merena
            </p>

            <h2
              id="modelos-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#34422d] sm:text-5xl"
            >
              Conheça a Merena.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-[15px] leading-6 text-[#687060] sm:text-base">
              Moda praia feita para acompanhar momentos que combinam com você.
            </p>
          </header>

          {/* MOBILE + TABLET */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <article className="scroll-reveal-left group relative col-span-2 overflow-hidden rounded-[14px] bg-[#ded7c9]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={assetImage("gallery-feature-mobile")}
                  alt="Modelo usando biquíni Merena"
                  fill
                  unoptimized
                  sizes="100vw"
                  className="image-hover object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white sm:p-5 sm:text-base">
                  Merena Beachwear
                </p>
              </div>
            </article>

            <ShowcaseCard
              src={assetImage("gallery-identity")}
              alt="Identidade visual Merena"
              label="Identidade em cada detalhe"
              delay="showcase-delay-2"
            />

            <ShowcaseCard
              src={assetImage("gallery-style")}
              alt="Modelos Merena Beachwear"
              label="Estilo Merena"
              delay="showcase-delay-3"
            />

            <ShowcaseCard
              src={assetImage("gallery-essence")}
              alt="Modelo usando biquíni Merena"
              label="Seu estilo, sua essência"
              delay="showcase-delay-4"
            />

            <ShowcaseCard
              src={assetImage("gallery-details")}
              alt="Detalhes das peças Merena"
              label="Detalhes que fazem diferença"
              delay="showcase-delay-5"
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden grid-cols-4 grid-rows-2 gap-4 lg:grid lg:gap-5">
            <article className="scroll-reveal-left group relative col-span-2 row-span-2 min-h-[540px] overflow-hidden rounded-[18px] bg-[#ded7c9]">
              <Image
                src={assetImage("gallery-feature-desktop")}
                alt="Modelo usando biquíni Merena"
                fill
                unoptimized
                sizes="50vw"
                className="image-hover object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <p className="absolute bottom-0 left-0 right-0 p-6 text-lg font-semibold text-white">
                Merena Beachwear
              </p>
            </article>

            <ShowcaseCard
              src={assetImage("gallery-identity")}
              alt="Identidade visual Merena"
              label="Identidade em cada detalhe"
              desktop
              delay="showcase-delay-2"
            />

            <ShowcaseCard
              src={assetImage("gallery-style")}
              alt="Modelos Merena Beachwear"
              label="Estilo Merena"
              desktop
              delay="showcase-delay-3"
            />

            <ShowcaseCard
              src={assetImage("gallery-essence")}
              alt="Modelo usando biquíni Merena"
              label="Seu estilo, sua essência"
              desktop
              delay="showcase-delay-4"
            />

            <ShowcaseCard
              src={assetImage("gallery-details")}
              alt="Detalhes das peças Merena"
              label="Detalhes que fazem diferença"
              desktop
              delay="showcase-delay-5"
            />
          </div>

          <div className="scroll-reveal mt-9 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("CatalogClick")}
              className="soft-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#4f5f43] px-7 text-sm font-semibold text-white hover:bg-[#3f4d36]"
            >
              Ver coleção no WhatsApp
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("InstagramClick")}
              className="soft-button inline-flex min-h-12 items-center justify-center rounded-full border border-[#a9ae9d] px-7 text-sm font-semibold text-[#4f5f43] hover:border-[#4f5f43] hover:bg-[#4f5f43] hover:text-white"
            >
              Ver mais no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE A MARCA */}
      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="scroll-reveal">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#788268] sm:text-xs">
                Sobre a Merena
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-[#34422d] sm:text-5xl">
                Estilo que celebra confiança e liberdade.
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-6 text-[#687060] sm:text-base">
                A Merena nasceu para acompanhar o verão com peças que unem
                conforto, versatilidade e personalidade. Cada produção foi
                pensada para valorizar sua essência e deixar você mais confiante
                em cada momento.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Conforto",
                    text: "Materiais leves e peças pensadas para o dia a dia.",
                  },
                  {
                    title: "Estilo",
                    text: "Linhas que realçam sua personalidade e deixam o look único.",
                  },
                  {
                    title: "Atendimento",
                    text: "Fale diretamente com a marca e tire suas dúvidas rapidamente.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[16px] border border-[#556149]/10 bg-white/60 p-4 shadow-[0_10px_30px_rgba(61,72,52,0.04)]"
                  >
                    <p className="text-base font-semibold text-[#34422d]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-5 text-[#687060]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-reveal-right">
              <div className="relative overflow-hidden rounded-[18px] bg-[#ded7c9] shadow-[0_24px_60px_rgba(61,72,52,0.12)]">
                <Image
                  src={assetImage("hero-campaign")}
                  alt="Biquínis Merena em campanha"
                  width={900}
                  height={1200}
                  unoptimized
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        aria-labelledby="contato-title"
        className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[18px] bg-[#4f5f43] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs">
            Fale com a Merena
          </p>

          <h2
            id="contato-title"
            className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-5xl"
          >
            Gostou de algum modelo?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            Chame pelo WhatsApp e fale diretamente com a Merena.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetaEvent("WhatsAppClick")}
            className="soft-button mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-[#f4efe5] px-8 text-sm font-semibold text-[#34422d] hover:bg-white sm:w-auto"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#556149]/10 px-5 py-7 sm:px-6 lg:px-10">
        <div className="scroll-reveal mx-auto flex max-w-7xl flex-col items-center gap-3 text-center text-sm text-[#747c6c] sm:flex-row sm:justify-between sm:text-left">
          <p>© Merena Beachwear</p>

          <div className="flex items-center gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("InstagramClick")}
              aria-label="Instagram da Merena"
              title="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#66705d] transition hover:text-[#34422d]"
            >
              <InstagramIcon />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaEvent("FacebookClick")}
              aria-label="Facebook da Merena"
              title="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#66705d] transition hover:text-[#34422d]"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </footer>

      {/* ANIMATION STYLES */}
      <style jsx global>{`
        .hero-reveal {
          opacity: 0;
          transform: translateY(28px);
          animation: merenaHeroReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .hero-reveal-delay-1 {
          animation-delay: 0.08s;
        }

        .hero-reveal-delay-2 {
          animation-delay: 0.2s;
        }

        .hero-reveal-delay-3 {
          animation-delay: 0.34s;
        }

        .hero-reveal-delay-4 {
          animation-delay: 0.18s;
        }

        .soft-button {
          transition:
            transform 0.25s ease,
            background-color 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .soft-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(61, 72, 52, 0.12);
        }

        .soft-button:active {
          transform: translateY(0) scale(0.98);
        }

        .image-hover {
          transition:
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.8s ease;
        }

        .group:hover .image-hover {
          transform: scale(1.035);
        }

        .hero-image-frame .image-hover:hover {
          transform: scale(1.012);
        }

        .beach-light {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background: rgba(166, 175, 141, 0.12);
          filter: blur(80px);
          animation: merenaLight 12s ease-in-out infinite alternate;
        }

        .beach-light-one {
          top: -180px;
          left: -120px;
        }

        .beach-light-two {
          top: 40%;
          right: -220px;
          animation-delay: 2s;
        }

        .beach-light-three {
          bottom: -220px;
          left: 30%;
          animation-delay: 4s;
        }

        @keyframes merenaHeroReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes merenaLight {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            transform: translate3d(25px, -20px, 0) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .beach-light {
            animation: none;
          }

          .soft-button,
          .image-hover {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-current"
      focusable="false"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.016 10.125 11.926v-8.432H7.078v-3.494h3.047V9.41c0-3.025 1.792-4.704 4.533-4.704 1.312 0 2.686.235 2.686.235v2.973h-1.513c-1.49 0-1.954.933-1.954 1.889v2.27h3.328l-.532 3.494h-2.796v8.432C19.612 23.09 24 18.092 24 12.073z" />
    </svg>
  );
}

function ShowcaseCard({
  src,
  alt,
  label,
  desktop = false,
  delay = "",
}: {
  src: string;
  alt: string;
  label: string;
  desktop?: boolean;
  delay?: string;
}) {
  return (
    <article
      className={`showcase-reveal ${delay} group relative overflow-hidden bg-[#ded7c9] ${desktop
          ? "min-h-[260px] rounded-[18px]"
          : "aspect-[4/5] rounded-[14px]"
        }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={desktop ? "25vw" : "50vw"}
        unoptimized
        className="image-hover object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <p
        className={`absolute bottom-0 left-0 right-0 font-semibold text-white ${desktop ? "p-5 text-base" : "p-4 text-sm"
          }`}
      >
        {label}
      </p>
    </article>
  );
}
