"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

export function LocationsMasonry() {
  return (
    <section id="locations" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Локации
          </h2>
          <p className="mt-3 max-w-xl text-charcoal-muted">
            От побережья Каспия до горных ущелий — откройте Дагестан через
            асимметричную ленту мест, как в приложении.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4">
          {LOCATIONS.map((loc, i) => (
            <motion.article
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-card shadow-card ${loc.span} ${loc.height}`}
            >
              <Image
  src={loc.image}
  alt={loc.name}
  fill
  style={{ objectFit: 'cover', objectPosition: '50% 95%' }}
  className="transition-transform duration-500 group-hover:scale-105"
  sizes="(max-width: 768px) 50vw, 400px"/>





              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                type="button"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm transition-colors hover:bg-white/40"
                aria-label="Сохранить"
              >
                <Pin className="h-4 w-4 text-white" strokeWidth={1.5} />
              </button>
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white md:text-xl">
                {loc.name}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


