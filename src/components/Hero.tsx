"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Search, Thermometer, X } from "lucide-react";
import { TOUR_ROUTES } from '@/data/routes'; // Импортируем наши маршруты

const HERO_TAGS = ["Места притяжения", "Горы", "Древние аулы", "Этно-туры"] as const;

export function Hero() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Логика поиска: фильтруем маршруты по запросу
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return TOUR_ROUTES.filter(route => 
      route.title.toLowerCase().includes(q) || 
      route.tags.some(tag => tag.toLowerCase().includes(q)) ||
      route.description.toLowerCase().includes(q)
    );
  }, [query]);

  // Закрываем поиск при клике вне области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-[100dvh] min-h-screen overflow-hidden pt-24">
      {/* Фоновая картинка */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/Derbent.WEBP"
          alt="Дербент – древняя крепость и панорама города"
          fill
          className="min-h-full min-w-full object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-pill bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-light" />
            AI-навигатор для Дагестана
          </p>
          
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl md:leading-[1.1]">
            EasyGo — ваш персональный ИИ-проводник
            <br />
            <span className="text-white/90">по Дагестану</span>
          </h1>
          
          <p className="mt-5 max-w-lg text-base text-white/80 md:text-lg">
            Умные маршруты, офлайн-карты в горах и гастрономические гиды — всё в одном приложении.
          </p>

          {/* УМНЫЙ ПОИСК */}
          <div ref={containerRef} className="relative mt-8 max-w-xl">
            <div className="glass flex items-center gap-3 rounded-pill px-5 py-4 bg-white/90 backdrop-blur-xl shadow-lg border border-white/20">
              <Search className="h-5 w-5 shrink-0 text-charcoal-muted" strokeWidth={1.5} />
              
              <input
                type="search"
                placeholder="Куда отправимся?"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full bg-transparent text-base text-charcoal outline-none placeholder:text-charcoal-muted/70"
              />
              
              {query && (
                <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-200 rounded-full">
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}

              <button
                type="button"
                className="flex shrink-0 items-center justify-center rounded-full bg-emerald p-3 text-white transition-colors hover:bg-emerald-light"
                aria-label="Поиск"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* ВЫПАДАЮЩИЙ СПИСОК РЕЗУЛЬТАТОВ */}
            {isOpen && query && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-50 max-h-[60vh] overflow-y-auto border border-gray-100">
                {results.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                      Найденные маршруты
                    </div>
                    {results.map((route) => (
                      <div key={route.id} className="group px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                              {route.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{route.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                                {route.duration}
                              </span>
                              <span className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
                                {route.difficulty}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 transition-colors mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>Ничего не найдено по запросу "{query}"</p>
                    <p className="text-sm mt-2 text-gray-400">Попробуйте: 'вино', 'горы', 'семья'</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ТЕГИ БЫСТРОГО ПОИСКА */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3 md:gap-4"
          >
            {HERO_TAGS.map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  setIsOpen(true);
                }}
                className="rounded-pill border border-white/10 bg-black/15 px-4 py-1.5 text-base font-medium text-white/90 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}