"use client";

import { motion } from "framer-motion";

export function EcosystemIntro() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            EasyGo — Интеллектуальная экосистема твоего отдыха в Дагестане.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-muted md:text-lg">
            Дагестан не терпит случайных маршрутов — он требует страсти и четкого плана. Наша платформа превращает хаос в безупречный сценарий приключения, экономя ваше время для главного. EasyGo мгновенно проложит путь через легендарные места притяжения и скрытые от глаз древние аулы. Это отдых в новом ритме: от медитативных видов на каньоны до мощного заряда адреналина. Совсем скоро платформа станет вашим единым центром управления поездкой: бронируйте лучшие отели, находите свободные внедорожники и занимайте столики в колоритных ресторанах в один клик. Исследуйте Дагестан на максимум, пока остальные ищут дорогу!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
