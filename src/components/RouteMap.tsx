"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Location } from '@/data/locations';
import { TourRoute } from '@/data/routes';

declare global {
  interface Window {
    ymaps: any;
  }
}

interface RouteMapProps {
  route?: TourRoute;
  singleLocation?: Location | null;
}

const API_KEY = '40ddd60f-2616-4af7-9ac9-c2042fc9983b';

// Промежуточные точки (города/села) для имитации дорог
const WAYPOINTS: Record<string, [number, number]> = {
  'makhachkala': [42.9849, 47.5047], // Махачкала (центр для Сулак-Сарыкум)
  'kaspiysk': [42.8833, 47.6333],   // Каспийск
  'izberbash': [42.5379, 47.8942],  // Избербаш
  'derbent_city': [42.0577, 48.2888], // Дербент (центр)
  'buynaksk': [42.8214, 47.1164],   // Буйнакск (для Хунзах-Гуниб)
  'levashi': [42.3333, 47.3833],    // Леваши
  'khunzakh': [42.5546, 46.7195],   // Хунзах
  'gunib': [42.3886, 46.9578],      // Гуниб
  'matlas': [42.6045, 46.5849],     // Матлас
  'gergebil': [42.3850, 47.2550],   // Гергебиль
  'mamadkala': [42.1150, 48.1850]   // Мамедкала
};

export default function RouteMap({ route, singleLocation }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    if (!mapRef.current) return;

    setStatus('loading');

    const initSingleLocationMap = () => {
      try {
        if (!window.ymaps || !window.ymaps.Map) {
          console.error('Yandex Maps API not loaded');
          setStatus('ready');
          return;
        }

        const map = new window.ymaps.Map(mapRef.current, {
          center: singleLocation!.coords,
          zoom: 14,
          controls: ['zoomControl']
        });

        const placemark = new window.ymaps.Placemark(
          singleLocation!.coords,
          {
            balloonContent: `<strong>${singleLocation!.name}</strong>`
          },
          {
            preset: 'islands#greenDotIconWithCaption'
          }
        );

        map.geoObjects.add(placemark);
        map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 20 });
        setStatus('ready');
      } catch (err: any) {
        console.error('Single location map init error:', err);
        setStatus('ready');
      }
    };

    if (singleLocation && !route) {
      if (window.ymaps && window.ymaps.Map) {
        initSingleLocationMap();
      } else {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + API_KEY + '&lang=ru_RU';
        script.type = 'text/javascript';
        script.onload = () => { window.ymaps.ready(initSingleLocationMap); };
        script.onerror = () => { console.error('Failed to load Yandex Maps'); setStatus('ready'); };
        document.head.appendChild(script);
      }
      return;
    }

    if (!route?.days?.length) {
      setStatus('ready');
      return;
    }

    // Собираем основные точки маршрута
    const mainPoints: [number, number][] = [];
    route.days.forEach(day => {
      day.spots.forEach(spot => mainPoints.push(spot.coords));
    });

    if (mainPoints.length === 0) {
      setStatus('ready');
      return;
    }

    const initMap = () => {
      try {
        if (!window.ymaps || !window.ymaps.Map) {
          console.error('Yandex Maps API not loaded');
          setStatus('ready');
          return;
        }

        const map = new window.ymaps.Map(mapRef.current, {
          center: mainPoints[0],
          zoom: 9,
          controls: ['zoomControl']
        });

        // Добавляем метки только для основных точек
        let spotIndex = 1;
        route.days.forEach(day => {
          day.spots.forEach(spot => {
            const placemark = new window.ymaps.Placemark(
              spot.coords,
              {
                iconContent: String(spotIndex++),
                balloonContent: '<strong>' + spot.name + '</strong><br>' + day.title
              },
              {
                preset: 'islands#greenCircleDotIconWithCaption'
              }
            );
            map.geoObjects.add(placemark);
          });
        });

        // Пытаемся построить маршрут по дорогам (на случай если ключ разрешает)
        window.ymaps.route(mainPoints, { 
          routingMode: 'auto',
          mapStateAutoApply: true 
        })
        .then((routeObj: any) => {
          map.geoObjects.add(routeObj);
          routeObj.getPaths().each((path: any) => {
            path.options.set({
              strokeColor: '#006633',
              strokeWidth: 5,
              strokeOpacity: 0.9
            });
          });
          map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 60 });
          setStatus('ready');
        })
        .catch(() => {
          // FALLBACK: Строим "умную" линию через промежуточные точки
          const smartPath: [number, number][] = [];
          
          for (let i = 0; i < mainPoints.length - 1; i++) {
            const start = mainPoints[i];
            const end = mainPoints[i+1];
            
            smartPath.push(start);
            
            // Логика выбора промежуточной точки в зависимости от направления
            // Это упрощенная эвристика для Дагестана
            const isNorthSouth = Math.abs(start[0] - end[0]) > Math.abs(start[1] - end[1]);
            
            if (isNorthSouth) {
               // Если движение Север-Юг (например, Сулак -> Дербент), идем через побережье/Махачкалу
               if (start[0] > 42.5 && end[0] < 42.2) smartPath.push(WAYPOINTS['makhachkala']);
               else if (start[0] > 42.8 && end[0] < 42.5) smartPath.push(WAYPOINTS['kaspiysk']);
            } else {
               // Если движение Запад-Восток (горы), идем через районные центры
               if (start[1] < 47.0 && end[1] > 47.5) smartPath.push(WAYPOINTS['buynaksk']);
               else if (start[1] < 47.0 && end[1] > 47.8) smartPath.push(WAYPOINTS['izberbash']);
            }
          }
          smartPath.push(mainPoints[mainPoints.length - 1]);

          // Рисуем линию через эти точки
          const polyline = new window.ymaps.Polyline(smartPath, {}, {
            strokeColor: '#006633',
            strokeWidth: 4,
            strokeOpacity: 0.8,
            strokeStyle: 'solid' // Теперь сплошная, так как выглядит реалистичнее
          });
          
          map.geoObjects.add(polyline);
          map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 60 });
          setStatus('ready');
        });

      } catch (err: any) {
        console.error('Map init error:', err);
        setStatus('ready');
      }
    };

    if (window.ymaps && window.ymaps.Map) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + API_KEY + '&lang=ru_RU';
      script.type = 'text/javascript';
      script.onload = () => { window.ymaps.ready(initMap); };
      script.onerror = () => { console.error('Failed to load Yandex Maps'); setStatus('ready'); };
      document.head.appendChild(script);
    }

  }, [route?.id, singleLocation?.id]);

  return (
    <div key={route?.id ?? singleLocation?.id ?? 'map'} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
      {status === 'loading' && (
        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
          Прокладываем маршрут...
        </div>
      )}
      
      <div ref={mapRef} className={`h-full w-full ${status === 'ready' ? 'block' : 'hidden'}`} />
      
      {status === 'ready' && (
        <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur pointer-events-none">
          Map: {route?.title ?? singleLocation?.name ?? 'Location'}
        </div>
      )}
    </div>
  );
}