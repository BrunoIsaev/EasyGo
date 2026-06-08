"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

// --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
// Обновлённые ссылки ведут на детальный вид раздела на /guide
const links = [
  { href: "/guide?section=adventures", label: "Приключения" },
  { href: "/guide?section=culture", label: "Культура" },
  { href: "/guide?section=gastronomy", label: "Гастротуры" },
  { href: "/guide?section=family", label: "Для всей семьи" },
];
// --- КОНЕЦ ИЗМЕНЕНИЙ ---

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-card bg-white/80 px-5 py-3 shadow-soft backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-baseline gap-0.5">
            <Image
              src="/logo-icon2.png"
              alt="EasyGo Logo"
              width={28}
              height={28}
              className="h-7 w-7 object-cover"
              priority
            />
            <span className="text-lg font-semibold tracking-tight">EasyGo</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-charcoal-muted transition-colors hover:text-emerald"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Ссылка на CTA была #cta, можно сделать ее ведущей на страницу приложения */}
          <Link
            href="/app" 
            className="hidden rounded-pill bg-emerald px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-light md:inline-block"
          >
            Скачать приложение
          </Link>
          <button
            type="button"
            className="rounded-xl p-2 text-charcoal md:hidden"
            aria-label="Меню"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
