# Konsalting TS

Современный React TypeScript проект, построенный с использованием Vite, с продвинутой архитектурной структурой и инструментами для обеспечения качества кода.

## 🚀 Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый инструмент сборки
- **Tailwind CSS** - Utility-first CSS фреймворк
- **i18next** - Интернационализация (RU/KZ)
- **Google Maps API** - Интерактивные карты
- **Telegram Bot API** - Уведомления о заявках
- **ESLint** - Линтер для поиска проблем в коде
- **Prettier** - Автоматическое форматирование кода

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые UI компоненты
│   ├── Button/         # Пример компонента кнопки
│   └── index.ts        # Экспорты компонентов
├── pages/              # Компоненты страниц
│   ├── HomePage.tsx    # Главная страница
│   └── index.ts        # Экспорты страниц
├── assets/             # Статические ресурсы (изображения, SVG)
├── styles/             # Глобальные стили
│   ├── theme.css       # Темы и CSS переменные
│   └── index.css       # Импорты стилей
├── hooks/              # Кастомные React хуки
│   ├── useLocalStorage.ts  # Хук для работы с localStorage
│   └── index.ts        # Экспорты хуков
├── context/            # Контексты React (глобальное состояние)
│   ├── ThemeContext.tsx    # Контекст для темы
│   └── index.ts        # Экспорты контекстов
├── utils/              # Утилитарные функции
│   ├── helpers.ts      # Вспомогательные функции
│   └── index.ts        # Экспорты утилит
└── locales/            # Файлы локализации
    ├── LocaleContext.tsx   # Контекст для локализации
    ├── translations.json   # Переводы
    └── index.ts        # Экспорты локализации
```

## ⚙️ Конфигурация TypeScript

Проект настроен со строгими правилами TypeScript:

- `strict: true` - Строгая проверка типов
- `baseUrl: "./src"` - Базовый путь для импортов
- Path mapping для удобных импортов (`@/components`, `@/utils`, etc.)

## 🛠️ Команды

### Разработка

```bash
npm run dev          # Запуск dev-сервера
```

### Сборка

```bash
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки
```

### Качество кода

```bash
npm run lint         # Проверка кода с ESLint
npm run lint:fix     # Автоматическое исправление проблем
npm run format       # Форматирование кода с Prettier
npm run format:check # Проверка форматирования
```

## 🎨 Особенности

### Компоненты

- Типизированные пропсы с TypeScript
- Переиспользуемые UI компоненты
- CSS модули для стилизации

### Хуки

- `useLocalStorage` - для работы с локальным хранилищем
- Кастомные хуки для бизнес-логики

### Контексты

- `ThemeContext` - управление темой приложения
- `LocaleContext` - локализация

### Path Mapping

Удобные импорты благодаря настроенным алиасам:

```typescript
import { Button } from '@/components';
import { useLocalStorage } from '@/hooks';
import { ThemeProvider } from '@/context';
```

## 🌟 Начало работы

1. Установите зависимости:

```bash
npm install
```

2. Запустите dev-сервер:

```bash
npm run dev
```

3. Откройте браузер по адресу `http://localhost:5173`

## 📝 Соглашения

- Используйте TypeScript для всех новых файлов
- Следуйте структуре папок проекта
- Все компоненты должны быть типизированы
- Используйте path mapping для импортов
- Запускайте линтер перед коммитом
- Форматируйте код с помощью Prettier

## 🤖 Telegram Debug Widget

В режиме разработки в правом нижнем углу появляется виджет отладки Telegram бота:

### Функции виджета:
- **Статус конфигурации** - проверка настроек бота
- **Информация о боте** - отображение данных бота
- **Тестирование** - отправка тестовых сообщений
- **Мониторинг ошибок** - отображение проблем конфигурации

### Управление виджетом:
- **Скрыть**: Нажмите кнопку × в правом верхнем углу виджета
- **Показать**: Нажмите кнопку 🤖 или используйте `Ctrl+Shift+T`
- **Обновить статус**: Нажмите кнопку ↻
- **Переключить**: Горячая клавиша `Ctrl+Shift+T`

Настройки видимости сохраняются в localStorage и запоминаются между сессиями.

Подробнее см. [TELEGRAM_DEBUG_WIDGET.md](./TELEGRAM_DEBUG_WIDGET.md)

## 🌐 Live Deployment

**🚀 Production Website**: https://konsalting-ts.web.app  
**📂 GitHub Repository**: https://github.com/chai-enjoyer/IndustrialLanding  
**🔧 Firebase Console**: https://console.firebase.google.com/project/konsalting-ts

### 🔐 Security Features
- ✅ **Secure Telegram Integration**: Bot credentials stored server-side via Firebase Cloud Functions
- ✅ **No Exposed Secrets**: All sensitive data hidden from browser
- ✅ **Production Ready**: Industry-standard security practices implemented
