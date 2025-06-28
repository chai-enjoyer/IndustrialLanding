import React from 'react';
import {
  HeroSection,
  ServicesSection,
  AboutUsSection,
  TestimonialsSection,
  ContactSection
} from './HomePage/sections';
import { ScrollToTopButton } from '@/components';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
      <ScrollToTopButton />
    </main>
  );
};

export default HomePage;
