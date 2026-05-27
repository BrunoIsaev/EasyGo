"use client";

import { motion } from "framer-motion";
import { Building2, Heart, TrendingUp, Users } from "lucide-react";

const stats = [
  { value: "3M+", label: "жителей региона" },
  { value: "40%", label: "рост внутреннего туризма" },
  { value: "50+", label: "локальных партнёров" },
];

const pillars = [
  {
    icon: TrendingUp,
    title: "Региональный рост",
    text: "EasyGo стимулирует внутренний и въездной туризм, создавая цифровую инфраструктуру для малых городов и прибрежных маршрутов.",
  },
  {
    icon: Building2,
    title: "Поддержка бизнеса",
    text: "Рестораны, отели и экскурсионные сервисы получают видимость через Gastro-Sync и умные рекомендации на маршруте.",
  },
  {
    icon: Users,
    title: "Социальный эффект",
    text: "Офлайн-навигация повышает безопасность в горных районах и снижает барьер для путешественников без местного гида.",
  },
  {
    icon: Heart,
    title: "Устойчивое развитие",
    text: "Проект ориентирован на гранты и инвестиции в цифровизацию СКФО с измеримым вкладом в занятость и локальную экономику.",
  },
];

export function InvestorSection() {
  return (
    <section id="impact" className="bg-charcoal py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-light">
            Для инвесторов и партнёров
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Цифровая экосистема для Дагестана
          </h2>
          <p className="mt-4 text-white/70">
            EasyGo — это масштабируемая цифровая экосистема с прозрачной архитектурой прибыли. Мы формируем полноценный маркетплейс туристических услуг, монетизируя каждый этап клиентского пути.
          </p>
          <div className="mt-6 space-y-3 text-white/70">
            <p className="font-semibold text-white/90">Наши каналы монетизации:</p>
            <p>• Комиссионная модель: Процент с каждой транзакции через систему бронирования отелей, ресторанов и аренды авто.</p>
            <p>• B2B-инструменты для гидов: Платная подписка для профессиональных проводников. Статус «Топ» дает приоритетный доступ к трафику и стабильный поток клиентов.</p>
            <p>• Рекламные интеграции: Нативная реклама локальных брендов и сервисов, встроенная в маршруты.</p>
            <p>• Партнерская сеть: Единая цифровая инфраструктура, связывающая турпоток с локальным бизнесом.</p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-card border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-emerald-light md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-card border border-white/10 bg-charcoal-light p-6 md:p-8"
            >
              <pillar.icon
                className="mb-4 h-8 w-8 text-emerald-light"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-bold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
