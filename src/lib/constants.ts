export const COLORS = {
  emerald: "#004D2C",
  charcoal: "#1A1A1A",
} as const;

export const AFISHA_STORIES = [
  {
    id: "sea",
    label: "Море",
    image: "/IMG_1390.JPG",
    active: true,
  },
  {
    id: "mountains",
    label: "Горы",
    image: "/IMG_1347.JPG",
  },
  {
    id: "food",
    label: "Кухня",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
  },
  {
    id: "city",
    label: "Город",
    image: "/IMG_1391.JPG",
  },
  {
    id: "culture",
    label: "Культура",
    image: "/IMG_1346.JPG",
  },
  {
    id: "peaks",
    label: "Вершины",
    image: "/IMG_1357.JPG",
  },
] as const;

export const LOCATIONS = [
  {
    id: "makhachkala",
    name: "Махачкала",
    image: "/IMG_1391.JPG",
    span: "col-span-1 row-span-1",
    height: "h-52",
  },
  {
    id: "sulak",
    name: "Сулак",
    image: "/IMG_1350.JPG",
    span: "col-span-1 row-span-2",
    height: "h-full min-h-[280px]",
  },
  {
    id: "karadakh",
    name: "Карадахская теснина",
    image: "/IMG_1373.JPG",
    span: "col-span-1 row-span-2",
    height: "h-full min-h-[280px]",
  },
  {
    id: "derbent",
    name: "Дербент",
    image: "/IMG_1346.JPG",
    span: "col-span-1 row-span-1",
    height: "h-52",
  },
] as const;

export const FEATURES = [
  {
    id: "neural",
    title: "Neural Route Engine",
    titleRu: "Нейронный маршрутизатор",
    description:
      "AI-алгоритмы строят оптимальные пути с учётом рельефа, пробок и сезонных особенностей горных дорог.",
    icon: "brain" as const,
  },
  {
    id: "offline",
    title: "Zero-Signal Reliability",
    titleRu: "Работа без сигнала",
    description:
      "Офлайн-first карты для перевалов и ущелий — навигация не пропадает там, где пропадает сеть.",
    icon: "wifi-off" as const,
  },
  {
    id: "carplay",
    title: "CarPlay Integration",
    titleRu: "Интеграция с CarPlay",
    description:
      "Специализированный интерфейс для водителей и автопутешественников — безопасно за рулём.",
    icon: "car" as const,
  },
  {
    id: "gastro",
    title: "Gastro-Sync",
    titleRu: "Gastro-Sync",
    description:
      "Встроенные гастрономические гиды, бронирование столиков и предзаказ блюд по маршруту.",
    icon: "utensils" as const,
  },
] as const;

export const DETAILED_LOCATIONS = [
  {
    name: "Махачкала",
    address: "Махачкала, Республика Дагестан",
    category: "Город",
    rating: 5.0,
    hours: "Круглосуточно",
    open: true,
    tags: ["Город", "Достопримечательность"],
    image: "/IMG_1392.JPG",
  },
  {
    name: "Дербент",
    address: "Дербент, Республика Дагестан",
    category: "История",
    rating: 5.0,
    hours: "Круглосуточно",
    open: true,
    tags: ["История", "Достопримечательность"],
    image: "/IMG_1346.JPG",
  },
  {
    name: "Сулакский каньон",
    address: "Сулакский каньон, Дагестан",
    category: "Природа",
    rating: 5.0,
    hours: "Круглосуточно",
    open: true,
    tags: ["Природа", "Каньоны"],
    image: "/сулак2.jpg",
  },
  {
    name: "Бархан Сарыкум",
    address: "Бархан Сарыкум, Дагестан",
    category: "Природа",
    rating: 5.0,
    hours: "Круглосуточно",
    open: true,
    tags: ["Природа", "Пустыня"],
    image: "/бархан.JPG",
  },
  {
    name: "Карадахская теснина",
    address: "Карадахская теснина, Дагестан",
    category: "Трекинг",
    rating: 5.0,
    hours: "Рекомендуется засветло",
    open: true,
    tags: ["Трекинг", "Природа"],
    image: "/IMG_1373.JPG",
  },
  {
    name: "Гора Шалбуздаг",
    address: "Гора Шалбуздаг, Дагестан",
    category: "Горы",
    rating: 5.0,
    hours: "Рекомендуется засветло",
    open: true,
    tags: ["Горы", "Трекинг"],
    image: "/шалбуздаг.JPG",
  },
  {
    name: "Аул-призрак Гамсутль",
    address: "Хунзахский район, Республика Дагестан",
    category: "История",
    rating: 5.0,
    hours: "Рекомендуется засветло",
    open: true,
    tags: ["История", "Горы", "Трекинг"],
    image: "/IMG_1362.JPG",
  },
] as const;

export const APP_SCREENS_FEATURED = [
  { id: "city", src: "/screenshots/city.png", label: "Махачкала" },
  { id: "home", label: "Локации" },
  { id: "map", src: "/screenshots/map.png", label: "Карта" },
] as const;

export const APP_SCREENS_MORE = [
  { src: "/screenshots/profile.png", label: "Профиль" },
  { src: "/screenshots/notifications.png", label: "Уведомления" },
] as const;
