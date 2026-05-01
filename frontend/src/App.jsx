import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import MobileNav from './components/MobileNav';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="bg-dark min-h-screen text-white selection:bg-primary/30">
        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        <MobileNav />
        <Footer />
      </div>
    </>
  );
}

export default App;