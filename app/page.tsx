import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import MarqueeSection from './components/MarqueeSection';
import TestimonialSection from './components/TestimonialSection';
import FeaturesSection from './components/Featuredproperties ';

export default function HomePage() {
  return (
    <main className='bg-white'>

      <HeroSection />
      <MarqueeSection></MarqueeSection>
      <FeaturesSection></FeaturesSection>
      <WhyChooseUs></WhyChooseUs>
      <TestimonialSection></TestimonialSection>
     
    </main>
  );
}