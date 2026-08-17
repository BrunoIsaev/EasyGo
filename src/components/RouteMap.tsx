import React, { useEffect, useRef, useState } from 'react';
import { TourRoute } from '../data/routes';

interface RouteMapProps {
  route?: TourRoute | null;
  singleLocation?: { id: string; title: string; lat: number; lng: number } | null;
}

const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || 'a34a2e58-3d12-4f32-8433-2a628be9c3b8';

export default function RouteMap({ route, singleLocation }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = () => {
      if (!mapRef.current || !(window as any).ymaps) return;

      (window as any).ymaps.ready(() => {
        try {
          mapRef.current!.innerHTML = '';

          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [42.9831, 47.5047],
            zoom: 9,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          const mainPoints: [number, number][] = [];

          if (route?.days) {
            route.days.forEach((day) => {
              day.spots?.forEach((spot) => {
                if (spot.coords) mainPoints.push(spot.coords);
              });
              
            });
          }

          );
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
