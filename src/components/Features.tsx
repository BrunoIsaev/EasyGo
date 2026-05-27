"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Car,
  UtensilsCrossed,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  "wifi-off": WifiOff,
  car: Car,
  utensils: UtensilsCrossed,
};

export function Features() {
  return (
    <section id="features" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-emerald">
            Технологии
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Интеллект маршрута — надёжность в горах
          </h2>
          <p className="mt-4 text-charcoal-muted">
            EasyGo объединяет нейросети, офлайн-картографию и экосистему для
            водителей и гурманов.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-card bg-white p-6 shadow-soft md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-emerald">
                  {feature.title}
                </p>
                <h3 className="mt-1 text-xl font-bold">{feature.titleRu}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
