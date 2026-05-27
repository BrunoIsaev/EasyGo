"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AFISHA_STORIES } from "@/lib/constants";

export function AfishaStrip() {
  return (
    <section className="border-b border-gray-100 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {AFISHA_STORIES.map((story, i) => (
            <motion.button
              key={story.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex shrink-0 flex-col items-center gap-2"
            >
              <div
                className={`relative h-20 w-20 overflow-hidden rounded-full p-[2px] md:h-24 md:w-24 ${
                  "active" in story && story.active
                    ? "bg-gradient-to-tr from-emerald to-emerald-light"
                    : "bg-gray-200"
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white p-[2px]">
                  <Image
                    src={story.image}
                    alt={story.label}
                    width={96}
                    height={96}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-sm text-charcoal-muted group-hover:text-emerald">
                {story.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
