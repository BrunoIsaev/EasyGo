"use client";
import React, { useEffect, useRef, useState } from 'react';
import { TourRoute } from '@/data/routes';

declare global {
  interface Window {
    ymaps: any;
    ymapsReady?: boolean;
  }
}

interface RouteMapProps {
  route: TourRoute;
}

const API_KEY = '40ddd60f-2616-4af7-9ac9-c2042fc9983b'; // Или твой новый ключ

export default function RouteMap({ route }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!mapRef.current) return;

    const loadYandexMaps = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.ymaps && window.ymaps.Map) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
        script.type = 'text/javascript';
        
        script.onload = () => {
          // Ждем полной инициализации модулей
          window.ymaps.ready(() => {
            resolve();
          });
        };
        
        script.onerror = () => reject(new Error('Не удалось загрузить скрипт Яндекс.Карт'));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadYandexMaps();
        
        if (!window.ymaps || !window.ymaps.Map) {
          throw new Error('API загружен, но Map недоступен');
        }

        // Собираем координаты
        const points: [number, number][] = [];
        route.days.forEach(day => {
          day.spots.forEach(spot => points.push(spot.coords));
        });

        if (points.length === 0) throw new Error('Нет точек маршрута');

        // Создаем карту
        const map = new window.ymaps.Map(mapRef.current, {
          center: points[0],
          zoom: 10,
          controls: ['zoomControl']
        });

        // Добавляем метки
        points.forEach((coord, index) => {
          const placemark = new window.ymaps.Placemark(coord, {
            iconContent: (index + 1).toString(),
            balloonContent: route.days.flatMap(d => d.spots)[index]?.name || 'Точка'
          }, {
            preset: 'islands#greenCircleDotIconWithCaption'
          });
          map.geoObjects.add(placemark);
        });

        // Строим маршрут по дорогам
        window.ymaps.route(points, { routingMode: 'auto' })
          .then((routeObj: any) => {
            map.geoObjects.add(routeObj);
            routeObj.getPaths().each((path: any) => {
              path.options.set({ strokeColor: '#006633', strokeWidth: 5 });
            });
            map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
            setStatus('ready');
          })
          .catch(() => {
            // Fallback: прямая линия
            const polyline = new window.ymaps.Polyline(points, {}, { strokeColor: '#006633', strokeWidth: 4 });
            map.geoObjects.add(polyline);
            map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
            setStatus('ready');
          });

      } catch (err: any) {
        console.error(err);
        setErrorMsg(err.message || 'Ошибка карты');
        setStatus('error');
      }
    };

    initMap();
  }, [route.id]); // Перезапуск при смене маршрута

  return (
    <div key={route.id} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
      {status === 'loading' && (
        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">Загрузка карты...</div>
      )}
      
      {status === 'error' && (
        <div className="flex h-full flex-col items-center justify-center bg-red-50 p-4 text-center text-red-600">
          <p className="font-bold">Ошибка карты</p>
          <p className="text-xs mt-2">{errorMsg}</p>
        </div>
      )}

      <div ref={mapRef} className={`h-full w-full ${status === 'ready' ? 'block' : 'hidden'}`} />
      
      {status === 'ready' && (
        <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur">
          🗺️ {route.title}
        </div>
      )}
    </div>
  );
}
