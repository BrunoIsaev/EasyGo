export interface Spot {
  name: string;
  coords: [number, number];
}

export interface RouteDay {
  day: number;
  title: string;
  spots: Spot[];
}

export interface TourRoute {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  tags: string[];
  days: RouteDay[];
}

export const TOUR_ROUTES: TourRoute[] = [
  {
    id: 'sulak-classic',
    title: 'Сулакский каньон: Классика + Экстрим',
    description: 'Бирюзовая вода Сулака, золотые пески Сарыкума и адреналин в Дубках.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['сулакский каньон', 'главрыба', 'зиплайн', 'бархан сарыкум', 'семья', 'безопасный'],
    days: [{ day: 1, title: 'Каньон и Пустыня', spots: [
      { name: 'Сулакский каньон (Дубки)', coords: [42.9086, 47.0536] },
      { name: 'Главрыба (Зиплайн)', coords: [42.9095, 47.0520] },
      { name: 'Ресторан Нохьо', coords: [42.9090, 47.0528] },
      { name: 'Бархан Сарыкум', coords: [42.7850, 47.3550] }
    ]}]
  },
  {
    id: 'derbent-lun-forest',
    title: 'Дербент: История, Лунь и Лиановый лес',
    description: 'Крепость Нарын-Кала, экраноплан Лунь в Арабляре и субтропики Самура.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['дербент', 'лунь', 'лиановый лес', 'самур', 'история', 'семья'],
    days: [{ day: 1, title: 'Южный кластер', spots: [
      { name: 'Крепость Нарын-Кала', coords: [42.0583, 48.2853] },
      { name: 'Экраноплан Лунь (Арабляр)', coords: [42.0950, 48.3150] },
      { name: 'Лиановый лес (Самур)', coords: [41.6850, 48.4550] }
    ]}]
  },
  {
    id: 'hunzakh-matlal-stone',
    title: 'Хунзах и Матлас: Водопады и Каменная чаша',
    description: 'Хунзахское плато, Каменная чаша и водопады Тобот.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['хунзах', 'матлас', 'каменная чаша', 'тобот', 'семья', 'природа'],
    days: [{ day: 1, title: 'Плато и Водопады', spots: [
      { name: 'Хунзахское плато', coords: [42.4650, 47.1150] },
      { name: 'Каменная чаша (Матлас)', coords: [42.4750, 47.0950] },
      { name: 'Водопад Тобот', coords: [42.4680, 47.1120] }
    ]}]
  },
  {
    id: 'wine-cluster',
    title: 'Винный тур: Герей-Тюоз, Шато Алвиса',
    description: 'Дегустации в Гергебиле, Мамедкале и Избербаше.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['вино', 'дегустация', 'герей-тюоз', 'шато алвиса', 'гастро'],
    days: [{ day: 1, title: 'Винная карта', spots: [
      { name: 'Герей-Тюоз (Гергебиль)', coords: [42.3850, 47.2550] },
      { name: 'Шато Алвиса (Мамедкала)', coords: [42.1150, 48.1850] },
      { name: 'Избербашский винзавод', coords: [42.1350, 47.8850] }
    ]}]
  }
];