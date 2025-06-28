import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsAPI } from '@/utils/googleMapsLoader';
import { SimpleMap } from './SimpleMap';

interface GoogleMapProps {
  address: string;
  className?: string;
  height?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ 
  address, 
  className = '', 
  height = '300px' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;
    
    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting Google Maps initialization...');
        
        // Проверяем наличие API ключа сначала
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          console.warn('Google Maps API key not found, using simple map fallback');
          if (isMounted) {
            setError('fallback');
            setIsLoading(false);
          }
          return;
        }
        
        // Таймаут для предотвращения бесконечной загрузки
        timeoutId = setTimeout(() => {
          console.warn('Google Maps loading timeout, switching to fallback');
          if (isMounted) {
            setError('fallback');
            setIsLoading(false);
          }
        }, 10000); // Уменьшаем до 10 секунд

        // Загружаем Google Maps API динамически
        await loadGoogleMapsAPI();
        console.log('Google Maps API loaded successfully');
        
        // Проверяем, что компонент еще смонтирован
        if (!isMounted) return;
        
        // Ждем, пока mapRef станет доступным
        let retries = 0;
        while (!mapRef.current && retries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          retries++;
        }
        
        if (!mapRef.current) {
          console.error('Map container ref is not available after waiting');
          if (isMounted) {
            setError('fallback');
            setIsLoading(false);
          }
          return;
        }

        // Проверяем, что Google Maps API действительно доступен
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API not properly loaded');
          if (isMounted) {
            setError('fallback');
            setIsLoading(false);
          }
          return;
        }

        console.log('Starting geocoding for address:', address);
        
        // Геокодирование адреса
        const geocoder = new window.google.maps.Geocoder();
        const results = await geocodeAddress(geocoder, address);
        
        console.log('Geocoding results:', results);
        
        if (results && results.length > 0) {
          const location = results[0].geometry.location;
          console.log('Creating map with center:', location.toString());
          
          // Создание карты
          const map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 16,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{"visibility": "off"}]
              }
            ]
          });

          console.log('Map created successfully');

          // Добавление маркера
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: address,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3B82F6',
              fillOpacity: 1,
              strokeColor: '#1E40AF',
              strokeWeight: 2,
            }
          });

          console.log('Marker added successfully');

          // Информационное окно
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; font-family: 'Inter', sans-serif;">
                <strong style="color: #1F2937;">ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН»</strong><br>
                <span style="color: #6B7280;">${address}</span>
              </div>
            `
          });

          // Показать информационное окно при клике на маркер
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          console.log('Map initialization completed successfully');
          clearTimeout(timeoutId);
          if (isMounted) {
            setIsLoaded(true);
            setIsLoading(false);
          }
        } else {
          console.error('No geocoding results found for address:', address);
          clearTimeout(timeoutId);
          if (isMounted) {
            setError('Не удалось найти указанный адрес');
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Ошибка инициализации карты:', err);
        clearTimeout(timeoutId);
        // При ошибке используем fallback
        if (isMounted) {
          setError('fallback');
          setIsLoading(false);
        }
      }
    };

    const geocodeAddress = (geocoder: google.maps.Geocoder, address: string): Promise<google.maps.GeocoderResult[]> => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === 'OK' && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
    };

    initializeMap();

    // Cleanup function
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [address]);

  // Если ошибка - показываем SimpleMap fallback
  if (error === 'fallback') {
    return <SimpleMap address={address} className={className} height={height} />;
  }

  if (error) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 ${className}`} style={{ height }}>
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Карта недоступна
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error}
        </p>
        <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-900 dark:text-white font-medium">{address}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded && !error) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 ${className}`} style={{ height }}>
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Загрузка карты...
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          {isLoading ? 'Инициализация Google Maps...' : 'Пожалуйста, подождите'}
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef}
      className={`rounded-2xl overflow-hidden shadow-lg ${className}`}
      style={{ height }}
    />
  );
};
