import React from 'react';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import CTA from '../components/CTA';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden relative">
      <Services />
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default ServicesPage;
