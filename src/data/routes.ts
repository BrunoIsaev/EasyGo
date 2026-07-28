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
    description: 'Бирюзовая вода Сулака, золотые пески Сарыкума.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['сулак', 'каньон', 'семья'],
    days: [{
      day: 1,
      title: 'Каньон',
      spots: [
        { name: 'Сулакский каньон (Дубки)', coords: [42.9086, 47.0536] },
        { name: 'Главрыба', coords: [42.9095, 47.0520] },
        { name: 'Нохьо', coords: [42.9090, 47.0528] },
        { name: 'Сарыкум', coords: [42.7850, 47.3550] }
      ]
    }]
  },
  {
    id: 'derbent-lun-forest',
    title: 'Дербент: История и Лунь',
    description: 'Крепость, Лунь и Лиановый лес.',
    duration: '1 день',
    difficulty: 'Легкий',
    tags: ['дербент', 'история'],
    days: [{
      day: 1,
      title: 'Юг',
      spots: [
        { name: 'Нарын-Кала', coords: [42.0583, 48.2853] },
        { name: 'Лунь (Арабляр)', coords: [42.0950, 48.3150] },
        { name: 'Лиановый лес', coords: [41.6850, 48.4550] }
      ]
    }]
  }
];