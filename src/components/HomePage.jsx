import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import UseCasesSection from './UseCasesSection';
import CoverageSection from './CoverageSection';
import PricingSection from './PricingSection';
import QuickStartSection from './QuickStartSection';
import HomeFooter from './HomeFooter';

function HomePage() {
  return (
    <div className="home-container">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Coverage Section */}
      <CoverageSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Quick Start Section */}
      <QuickStartSection />

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}

export default HomePage;
