"use client";

import Image from "next/image";

const whatsappUrl = "https://wa.link/ohf93g";
const catalogUrl = "https://wa.me/c/250904154501186";
const instagramUrl = "https://www.instagram.com/beachwear.merena/";

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
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe5] text-[#34422d]">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="beach-light beach-light-one" />
        <div className="beach-light beach-light-two" />
        <div className="beach-light beach-light-three" />
      </div>

      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col px-5 pb-14 pt-7 sm:px-6 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10 lg:px-10 lg:py-12">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Image
              src="/logo.jpeg"
              alt="Símbolo da Merena Beachwear"
              width={160}
              height={160}
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
                Liberdade, beleza e estilo para aproveitar cada momento do verão.
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

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMetaEvent("InstagramClick")}
                    className="soft-button inline-flex min-h-12 items-center justify-center text-sm font-semibold text-[#66705d] hover:text-[#34422d]"
                  >
                    Ver Instagram
                  </a>
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
                  src="/header.png"
                  alt="Campanha Merena Beachwear"
                  width={900}
                  height={1900}
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

      {/* VITRINE */}
      <section
        aria-labelledby="modelos-title"
        className="relative border-t border-[#556149]/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-10 max-w-xl text-center sm:mb-12">
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
            <article className="showcase-reveal showcase-delay-1 group relative col-span-2 overflow-hidden rounded-[14px] bg-[#ded7c9]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/1mobile.png"
                  alt="Modelo usando biquíni Merena"
                  fill
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
              src="/2.png"
              alt="Identidade visual Merena"
              label="Identidade em cada detalhe"
              delay="showcase-delay-2"
            />

            <ShowcaseCard
              src="/3.png"
              alt="Modelos Merena Beachwear"
              label="Estilo Merena"
              delay="showcase-delay-3"
            />

            <ShowcaseCard
              src="/4.png"
              alt="Modelo usando biquíni Merena"
              label="Seu estilo, sua essência"
              delay="showcase-delay-4"
            />

            <ShowcaseCard
              src="/5.png"
              alt="Detalhes das peças Merena"
              label="Detalhes que fazem diferença"
              delay="showcase-delay-5"
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden grid-cols-4 grid-rows-2 gap-4 lg:grid lg:gap-5">
            <article className="showcase-reveal showcase-delay-1 group relative col-span-2 row-span-2 min-h-[540px] overflow-hidden rounded-[18px] bg-[#ded7c9]">
              <Image
                src="/1.png"
                alt="Modelo usando biquíni Merena"
                fill
                sizes="50vw"
                className="image-hover object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <p className="absolute bottom-0 left-0 right-0 p-6 text-lg font-semibold text-white">
                Merena Beachwear
              </p>
            </article>

            <ShowcaseCard
              src="/2.png"
              alt="Identidade visual Merena"
              label="Identidade em cada detalhe"
              desktop
              delay="showcase-delay-2"
            />

            <ShowcaseCard
              src="/3.png"
              alt="Modelos Merena Beachwear"
              label="Estilo Merena"
              desktop
              delay="showcase-delay-3"
            />

            <ShowcaseCard
              src="/4.png"
              alt="Modelo usando biquíni Merena"
              label="Seu estilo, sua essência"
              desktop
              delay="showcase-delay-4"
            />

            <ShowcaseCard
              src="/5.png"
              alt="Detalhes das peças Merena"
              label="Detalhes que fazem diferença"
              desktop
              delay="showcase-delay-5"
            />
          </div>

          <div className="mt-9 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
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
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center text-sm text-[#747c6c] sm:flex-row sm:justify-between sm:text-left">
          <p>© Merena Beachwear</p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetaEvent("InstagramClick")}
            className="transition hover:text-[#34422d]"
          >
            @beachwear.merena
          </a>
        </div>
      </footer>
    </main>
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
      className={`showcase-reveal ${delay} group relative overflow-hidden bg-[#ded7c9] ${
        desktop
          ? "min-h-[260px] rounded-[18px]"
          : "aspect-[4/5] rounded-[14px]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={desktop ? "25vw" : "50vw"}
        className="image-hover object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <p
        className={`absolute bottom-0 left-0 right-0 font-semibold text-white ${
          desktop ? "p-5 text-base" : "p-4 text-sm"
        }`}
      >
        {label}
      </p>
    </article>
  );
}