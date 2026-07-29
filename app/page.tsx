import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import PropertiesPage from './properties/page';


;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />

<PropertiesPage></PropertiesPage>
      <WhyChooseUs></WhyChooseUs>
      <FaqSection></FaqSection>
    </main>
  );
}