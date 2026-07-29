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

const API_KEY = '40ddd60f-2616-4af7-9ac9-c2042fc9983b';

export default function RouteMap({ route }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    if (!mapRef.current || !route.days.length) return;

    setStatus('loading');

    const points: [number, number][] = [];
    route.days.forEach(day => {
      day.spots.forEach(spot => points.push(spot.coords));
    });

    if (points.length === 0) {
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
          center: points[0],
          zoom: 9,
          controls: ['zoomControl']
        });

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

        window.ymaps.route(points, { 
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
          map.setBounds(map.geoObjects.getBounds(), { 
            checkZoomRange: true, 
            zoomMargin: 60 
          });
          setStatus('ready');
        })
        .catch((err: any) => {
          console.warn('Road routing failed, drawing curve:', err);
          
          const curvePoints: [number, number][] = [];
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            curvePoints.push(p1);
            
            const midLat = (p1[0] + p2[0]) / 2;
            const midLng = (p1[1] + p2[1]) / 2;
            const distLat = p2[0] - p1[0];
            const distLng = p2[1] - p1[1];
            const offsetLat = -distLng * 0.2; 
            const offsetLng = distLat * 0.2;
            
            curvePoints.push([midLat + offsetLat, midLng + offsetLng]);
          }
          curvePoints.push(points[points.length - 1]);

          const curvedLine = new window.ymaps.Polyline(curvePoints, {}, {
            strokeColor: '#006633',
            strokeWidth: 4,
            strokeOpacity: 0.7,
            strokeStyle: 'dash'
          });
          
          map.geoObjects.add(curvedLine);
          map.setBounds(map.geoObjects.getBounds(), { 
            checkZoomRange: true, 
            zoomMargin: 60 
          });
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
      script.onload = () => {
        window.ymaps.ready(initMap);
      };
      script.onerror = () => {
        console.error('Failed to load Yandex Maps');
        setStatus('ready');
      };
      document.head.appendChild(script);
    }

  }, [route.id]);

  return (
    <div key={route.id} className="relative mt-8 h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
      {status === 'loading' && (
        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
          Прокладываем маршрут...
        </div>
      )}
      
      <div ref={mapRef} className={`h-full w-full ${status === 'ready' ? 'block' : 'hidden'}`} />
      
      {status === 'ready' && (
        <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur pointer-events-none">
          Map: {route.title}
        </div>
      )}
    </div>
  );
}