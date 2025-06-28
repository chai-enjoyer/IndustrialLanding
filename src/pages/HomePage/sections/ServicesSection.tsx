import React from 'react';
import { useTranslation } from 'react-i18next';
import { RevealElement } from '@/components/RevealElement';

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: 'businessSupport',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      key: 'individualConsultation',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      key: 'courtRepresentation',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      key: 'contractDrafting',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: 'taxConsulting',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'complianceAudit',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <RevealElement animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('common.services')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </RevealElement>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <RevealElement 
              key={service.key}
              animation="slide-up"
              delay={index * 150}
            >
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-100 dark:border-gray-700 h-full flex flex-col backdrop-blur-sm">
                {/* Иконка */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl mb-6 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
                  {service.icon}
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {t(`services.${service.key}.title`)}
                </h3>

                {/* Описание */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {t(`services.${service.key}.description`)}
                </p>
              </div>
            </RevealElement>
          ))}
        </div>

        {/* CTA блок */}
        <RevealElement animation="fade-in" delay={900}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.ctaText')}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Получите персональную консультацию от наших опытных юристов и найдите оптимальное решение для ваших правовых задач.
            </p>
            <button
              onClick={handleConsultationClick}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/25 shadow-lg hover:shadow-xl"
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
