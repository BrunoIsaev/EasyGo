"use client";

import { motion } from "framer-motion";
import { APP_SCREENS_MORE } from "@/lib/constants";
import { PhoneFrame } from "./PhoneFrame";

export function AppPreviewMore() {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Профиль и настройки
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-charcoal-muted">
            Управление аккаунтом и уведомлениями — в том же минималистичном
            стиле.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center sm:gap-8 md:gap-12">
          {APP_SCREENS_MORE.map((screen, i) => (
            <PhoneFrame
              key={screen.src}
              src={screen.src}
              alt={screen.label}
              label={screen.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
