import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FeedbackForm from '../components/FeedbackForm';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <FeedbackForm />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;
