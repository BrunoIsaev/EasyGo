export interface RoutePoint {
  title: string;
  lat: number;
  lng: number;
  coords?: [number, number];
  description?: string;
}

export interface Spot {
  title?: string;
  coords: [number, number];
  description?: string;
}

export interface DayProgram {
  day: number;
  title: string;
  points?: RoutePoint[];
  spots?: Spot[];
}

export interface TourRoute {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
  price: string;
  image: string;
  difficulty?: string;
  days?: DayProgram[];
  points?: RoutePoint[];
}

export const TOUR_ROUTES: TourRoute[] = [
  {
    id: 'adv-day-1',
    title: 'Джиппинг, Нохъо и Сулак',
    description: 'Сулакский каньон, пещера Нохъо, виа феррата и бархан Сарыкум',
    tags: ['Экстрим', 'Природа'],
    duration: '1 день',
    price: '4 500 ₽',
    image: '/images/sulak.jpg',
    difficulty: 'Легкий',
    points: [
      { title: 'Сулакский каньон', lat: 43.018, lng: 46.832, description: 'Один из самых глубоких каньонов в мире' },
      { title: 'Пещера Нохъо', lat: 43.022, lng: 46.828, description: 'Подвесной мост и смотровая площадка' },
      { title: 'Бархан Сарыкум', lat: 43.010, lng: 47.230, description: 'Уникальный песчаный бархан' }
    ]
  }
];
