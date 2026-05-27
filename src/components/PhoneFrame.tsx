"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Внутренняя область экрана (соотношение iPhone 390×844) */
export const PHONE_SCREEN_CLASS =
  "relative aspect-[390/844] w-[240px] overflow-hidden rounded-[2rem] bg-white sm:w-[260px] md:w-[272px]";

type PhoneFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  delay?: number;
  children?: ReactNode;
};

export function PhoneFrame({
  src,
  alt,
  label,
  delay = 0,
  children,
}: PhoneFrameProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="flex w-full max-w-[304px] flex-col items-center sm:w-auto"
    >
      <div className="rounded-[2.5rem] border-[10px] border-charcoal bg-charcoal p-1 shadow-float">
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-charcoal" />
          <div className={PHONE_SCREEN_CLASS}>
            {children ?? (
              <Image
                src={src!}
                alt={alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 272px"
                priority={delay === 0}
              />
            )}
          </div>
        </div>
      </div>
      {label && (
        <figcaption className="mt-4 min-h-[1.25rem] text-center text-sm font-medium text-charcoal-muted">
          {label}
        </figcaption>
      )}
    </motion.figure>
  );
}
