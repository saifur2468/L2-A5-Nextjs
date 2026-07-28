import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';


;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />


      <WhyChooseUs></WhyChooseUs>
      <FaqSection></FaqSection>
    </main>
  );
}