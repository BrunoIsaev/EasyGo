export interface Spot {
  name: string;
  coords: [number, number];
}

export interface RouteDay {
  day: number;
  title: string;
  spots: Spot[];
  activities?: string[];
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
    id: 'adv-day-1',
    title: 'Джиппинг, Нохьо и Сулак',
    description: 'Сулакский каньон, пещера Нохьо, виа феррата и бархан Сарыкум',
    tags: ['adventures'],
    duration: '1 день',
    difficulty: 'Средний'
  },
  {
    id: 'adv-day-2',
    title: 'Рафтинг, Гоор и Карадах',
    description: 'Сплав по Аварскому Койсу, Язык тролля и узкое ущелье',
    tags: ['adventures'],
    duration: '1 день',
    difficulty: 'Средний'
  },
  {
    id: 'adv-day-3',
    title: 'Хунзах, Лошади и Тарзанка',
    description: 'Хунзахское плато, конная прогулка, зиплайн и тарзанка',
    tags: ['adventures'],
    duration: '1 день',
    difficulty: 'Легкий'
  },
  {
    id: 'adv-day-4',
    title: 'Багги, Хучни и Лунь',
    description: 'Гонки по бездорожью, мощный водопад и гигантский экраноплан',
    tags: ['adventures'],
    duration: '1 день',
    difficulty: 'Средний'
  },
  {
    id: 'adv-day-5',
    title: 'Избербаш Параплан',
    description: 'Тандемный полет над морем с горы Пушкин-Тау',
    tags: ['adventures'],
    duration: '1 день',
    difficulty: 'Легкий'
  },
  {
    id: 'adventure-full-5days',
    title: 'ЭКСТРИМ-МАРАФОН (5 дней)',
    description: 'Все активности за одну поездку: рафтинг, скалы, полет и море',
    tags: ['adventures'],
    duration: '5 дней',
    difficulty: 'Сложный'
  }
];
