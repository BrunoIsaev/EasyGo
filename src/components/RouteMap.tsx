import { useEffect, useRef, useState } from 'react';
import { RouteDay } from '../data/routes';

const API_KEY = '5b5b8f1e-3c3a-4f3e-8f3e-3c3a4f3e8f3e';

interface RouteMapProps {
  route?: {
    id: string;
    title: string;
    days: RouteDay[];
  };
  singleLocation?: {
    id: string;
    name: string;
    coords: [number, number];
  };
}

export default function RouteMap({ route, singleLocation }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');

    const initMap = () => {
      if (!mapRef.current) return;

      const ymaps = (window as any).ymaps;
      if (!ymaps) {
        setStatus('error');
        return;
      }

      ymaps.ready(() => {
        const map = new ymaps.Map(mapRef.current, {
          center: [42.9841, 47.5047],
          zoom: 7,
          controls: ['zoomControl'],
        });

        if (route?.days) {
          route.days.forEach((day) => {
            day.spots?.forEach((spot) => {
              if (spot.coords) {
                new ymaps.Placemark(spot.coords, {
                  hintContent: spot.name,
                  balloonContent: spot.name,
                });
              }
            });
          });
        }

        if (singleLocation?.coords) {
          new ymaps.Placemark(singleLocation.coords, {
            hintContent: singleLocation.name,
            balloonContent: singleLocation.name,
          });
          map.setCenter(singleLocation.coords, 12);
        }

        setStatus('ready');
      });
    };

    if ((window as any).ymaps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
    script.type = 'text/javascript';
    script.onload = () => {
      (window as any).ymaps.ready(initMap);
    };
    script.onerror = () => {
      console.error('Failed to load Yandex Maps');
      setStatus('ready');
    };
    document.head.appendChild(script);
  }, [route?.id, singleLocation?.id]);

  return (
    <div key={route?.id ?? singleLocation?.id ?? 'map'} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
      {status === 'loading' && (
        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
          Прокладываем маршрут...
        </div>
      )}

      <div ref={mapRef} className={`h-full w-full ${status === 'ready' ? 'block' : 'hidden'}`} />
    </div>
  );
}