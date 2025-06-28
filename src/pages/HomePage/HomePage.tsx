import React from 'react';
import { 
  HeroSection, 
  ServicesSection, 
  AboutUsSection, 
  ContactSection 
} from './sections';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AboutUsSection />
      <ContactSection />
    </div>
  );
};
