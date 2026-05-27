"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Star } from "lucide-react";

type LocationDetailCardProps = {
  name: string;
  address: string;
  category: string;
  rating: number;
  hours: string;
  open: boolean;
  tags: readonly string[];
  image: string;
};

export function LocationDetailCard({
  name,
  address,
  category,
  rating,
  hours,
  open,
  tags,
  image,
}: LocationDetailCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-card bg-white shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card bg-charcoal md:aspect-[16/10]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
        />
        <span className="absolute right-4 top-4 rounded-pill bg-charcoal/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold md:text-2xl">{name}</h3>
          <div className="flex shrink-0 items-center gap-1">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-charcoal-muted">
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          {address}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-card bg-emerald px-4 py-2.5 text-sm text-white">
          <Clock className="h-4 w-4" strokeWidth={1.5} />
          <span>
            {open ? "Открыто" : "Закрыто"} · {hours}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-gray-100 px-4 py-1.5 text-sm text-charcoal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
