"use client";
import React, { useEffect, useRef, useState } from 'react';
import { TourRoute } from '@/data/routes';

declare global {
  interface Window {
    ymaps: any;
  }
}

interface RouteMapProps {
  route: TourRoute;
}

const YANDEX_API_KEY = '40ddd60f-2616-4af7-9ac9-c2042fc9983b';

export default function RouteMap({ route }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || !route.days.length) {
      setIsLoading(false);
      setError('Маршрут не найден');
      return;
    }

    let cancelled = false;
    let scriptTag: HTMLScriptElement | null = null;

    const finishWithError = (message: string) => {
      if (!cancelled) {
        setIsLoading(false);
        setError(message);
      }
    };

    const initMap = async () => {
      if (!mapRef.current || cancelled) return;

      const allCoords: [number, number][] = [];
      route.days.forEach((day) => {
        day.spots.forEach((spot) => {
          allCoords.push(spot.coords);
        });
      });

      if (allCoords.length === 0) {
        finishWithError('Нет точек для построения маршрута');
        return;
      }

      try {
        const myMap = new window.ymaps.Map(mapRef.current, {
          center: allCoords[0],
          zoom: 10,
          controls: ['zoomControl']
        });

        route.days.forEach((day) => {
          day.spots.forEach((spot) => {
            const placemark = new window.ymaps.Placemark(spot.coords, {
              balloonContent: `<strong>${spot.name}</strong><br>${day.title}`
            });
            myMap.geoObjects.add(placemark);
          });
        });

        try {
          const multiRoute = await window.ymaps.route(allCoords, {
            wayPointManager: 'driving'
          });

          myMap.geoObjects.add(multiRoute);
          myMap.setBounds(multiRoute.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
        } catch {
          const fallbackLine = new window.ymaps.Polyline(allCoords, {}, {
            strokeColor: '#006633',
            strokeWidth: 4,
            strokeOpacity: 0.8
          });
          myMap.geoObjects.add(fallbackLine);
          myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
        }

        if (!cancelled) {
          setIsLoading(false);
          setError(null);
        }
      } catch (err) {
        finishWithError('Не удалось инициализировать карту');
      }
    };

    const loadMap = () => {
      if (window.ymaps) {
        void initMap();
        return;
      }

      const existingScript = document.querySelector('script[src*="api-maps.yandex.ru/2.1"]') as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          void initMap();
        });
        existingScript.addEventListener('error', () => {
          finishWithError('Не удалось загрузить Яндекс Карты');
        });
        scriptTag = existingScript;
        return;
      }

      scriptTag = document.createElement('script');
      scriptTag.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
      scriptTag.async = true;
      scriptTag.onload = () => {
        void initMap();
      };
      scriptTag.onerror = () => {
        finishWithError('Не удалось загрузить Яндекс Карты');
      };
      document.head.appendChild(scriptTag);
    };

    loadMap();

    return () => {
      cancelled = true;
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [route]);

  return (
    <div key={route.id} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-xl">
      {isLoading && !error ? (
        <div className="flex h-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600">
          Загрузка карты...
        </div>
      ) : null}

      {error && !isLoading ? (
        <div className="flex h-full items-center justify-center bg-gray-100 px-4 text-center text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <div ref={mapRef} className={`h-full w-full ${isLoading ? 'hidden' : 'block'}`} />

      <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur">
        🗺️ Маршрут: {route.title}
      </div>
    </div>
  );
}