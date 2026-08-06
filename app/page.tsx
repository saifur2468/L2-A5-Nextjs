import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import MarqueeSection from './components/MarqueeSection'
import TestimonialSection from './components/TestimonialSection'



;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />
      <MarqueeSection></MarqueeSection>

     

      <WhyChooseUs></WhyChooseUs>
      <TestimonialSection></TestimonialSection>
      <FaqSection></FaqSection>
    </main>
  );
}