import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowWeHelp from '@/components/HowWeHelp';
import PartnersStrip from '@/components/PartnersStrip';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import MetricsSection from '@/components/MetricsSection';
import DifferentiatorsSection from '@/components/DifferentiatorsSection';
import RDSection from '@/components/RDSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <HowWeHelp />
      <MetricsSection />
      <DifferentiatorsSection />
      <RDSection />
      <PartnersStrip />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
