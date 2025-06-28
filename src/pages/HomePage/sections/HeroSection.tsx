import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, RevealElement, ParallaxBackground } from '@/components';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const handleConsultationClick = () => {
    // Прокрутка к секции контактов
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ParallaxBackground>      <section
        id="home"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center relative"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Основной заголовок */}
          <RevealElement animation="fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t('company.name')}
              </span>
            </h1>
          </RevealElement>

          {/* Подзаголовок */}
          <RevealElement animation="slide-up" delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto font-medium">
              {t('company.slogan')}
            </p>
          </RevealElement>

          {/* Описание */}
          <RevealElement animation="slide-up" delay={400}>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('pages.home.subtitle')}
            </p>
          </RevealElement>

          {/* Статистика */}
          <RevealElement animation="slide-up" delay={600}>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  15+
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {t('pages.home.experience')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
                  1000+
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {t('pages.home.clients')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  24/7
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {t('pages.home.support')}
                </div>
              </div>
            </div>
          </RevealElement>

          {/* CTA Кнопки */}
          <RevealElement animation="slide-up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleConsultationClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/25 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 transition-all duration-300 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-blue-800"></div>
                <span className="relative flex items-center">
                  {t('common.getConsultation')}
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <Button
                variant="outline"
                size="large"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-800"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {t('common.learnMore')}
                </span>
              </Button>
            </div>
          </RevealElement>
        </div>
      </div>

      {/* Анимация прокрутки вниз */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
    </ParallaxBackground>
  );
};
