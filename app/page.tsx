import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import MarqueeSection from './components/MarqueeSection';
import TestimonialSection from './components/TestimonialSection';
import FeaturedProperties from './components/Featuredproperties ';

import NewsConsultSection from './components/NewsConsultSection';
import PopularLocations from './components/PopularLocations';



export default function HomePage() {
  return (
    <main className='bg-white'>

      <HeroSection />
      <MarqueeSection></MarqueeSection>
      <FeaturedProperties></FeaturedProperties>
      <PopularLocations></PopularLocations>
      <WhyChooseUs></WhyChooseUs>
      <NewsConsultSection></NewsConsultSection>
      <TestimonialSection></TestimonialSection>
    

    </main>
  );
}