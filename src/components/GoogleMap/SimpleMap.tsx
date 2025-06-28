import React from 'react';

interface SimpleMapProps {
  address: string;
  className?: string;
  height?: string;
}

export const SimpleMap: React.FC<SimpleMapProps> = ({ 
  address, 
  className = '', 
  height = '300px' 
}) => {
  // Создаем URL для Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative ${className}`} style={{ height }}>
      {/* Статичная карта с адресом */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН»
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {address}
          </p>
        </div>
        
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/25 shadow-lg hover:shadow-xl"
        >
          Открыть в Google Maps
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
      </div>
    </div>
  );
};
