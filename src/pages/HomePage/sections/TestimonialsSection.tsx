import React from 'react';
import { useTranslation } from 'react-i18next';
import { RevealElement } from '@/components/RevealElement';

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      quote: "Команда ЮРЛАЙН оказала нам неоценимую помощь в сложном корпоративном споре. Профессионализм и внимание к деталям впечатлили.",
      author: "Алексей Петров",
      position: "Генеральный директор ТОО 'Стройтех'",
      rating: 5
    },
    {
      id: 2,
      quote: "Благодаря качественной правовой поддержке ЮРЛАЙН мы успешно оптимизировали налоговые обязательства и избежали штрафов.",
      author: "Марина Иванова",
      position: "Финансовый директор 'АльфаГрупп'",
      rating: 5
    },
    {
      id: 3,
      quote: "Быстрое и эффективное решение семейных правовых вопросов. Очень довольна индивидуальным подходом и результатом.",
      author: "Анна Сидорова",
      position: "Частный клиент",
      rating: 5
    }
  ];

  const clientLogos = [
    { name: "ТехноСтрой", id: 1 },
    { name: "АльфаГрупп", id: 2 },
    { name: "БизнесЦентр", id: 3 },
    { name: "ИнвестКапитал", id: 4 },
    { name: "ЭкоПроект", id: 5 }
  ];

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <RevealElement animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('testimonials.title', 'Отзывы клиентов')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('testimonials.subtitle', 'Что говорят о нас наши клиенты')}
            </p>
          </div>
        </RevealElement>

        {/* Отзывы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <RevealElement 
              key={testimonial.id}
              animation="slide-up"
              delay={index * 200}
            >
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Рейтинг */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Цитата */}
                <blockquote className="flex-grow mb-6">
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="text-4xl text-blue-600 dark:text-blue-400 font-serif leading-none">"</span>
                    {testimonial.quote}
                    <span className="text-4xl text-blue-600 dark:text-blue-400 font-serif leading-none">"</span>
                  </div>
                </blockquote>

                {/* Автор */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </RevealElement>
          ))}
        </div>

        {/* Логотипы клиентов */}
        <RevealElement animation="fade-in" delay={600}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
              {t('testimonials.clientsTitle', 'Нам доверяют')}
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300">
              {clientLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="group flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 min-w-[140px] h-16"
                >
                  <div className="flex items-center space-x-2">
                    {/* Иконка компании */}
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    
                    {/* Название компании */}
                    <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {logo.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealElement>
      </div>
    </section>
  );
};
