"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer id="cta" className="border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Начните путешествие с EasyGo
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-charcoal-muted">
          Скачайте приложение и откройте Дагестан с AI-навигатором, офлайн-картами
          и гастрономическими маршрутами.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#"
            className="rounded-pill bg-emerald px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-light"
          >
            App Store — скоро
          </Link>
          <Link
            href="#"
            className="rounded-pill border border-charcoal/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-emerald hover:text-emerald"
          >
            Связаться с командой
          </Link>
        </div>

        <p className="mt-12 text-xs text-charcoal-muted">
          © {new Date().getFullYear()} EasyGo. Нейронавигатор по Дагестану.
        </p>
      </div>
    </footer>
  );
}
