"use client";
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!mapRef.current || !route.days.length) return;

    const loadMap = () => {
      if (window.ymaps) {
        initMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    };

    const initMap = () => {
      if (!mapRef.current) return;
      
      // Собираем все координаты точек маршрута
      const allCoords: [number, number][] = [];
      route.days.forEach(day => {
        day.spots.forEach(spot => {
          allCoords.push(spot.coords);
        });
      });

      if (allCoords.length === 0) return;

      const myMap = new window.ymaps.Map(mapRef.current, {
        center: allCoords[0],
        zoom: 10,
        controls: ['zoomControl']
      });

      // Добавляем метки
      route.days.forEach(day => {
        day.spots.forEach(spot => {
          const placemark = new window.ymaps.Placemark(spot.coords, {
            balloonContent: `<strong>${spot.name}</strong><br>${day.title}`
          });
          myMap.geoObjects.add(placemark);
        });
      });

      // Рисуем линию маршрута
      const routeLine = new window.ymaps.Polyline(allCoords, {}, {
        strokeColor: '#006633',
        strokeWidth: 4,
        strokeOpacity: 0.8
      });
      myMap.geoObjects.add(routeLine);

      // Автоматически масштабируем карту, чтобы вместить весь маршрут
      myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
    };

    loadMap();
  }, [route]);

  return (
    <div className="mt-8 w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-50 relative">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium text-gray-800 shadow-sm z-10">
        🗺️ Маршрут: {route.title}
      </div>
    </div>
  );
}