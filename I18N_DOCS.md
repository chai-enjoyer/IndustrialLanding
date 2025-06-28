# Многоязыковая поддержка (i18n) - React i18next

## 🌍 Реализованная архитектура

### Основные компоненты системы локализации

#### 1. Настройка i18next (`src/locales/i18n.ts`)
- ✅ **Автоматическое определение языка** из localStorage или браузера
- ✅ **Fallback на русский язык** если язык не определен
- ✅ **Сохранение выбора** в localStorage
- ✅ **Debug режим** для разработки

```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { kz: {...}, ru: {...} },
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    }
  });
```

#### 2. Файлы переводов

**`src/locales/kz.json` - Казахский язык:**
```json
{
  "navigation": {
    "home": "Басты бет",
    "services": "Қызметтер", 
    "about": "Біз туралы",
    "contacts": "Байланыс"
  },
  "theme": {
    "switchToDark": "Қараңғы тақырыпқа ауысу",
    "switchToLight": "Ашық тақырыпқа ауысу"
  },
  "company": {
    "name": "«ЮРЛАЙН КОНСАЛТИНГ ОРТАЛЫҒЫ» ЖШС",
    "slogan": "Заңгерлік шешімдер әлемінде сіздің сенімді серіктесіңіз"
  }
}
```

**`src/locales/ru.json` - Русский язык:**
```json
{
  "navigation": {
    "home": "Главная",
    "services": "Услуги",
    "about": "О нас", 
    "contacts": "Контакты"
  },
  "theme": {
    "switchToDark": "Переключить на тёмную тему",
    "switchToLight": "Переключить на светлую тему"
  },
  "company": {
    "name": "ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН»",
    "slogan": "Ваш надёжный партнёр в мире юридических решений"
  }
}
```

#### 3. LanguageSwitcher (`src/components/LanguageSwitcher/LanguageSwitcher.tsx`)
- ✅ **Переключение KZ/RU** с сохранением в localStorage
- ✅ **Визуальное выделение** активного языка
- ✅ **Флаги стран** для лучшего UX
- ✅ **Адаптивный дизайн** с hover эффектами

```tsx
const { i18n } = useTranslation();
const handleLanguageChange = (languageCode: Language) => {
  i18n.changeLanguage(languageCode);
};
```

### Интеграция в компоненты

#### Header компонент
```tsx
const { t } = useTranslation();
const navItems = [
  { id: 'home', label: t('navigation.home') },
  { id: 'services', label: t('navigation.services') },
  // ...
];
```

#### ThemeSwitcher компонент
```tsx
const { t } = useTranslation();
const themeLabel = theme === 'light' 
  ? t('theme.switchToDark') 
  : t('theme.switchToLight');
```

#### Footer компонент
```tsx
const { t } = useTranslation();
<p>{t('company.copyright')}</p>
```

## 🚀 Структура переводов

### Организация ключей
```
navigation/          # Навигация
├── home
├── services  
├── about
└── contacts

theme/              # Тема
├── switchToDark
└── switchToLight

common/             # Общие элементы
├── getConsultation
├── name
├── email
├── phone
├── message
├── send
├── address
└── workingHours

company/            # О компании
├── name
├── slogan
├── description
└── copyright

pages/              # Страницы
├── home/
│   ├── welcome
│   └── subtitle
├── services/
└── about/

contact/            # Контакты
├── title
├── subtitle
├── address
├── office
├── schedule
└── weekend
```

## 💡 Использование в компонентах

### Базовое использование
```tsx
import { useTranslation } from 'react-i18next';

export const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>{t('company.slogan')}</p>
    </div>
  );
};
```

### С переменными
```tsx
const { t } = useTranslation();
// Для динамических ключей
const navKey = 'home';
<span>{t(`navigation.${navKey}`)}</span>
```

### Переключение языка
```tsx
const { i18n } = useTranslation();
i18n.changeLanguage('kz'); // Переключить на казахский
i18n.changeLanguage('ru'); // Переключить на русский
```

## 🔧 Настройки и конфигурация

### Добавление нового языка
1. Создать файл `src/locales/en.json`
2. Добавить ресурс в `i18n.ts`:
```typescript
const resources = {
  kz: { translation: kzTranslations },
  ru: { translation: ruTranslations },
  en: { translation: enTranslations }, // новый
};
```
3. Обновить тип `Language` в компонентах

### Изменение fallback языка
```typescript
// В src/locales/i18n.ts
.init({
  fallbackLng: 'kz', // Теперь казахский по умолчанию
  // ...
})
```

### Настройка определения языка
```typescript
detection: {
  order: [
    'localStorage',    // Сначала из localStorage
    'navigator',       // Потом из браузера  
    'htmlTag'         // Последний из HTML
  ],
  caches: ['localStorage'], // Кешировать в localStorage
}
```

## ✅ Выполненные требования

- [x] **Файлы переводов**: `kz.json` и `ru.json` созданы
- [x] **Полный набор переводов**: навигация, формы, компания, темы
- [x] **LanguageSwitcher**: KZ/RU кнопки с выделением активного
- [x] **localStorage**: сохранение выбора языка
- [x] **Интеграция в Header**: переключатель в хедере
- [x] **Инициализация i18n**: в main.tsx с автодетекцией
- [x] **useTranslation**: везде вместо старого LocaleContext
- [x] **Типизация**: TypeScript поддержка
- [x] **Адаптивность**: работает на всех устройствах

## 🎯 Преимущества реализации

### Производительность
- **Lazy loading** переводов при необходимости
- **Кеширование** в localStorage
- **Минимальный bundle size** благодаря tree shaking

### UX/UI
- **Мгновенное переключение** без перезагрузки
- **Визуальная обратная связь** активного языка
- **Флаги стран** для интуитивности
- **Плавные анимации** переходов

### Разработка
- **TypeScript поддержка** с автодополнением
- **Структурированные ключи** для легкого поиска
- **Debug режим** для отладки переводов
- **Простое добавление** новых языков

## 🚀 Готово к использованию!

Многоязыковая система полностью интегрирована и работает. Пользователи могут переключаться между казахским и русским языками с автоматическим сохранением предпочтений!
