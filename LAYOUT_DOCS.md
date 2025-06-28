# Layout Components Documentation

## 🏗️ Созданная архитектура Layout

### Основные компоненты

#### 1. Layout (`src/components/Layout/Layout.tsx`)

- **Адаптивный контейнер** для всего приложения
- **Прокрутка с эффектами** - тень хедера при скролле
- **Sticky header** с фиксированным позиционированием
- **Responsive design** с мобильным меню

#### 2. Header (`src/components/Header/Header.tsx`)

**Логотип:**

- ✅ Текстовый логотип "ЮРЛАЙН" с жирным шрифтом
- ✅ Расположен в левой части хедера

**Навигация:**

- ✅ Ссылки: Главная, Услуги, О нас, Контакты
- ✅ Плавные переходы (`transition-colors duration-200`)
- ✅ Динамическое выделение активной секции через `IntersectionObserver`
- ✅ Smooth scroll к секциям

**Дополнительные элементы:**

- ✅ Переключатель языка KZ/RU с минималистичным дизайном
- ✅ Кнопка смены темы с SVG иконками солнца/луны
- ✅ Адаптивное мобильное меню (кнопка гамбургера)

#### 3. Footer (`src/components/Footer/Footer.tsx`)

**Контент:**

- ✅ Копирайт "© 2025 ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН». Все права защищены."
- ✅ Иконки социальных сетей (Facebook, Instagram, LinkedIn)
- ✅ Дополнительная информация: контакты, адрес, время работы

**Дизайн:**

- ✅ Слегка темнее основного фона
- ✅ Адаптивная сетка для информационных блоков

### Система тем

#### ThemeSwitcher (`src/components/ThemeSwitcher/ThemeSwitcher.tsx`)

- ✅ Переключение между светлой и темной темами
- ✅ SVG иконки с анимациями
- ✅ Доступность (aria-labels)

#### ThemeContext (`src/context/ThemeContext.tsx`)

- ✅ Глобальное состояние темы
- ✅ Автоматическое применение класса `dark` к HTML элементу
- ✅ Сохранение в localStorage
- ✅ Загрузка сохраненной темы при старте

#### LanguageSwitcher (`src/components/LanguageSwitcher/LanguageSwitcher.tsx`)

- ✅ Переключение между KZ и RU языками
- ✅ Минималистичный дизайн с четким указанием активного языка
- ✅ Hover эффекты

### Стилизация с Tailwind CSS

#### Основные классы:

- ✅ `dark:` префиксы для темной темы
- ✅ Responsive prefixes (`sm:`, `md:`, `lg:`)
- ✅ Transition классы для плавных анимаций
- ✅ Custom utility классы в `@layer components`

#### Специальные классы:

- `.nav-link` - стили для навигационных ссылок
- `.nav-link.active` - активная ссылка с подчеркиванием
- `.language-btn` - стили для кнопок языка
- `.scrolled` - класс для хедера при прокрутке

### Особенности реализации

#### 🎯 IntersectionObserver Navigation

```typescript
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  },
  {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0,
  }
);
```

#### 🌓 Автоматическая смена темы

```typescript
useEffect(() => {
  localStorage.setItem('theme', state.theme);
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [state.theme]);
```

#### 📱 Адаптивный дизайн

- Desktop: полная навигация с контролами
- Mobile: гамбургер меню (готова структура)
- Responsive grid в футере
- Адаптивные размеры шрифтов и отступы

## 🚀 Использование

```tsx
// В App.tsx
function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Layout>
          <HomePage />
        </Layout>
      </LocaleProvider>
    </ThemeProvider>
  );
}
```

## 🎨 Кастомизация

### Цвета темы

Настраиваются в `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

### Переводы

Добавляются в `src/locales/translations.json`:

```json
{
  "ru": { "home": "Главная" },
  "kz": { "home": "Басты бет" }
}
```

## ✅ Чеклист выполненных требований

- [x] Адаптивный Layout компонент
- [x] Header с логотипом "ЮРЛАЙН"
- [x] Навигация с плавными переходами
- [x] IntersectionObserver для активной секции
- [x] Переключатель языка KZ/RU
- [x] Кнопка смены темы с иконками
- [x] Footer с копирайтом и соцсетями
- [x] ThemeContext с localStorage
- [x] Плавные переходы между темами
- [x] Класс 'dark' на HTML элементе
- [x] Исключительно Tailwind CSS стили
- [x] Тень хедера при прокрутке
- [x] Responsive design
