import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './locales/i18n'; // Initialize i18n
import './tailwind.css';
import App from './App.tsx';

// Import debug utility for console debugging
import './utils/debugGoogleMaps';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
