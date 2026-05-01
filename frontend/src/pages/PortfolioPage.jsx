import React from 'react';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden relative">
      <Portfolio />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default PortfolioPage;
