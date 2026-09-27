"use client";

import Image from "next/image";
import Link from "next/link";

const CARDS = [
  { name: "Дербент", src: "/IMG_1346.JPG", delay: "0s" },
  { name: "Сулак", src: "/IMG_1350.JPG", delay: "2s" },
  { name: "Карадах", src: "/IMG_1373.JPG", delay: "4s" },
  { name: "Гамсутль", src: "/IMG_1362.JPG", delay: "1s" },
] as const;

export default function DemoMotionPage() {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.12) translate(-2%, -1%);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }

        @keyframes drift {
          0% {
            transform: scale(1.08) translate(0, 0);
          }
          50% {
            transform: scale(1.14) translate(2%, -1.5%);
          }
          100% {
            transform: scale(1.08) translate(0, 0);
          }
        }

        .kenburns-img {
          animation: kenburns 18s ease-in-out infinite;
          will-change: transform;
        }

        .drift-img {
          animation: drift 14s ease-in-out infinite;
          will-change: transform;
        }

        .card-live {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .card-live:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        }

        .card-live:hover .card-zoom {
          transform: scale(1.08);
        }

        .card-zoom {
          transition: transform 0.7s ease;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .kenburns-img,
          .drift-img {
            animation: none !important;
          }
          .card-live:hover .card-zoom {
            transform: none;
          }
        }
      `}</style>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-charcoal/80 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-sm font-medium text-emerald-light">
            Демо: живые фото (не на основном сайте)
          </p>
          <Link
            href="/"
            className="rounded-pill bg-emerald px-4 py-2 text-sm font-medium text-white hover:bg-emerald-light"
          >
            ← На главную
          </Link>
        </div>
      </header>

      {/* 1. Hero Ken Burns */}
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/Derbent.WEBP"
            alt="Дербент — демо Ken Burns"
            fill
            priority
            className="kenburns-img object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-charcoal" />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-12 md:px-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-emerald-light">
            Эффект 1 · Ken Burns
          </p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
            Фото медленно «дышит»
          </h1>
          <p className="mt-3 max-w-lg text-white/75">
            Лёгкий zoom и сдвиг фона — картинка живая, без видеофайла.
          </p>
        </div>
      </section>

      {/* 2. Cards with continuous drift + hover */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs font-medium uppercase tracking-widest text-emerald-light">
          Эффект 2 · Drift + hover
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Карточки локаций
        </h2>
        <p className="mt-3 max-w-xl text-white/60">
          Фото внутри медленно движется. Наведите курсор — карточка поднимается,
          зум усиливается.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5">
          {CARDS.map((card) => (
            <article
              key={card.name}
              className="card-live group relative aspect-[4/3] overflow-hidden rounded-card bg-charcoal-light"
            >
              <Image
                src={card.src}
                alt={card.name}
                fill
                className="drift-img card-zoom object-cover"
                style={{ animationDelay: card.delay }}
                sizes="(max-width: 768px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold md:text-xl">
                {card.name}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/50 md:px-8">
        Это временная страница для просмотра. Основной лендинг не изменён.
        Скажите «внедряй» — перенесём эффекты на сайт.
      </footer>
    </div>
  );
}
