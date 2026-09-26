import Image from "next/image";

const whatsappUrl = "https://wa.link/ohf93g";
const instagramUrl = "https://www.instagram.com/beachwear.merena/";

const showcases = [
  {
    image: "/modelo2.jpg",
    alt: "Modelo usando biquíni Merena em ambiente natural",
    label: "Merena Beachwear",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    image: "/modelo1.jpg",
    alt: "Detalhe de modelo usando biquíni Merena",
    label: "Seu estilo, sua essência",
    className: "",
  },
  {
    image: "/imagem3.jpg",
    alt: "Embalagem da Merena Beachwear",
    label: "Identidade em cada detalhe",
    className: "",
  },
  {
    image: "/modelo3.jpg",
    alt: "Modelo usando biquíni Merena",
    label: "Feito para acompanhar você",
    className: "",
  },
  {
    image: "/calcinha1.jpg",
    alt: "Detalhes de peças da Merena Beachwear",
    label: "Detalhes que fazem diferença",
    className: "",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4efe5] text-[#34422d]">
      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#7f8c69]/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#c79c72]/15 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col px-5 pb-14 pt-7 sm:px-6 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-12">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Image
              src="/logo.jpeg"
              alt="Símbolo da Merena Beachwear"
              width={160}
              height={160}
              priority
              className="h-auto w-20 rounded-full object-cover sm:w-24 lg:w-28"
            />

            <div className="mt-5 max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#788268] sm:text-xs">
                Merena Beachwear
              </p>

              <h1
                id="hero-title"
                className="mx-auto mt-3 max-w-[360px] text-[36px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#34422d] sm:max-w-lg sm:text-5xl lg:mx-0 lg:text-7xl"
              >
                Biquínis que traduzem sua essência.
              </h1>

              <p className="mx-auto mt-4 max-w-[340px] text-[15px] leading-6 text-[#66705d] sm:max-w-md sm:text-base lg:mx-0 lg:text-lg lg:leading-7">
                Liberdade, beleza e estilo para aproveitar cada momento do verão.
              </p>
            </div>
          </header>

          <div className="mt-7 lg:mt-0">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[1.8rem] border border-[#7c886d]/20 sm:-inset-3 sm:rounded-[2.2rem]"
              />

              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#ddd4c5] shadow-[0_24px_60px_rgba(61,72,52,0.16)] sm:rounded-[2rem]">
                <Image
                  src="/fotoprincipal.jpeg"
                  alt="Campanha Merena Beachwear"
                  width={1200}
                  height={1500}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-7 lg:col-start-1 lg:mt-8">
            <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row lg:mx-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-[#4f5f43] px-7 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3f4d36]"
              >
                Falar no WhatsApp
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full border border-[#a9ae9d] px-7 text-sm font-semibold text-[#4f5f43] transition duration-300 hover:border-[#4f5f43] hover:bg-[#4f5f43] hover:text-white"
              >
                Ver Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE */}
      <section
        aria-labelledby="modelos-title"
        className="border-t border-[#556149]/10 px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-9 max-w-xl text-center sm:mb-12">
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

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:auto-rows-[260px]">
            {showcases.map((item) => (
              <article
                key={item.image}
                className={`group relative overflow-hidden rounded-[1.4rem] bg-[#ded7c9] ${item.className}`}
              >
                <div className="relative h-full min-h-[260px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent"
                  />

                  <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white sm:p-5 sm:text-base">
                    {item.label}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#a9ae9d] px-7 text-sm font-semibold text-[#4f5f43] transition duration-300 hover:border-[#4f5f43] hover:bg-[#4f5f43] hover:text-white"
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
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] bg-[#4f5f43] px-6 py-12 text-center text-white sm:rounded-[2rem] sm:px-12 sm:py-16">
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
            className="mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-[#f4efe5] px-8 text-sm font-semibold text-[#34422d] transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
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
            className="transition hover:text-[#34422d]"
          >
            @beachwear.merena
          </a>
        </div>
      </footer>
    </main>
  );
}