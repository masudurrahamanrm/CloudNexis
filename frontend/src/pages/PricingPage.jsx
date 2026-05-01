import React from 'react';
import { motion } from 'framer-motion';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden relative">
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
};

export default PricingPage;
