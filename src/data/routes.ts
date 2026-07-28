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
    days: [{ 
      day: 1, 
      title: 'Каньон и Пустыня', 
      spots: [
        { name: 'Сулакский каньон (Дубки)', coords: [42.653, 47.085] },
        { name: 'Главрыба (Зиплайн)', coords: [42.655, 47.082] },
        { name: 'Ресторан Нохьо', coords: [42.654, 47.083] },
        { name: 'Бархан Сарыкум', coords: [42.785, 47.355] }
      ] 
    }]
  },
  {
    id: 'derbent-lun-forest',
    title: 'Дербент: История, Лунь и Лиановый лес',
    description: 'Крепость Нарын-Кала, экраноплан Лунь в Арабляре и субтропики Самура.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['дербент', 'лунь', 'лиановый лес', 'самур', 'история', 'семья'],
    days: [{ 
      day: 1, 
      title: 'Южный кластер', 
      spots: [
        { name: 'Крепость Нарын-Кала', coords: [42.058, 48.285] },
        { name: 'Экраноплан Лунь (Арабляр)', coords: [42.095, 48.315] },
        { name: 'Лиановый лес (Самур)', coords: [41.685, 48.455] }
      ] 
    }]
  },
  {
    id: 'hunzakh-matlal-stone',
    title: 'Хунзах и Матлас: Водопады и Каменная чаша',
    description: 'Хунзахское плато, Каменная чаша и водопады Тобот.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['хунзах', 'матлас', 'каменная чаша', 'тобот', 'семья', 'природа'],
    days: [{ 
      day: 1, 
      title: 'Плато и Водопады', 
      spots: [
        { name: 'Хунзахское плато', coords: [42.465, 47.115] },
        { name: 'Каменная чаша (Матлас)', coords: [42.475, 47.095] },
        { name: 'Водопад Тобот', coords: [42.468, 47.112] }
      ] 
    }]
  },
  {
    id: 'wine-cluster',
    title: 'Винный тур: Герей-Тюоз, Шато Алвиса',
    description: 'Дегустации в Гергебиле, Мамедкале и Избербаше.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['вино', 'дегустация', 'герей-тюоз', 'шато алвиса', 'гастро'],
    days: [{ 
      day: 1, 
      title: 'Винная карта', 
      spots: [
        { name: 'Герей-Тюоз (Гергебиль)', coords: [42.385, 47.255] },
        { name: 'Шато Алвиса (Мамедкала)', coords: [42.115, 48.185] },
        { name: 'Избербашский винзавод', coords: [42.135, 47.885] }
      ] 
    }]
  }
];