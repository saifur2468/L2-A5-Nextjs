import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import MarqueeSection from './components/MarqueeSection';
import TestimonialSection from './components/TestimonialSection';
import FeaturedProperties from './components/Featuredproperties ';
import WhyChooseUsSection from './components/WhyChooseUs';
import NewsConsultSection from './components/NewsConsultSection';



export default function HomePage() {
  return (
    <main className='bg-white'>

      <HeroSection />
      <MarqueeSection></MarqueeSection>
      <FeaturedProperties></FeaturedProperties>
      
      <WhyChooseUs></WhyChooseUs>
      <NewsConsultSection></NewsConsultSection>
      <TestimonialSection></TestimonialSection>
    

    </main>
  );
}