"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, Thermometer } from "lucide-react";
import { useRef } from "react";

const HERO_TAGS = ["Места притяжения", "Горы", "Древние аулы", "Этно-туры"] as const;

const tagContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const tagItem = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Параллакс: при скролле фон смещается медленнее контента
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] min-h-screen overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <Image
            src="/Derbent.WEBP"
            alt="Дербент — древняя крепость и панорама города"
            fill
            className="min-h-full min-w-full object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
      </motion.div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 inline-flex items-center gap-2 rounded-pill bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-light" />
            AI-навигатор для Дагестана
          </motion.p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl md:leading-[1.1]">
            EasyGo — ваш персональный ИИ-проводник
            <br />
            <span className="text-white/90">по Дагестану</span>
          </h1>

          <p className="mt-5 max-w-lg text-base text-white/80 md:text-lg">
            Умные маршруты, офлайн-карты в горах и гастрономические гиды — всё в одном приложении.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
            <span className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4" strokeWidth={1.5} />
              Сейчас +26° в Махачкале
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 max-w-xl"
        >
          <div className="glass flex items-center gap-3 rounded-pill px-5 py-4">
            <Search className="h-5 w-5 shrink-0 text-charcoal-muted" strokeWidth={1.5} />
            <input
              type="search"
              placeholder="Куда отправимся сегодня?"
              className="w-full bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal-muted/70"
            />
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              type="button"
              className="flex shrink-0 items-center justify-center rounded-full bg-emerald p-3 text-white transition-colors hover:bg-emerald-light"
              aria-label="Поиск"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={tagContainer}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center gap-3 md:gap-4"
        >
          {HERO_TAGS.map((tag) => (
            <motion.span
              key={tag}
              variants={tagItem}
              whileHover={{ y: -2, backgroundColor: "rgba(0,0,0,0.25)" }}
              className="rounded-pill border border-white/10 bg-black/15 px-4 py-1.5 text-base font-medium text-white/90 backdrop-blur-md"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}