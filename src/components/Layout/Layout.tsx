import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { key: 'home', href: '#home' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'contacts', href: '#contacts' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active navigation
  useEffect(() => {
    const sections = navigationItems.map(item =>
      document.querySelector(item.href)
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800 transition-all duration-300
          ${isScrolled ? 'shadow-md' : ''}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                ЮРЛАЙН
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      nav-link text-sm font-medium px-3 py-2 rounded-md
                      ${activeSection === item.key ? 'active' : ''}
                    `}
                  >
                    {t(`navigation.${item.key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 
                          dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 
                          focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
              {navigationItems.map((item, index) => (
                <div
                  key={item.key}
                  className="transform transition-all duration-300 ease-in-out"
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      block w-full text-left px-3 py-2 rounded-md text-base font-medium
                      transition-colors duration-200
                      ${
                        activeSection === item.key
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {t(`navigation.${item.key}`)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 ТОО «КОНСАЛТИНГ ЦЕНТР ЮРЛАЙН». Все права защищены.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296-.868-.807-1.297-1.964-1.297-3.465V9.772c0-1.501.429-2.658 1.297-3.465.868-.806 2.019-1.296 3.316-1.296h7.134c1.297 0 2.448.49 3.316 1.296.868.807 1.297 1.964 1.297 3.465v2.455c0 1.501-.429 2.658-1.297 3.465-.868.806-2.019 1.296-3.316 1.296H8.449z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
