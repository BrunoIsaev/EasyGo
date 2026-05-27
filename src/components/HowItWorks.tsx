"use client";

import { motion } from "framer-motion";
import { Car, Heart, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Выбор интересов",
    description: "Пользователь указывает, что ему нравится — природа, гастрономия, история или активный отдых.",
    icon: Heart,
  },
  {
    step: "02",
    title: "ИИ-планирование",
    description:
      "Система за секунды строит маршрут с учётом погоды, состояния дорог и вашего расписания.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Поехали!",
    description:
      "Готовый путь открывается в CarPlay, а офлайн-карты работают даже там, где нет сети.",
    icon: Car,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-emerald">
            Просто и быстро
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Как работает EasyGo
          </h2>
          <p className="mt-4 text-charcoal-muted">
            От первых предпочтений до поездки — три шага, и вы уже в пути по
            Дагестану.
          </p>
        </motion.div>

        <div className="relative grid gap-6 md:grid-cols-3 md:gap-5">
          <div
            className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[4.5rem] hidden h-px bg-gradient-to-r from-emerald/0 via-emerald/30 to-emerald/0 md:block"
            aria-hidden
          />

          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-card border border-gray-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-card md:p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-emerald/40">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
