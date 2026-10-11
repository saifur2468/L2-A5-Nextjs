import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import FaqSection from './components/FaqSection';
import MarqueeSection from './components/MarqueeSection'
import TestimonialSection from './components/TestimonialSection'



;
import FeaturedProperties from './components/Featuredproperties ';


export default function HomePage() {
  return (
    <main className='bg-white'>

      <HeroSection />
      <MarqueeSection></MarqueeSection>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseUs></WhyChooseUs>
  
      <TestimonialSection></TestimonialSection>
     
    </main>
  );
}