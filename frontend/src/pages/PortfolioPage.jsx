import React from 'react';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const PortfolioPage = () => {
  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <Portfolio />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default PortfolioPage;
