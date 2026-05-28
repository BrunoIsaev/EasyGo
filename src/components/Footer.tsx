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

        <div className="mt-8 flex flex-col items-center justify-center gap-6">
  <div className="flex flex-col items-center gap-2">
    <h3 className="font-semibold text-gray-900">Связаться с нами:</h3>
    <div className="flex flex-col items-center gap-1 text-sm text-gray-600 text-center">
      <a href="https://t.me/EasyGo_Dag" target="_blank" className="hover:text-emerald-600 font-medium">Telegram: @EasyGo_Dag</a>
      <a href="https://wa.me/79660057766" target="_blank" className="hover:text-emerald-600 font-medium">WhatsApp: +7 (966) 005-77-66</a>
      <a href="tel:+79660057766" className="hover:text-emerald-600 font-medium">Телефон: +7 (966) 005-77-66</a>
      <a href="mailto:bashir.isaev93@gmail.com" className="hover:text-emerald-600 font-medium">Email: bashir.isaev93@gmail.com</a>
    </div>
  </div>

  <Link
    href="#"
    className="rounded-pill bg-emerald px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-light"
  >
    App Store — скоро
  </Link>
</div>



        </div>

        <p className="mt-12 text-xs text-charcoal-muted">
          © {new Date().getFullYear()} EasyGo. Нейронавигатор по Дагестану.
        </p>
      </div>
    </footer>
  );
}
