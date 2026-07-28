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
    if (!mapRef.current || !route.days.length) return;

    setIsLoading(true);
    setError(null);

    // Собираем все координаты
    const allCoords: [number, number][] = [];
    route.days.forEach(day => {
      day.spots.forEach(spot => {
        allCoords.push(spot.coords);
      });
    });

    if (allCoords.length === 0) {
      setError('Нет точек для отображения');
      setIsLoading(false);
      return;
    }

    const initMap = () => {
      try {
        if (!window.ymaps) {
          setError('API Яндекс.Карт не загрузился');
          setIsLoading(false);
          return;
        }

        // Создаем карту
        const myMap = new window.ymaps.Map(mapRef.current, {
          center: allCoords[0],
          zoom: 10,
          controls: ['zoomControl']
        });

        // Добавляем метки
        let spotIndex = 1;
        route.days.forEach(day => {
          day.spots.forEach(spot => {
            const placemark = new window.ymaps.Placemark(
              spot.coords,
              {
                balloonContent: `<strong>${spot.name}</strong><br>${day.title}`,
                iconContent: String(spotIndex++)
              },
              {
                preset: 'islands#greenCircleDotIconWithCaption'
              }
            );
            myMap.geoObjects.add(placemark);
          });
        });

        // Пытаемся построить маршрут по дорогам
        window.ymaps.route(allCoords, {
          mapStateAutoApply: true,
          routingMode: 'auto'
        }).then(function (routeObj: any) {
          myMap.geoObjects.add(routeObj);
          
          // Стилізуем линию маршрута
          routeObj.getPaths().each(function (path: any) {
            path.options.set({
              strokeColor: '#006633',
              strokeWidth: 5,
              strokeOpacity: 0.8
            });
          });
          
          setIsLoading(false);
        }).catch(function (err: any) {
          console.warn('Маршрутизация не удалась, используем прямую линию:', err);
          // Fallback: рисуем прямую линию
          const polyline = new window.ymaps.Polyline(allCoords, {}, {
            strokeColor: '#006633',
            strokeWidth: 4,
            strokeOpacity: 0.8
          });
          myMap.geoObjects.add(polyline);
          myMap.setBounds(myMap.geoObjects.getBounds(), { 
            checkZoomRange: true, 
            zoomMargin: 50 
          });
          setIsLoading(false);
        });

      } catch (err: any) {
        console.error('Ошибка инициализации карты:', err);
        setError(`Ошибка: ${err.message || 'Неизвестная ошибка'}`);
        setIsLoading(false);
      }
    };

    // Загружаем скрипт Яндекса
    if (window.ymaps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
      script.onload = initMap;
      script.onerror = () => {
        setError('Не удалось загрузить API Яндекс.Карт');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    }

    // Очистка при размонтировании
    return () => {
      // Можно добавить очистку карты если нужно
    };
  }, [route]);

  return (
    <div key={route.id} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
      {isLoading && !error ? (
        <div className="flex h-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-600">
          Загрузка карты...
        </div>
      ) : null}

      {error && !isLoading ? (
        <div className="flex h-full items-center justify-center bg-red-50 px-4 text-center text-sm font-medium text-red-600">
          {error}
        </div>
      ) : null}

      <div 
        ref={mapRef} 
        className={`h-full w-full ${isLoading || error ? 'hidden' : 'block'}`} 
      />

      <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur">
        🗺️ Маршрут: {route.title}
      </div>
    </div>
  );
}
