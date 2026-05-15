import React from 'react';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import CTA from '../components/CTA';

const ServicesPage = () => {
  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <Services />
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default ServicesPage;
