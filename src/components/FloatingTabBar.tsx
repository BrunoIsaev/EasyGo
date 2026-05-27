"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Map, Pin, User } from "lucide-react";

type TabId = "main" | "map" | "saved" | "profile";

const tabs: { id: TabId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "main", label: "Главная", icon: LayoutGrid },
  { id: "map", label: "Карта", icon: Map },
  { id: "saved", label: "Избранное", icon: Pin },
  { id: "profile", label: "Профиль", icon: User },
];

type FloatingTabBarProps = {
  active?: TabId;
  compact?: boolean;
  className?: string;
  layoutId?: string;
};

export function FloatingTabBar({
  active = "main",
  compact = false,
  className = "",
  layoutId = "tab-pill",
}: FloatingTabBarProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-pill bg-charcoal px-2 py-2 shadow-float ${compact ? "scale-90" : ""} ${className}`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;

        return (
          <motion.div
            key={tab.id}
            layout
            className="relative flex items-center"
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-pill bg-emerald"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <button
              type="button"
              className={`relative z-10 flex items-center gap-2 rounded-pill px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "text-white" : "text-white/70"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {isActive && !compact && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                >
                  {tab.label}
                </motion.span>
              )}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
