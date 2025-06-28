// Google Maps API загрузчик
let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;
let googleMapsPromise: Promise<void> | null = null;

// Глобальный callback для Google Maps API
(window as any).initGoogleMaps = () => {
  console.log('Google Maps API callback triggered');
  isGoogleMapsLoaded = true;
  isGoogleMapsLoading = false;
};

export const loadGoogleMapsAPI = (): Promise<void> => {
  // Если API уже загружен
  if (isGoogleMapsLoaded || (window as any).google?.maps) {
    console.log('Google Maps API already loaded');
    return Promise.resolve();
  }

  // Если загрузка уже идет
  if (isGoogleMapsLoading && googleMapsPromise) {
    console.log('Google Maps API loading in progress');
    return googleMapsPromise;
  }

  console.log('Starting Google Maps API loading...');
  isGoogleMapsLoading = true;

  googleMapsPromise = new Promise((resolve, reject) => {
    // Проверяем наличие API ключа
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('Google Maps API key not found in environment variables');
      isGoogleMapsLoading = false;
      reject(new Error('Google Maps API key not found in environment variables'));
      return;
    }

    console.log('API key found, creating script element...');

    // Создаем script элемент с callback
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    // Таймаут для обработки случаев, когда callback не срабатывает
    const loadTimeout = setTimeout(() => {
      if (!isGoogleMapsLoaded && window.google?.maps) {
        console.log('Google Maps API loaded but callback not triggered');
        isGoogleMapsLoaded = true;
        isGoogleMapsLoading = false;
        resolve();
      } else if (!window.google?.maps) {
        console.error('Google Maps API loading timeout');
        isGoogleMapsLoading = false;
        reject(new Error('Google Maps API loading timeout'));
      }
    }, 8000);

    // Обработчик успешной загрузки
    script.onload = () => {
      console.log('Google Maps API script loaded');
      // Проверяем через небольшой интервал, что API стал доступен
      const checkInterval = setInterval(() => {
        if (window.google?.maps || isGoogleMapsLoaded) {
          clearInterval(checkInterval);
          clearTimeout(loadTimeout);
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          resolve();
        }
      }, 100);
      
      // Останавливаем проверку через 5 секунд
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);
    };

    // Обработчик ошибки загрузки
    script.onerror = (error) => {
      console.error('Failed to load Google Maps API script:', error);
      clearTimeout(loadTimeout);
      isGoogleMapsLoading = false;
      reject(new Error('Failed to load Google Maps API'));
    };

    console.log('Adding script to document head...');
    // Добавляем скрипт в head
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};
