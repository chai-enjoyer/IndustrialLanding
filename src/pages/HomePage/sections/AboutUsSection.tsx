import React from 'react';
import { useTranslation } from 'react-i18next';
import { RevealElement } from '@/components/RevealElement';

export const AboutUsSection: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      key: 'reliability',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      key: 'efficiency',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      key: 'expertise',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const stats = [
    { number: '15+', label: t('about.stats.experience') },
    { number: '1000+', label: t('about.stats.success') }
  ];

  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <RevealElement animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('common.about')}
            </h2>
          </div>
        </RevealElement>

        {/* Основной контент */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-16">
          {/* Левая колонка - Текст */}
          <RevealElement animation="slide-right">
            <div className="mb-12 lg:mb-0">
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                <p className="text-lg leading-relaxed mb-6">
                  {t('about.description.paragraph1')}
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  {t('about.description.paragraph2')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('about.description.paragraph3')}
                </p>
              </div>

              {/* Статистика */}
              <div className="flex flex-wrap gap-8 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealElement>

          {/* Правая колонка - Ценности */}
          <RevealElement animation="slide-left" delay={300}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Наши ценности
              </h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={value.key} className="flex items-start space-x-4" style={{ animationDelay: `${600 + index * 200}ms` }}>
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {t(`about.values.${value.key}.title`)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t(`about.values.${value.key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealElement>
        </div>

        {/* CTA блок */}
        <RevealElement animation="fade-in" delay={800}>
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('about.cta.title')}
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {t('about.cta.description')}
            </p>
            <button
              onClick={handleConsultationClick}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-2xl transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/25 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              {t('common.getConsultation')}
              <svg
                className="w-5 h-5 ml-2"
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
            </button>
          </div>
        </RevealElement>
      </div>
    </section>
  );
};
