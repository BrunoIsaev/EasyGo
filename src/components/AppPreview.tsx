"use client";

import { motion } from "framer-motion";
import { APP_SCREENS_FEATURED } from "@/lib/constants";
import { HomeScreenMock } from "./HomeScreenMock";
import { PhoneFrame } from "./PhoneFrame";

export function AppPreview() {
  return (
    <section id="app" className="overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-emerald">
            Приложение
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Дизайн, который вы уже знаете
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-muted">
            Карта, подборка локаций и городские маршруты — тот же премиальный
            интерфейс, что в мобильном приложении EasyGo.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center sm:gap-8 md:gap-12">
          {APP_SCREENS_FEATURED.map((screen, i) =>
            screen.id === "home" ? (
              <PhoneFrame
                key={screen.id}
                alt={screen.label}
                label={screen.label}
                delay={i * 0.15}
              >
                <HomeScreenMock />
              </PhoneFrame>
            ) : (
              <PhoneFrame
                key={screen.id}
                src={"src" in screen ? screen.src : undefined}
                alt={screen.label}
                label={screen.label}
                delay={i * 0.15}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
