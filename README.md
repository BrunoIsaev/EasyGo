# EasyGo Landing

Премиальный лендинг для **EasyGo** — AI-нейронавигатора по Дагестану. Дизайн повторяет мобильное приложение: изумрудный акцент `#004D2C`, тёмная плавающая навигация, афиша в стиле Stories, masonry-сетка локаций.

## Стек

- Next.js 15 (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React

## Запуск

```bash
cd easygo-landing
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

- `src/components/Hero.tsx` — кинематографичный hero с glassmorphism-поиском
- `src/components/AfishaStrip.tsx` — горизонтальная лента «Афиша»
- `src/components/LocationsMasonry.tsx` — асимметричная сетка локаций
- `src/components/Features.tsx` — технологические блоки
- `src/components/AppPreview.tsx` — скриншоты в рамке iPhone
- `src/components/InvestorSection.tsx` — блок для инвесторов и грантов
- `public/screenshots/` — макеты приложения из Figma/дизайна
