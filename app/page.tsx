// import HeroSection from '@/app/components/Herosection';
// import WhyChooseUs from './components/WhyChooseUs';
// import MarqueeSection from './components/MarqueeSection';
// import TestimonialSection from './components/TestimonialSection';
// import FeaturedProperties from './components/Featuredproperties ';

// import NewsConsultSection from './components/NewsConsultSection';
// import PopularLocations from './components/PopularLocations';



// export default function HomePage() {
//   return (
//     <main className='bg-white'>

//       <HeroSection />
//       <MarqueeSection></MarqueeSection>
//       <FeaturedProperties></FeaturedProperties>
//       <PopularLocations></PopularLocations>
//       <WhyChooseUs></WhyChooseUs>
//       <NewsConsultSection></NewsConsultSection>
//       <TestimonialSection></TestimonialSection>
    

//     </main>
//   );
// }




















import HeroSection from '@/app/components/Herosection';
import WhyChooseUs from './components/WhyChooseUs';
import MarqueeSection from './components/MarqueeSection';
import TestimonialSection from './components/TestimonialSection';
import FeaturedProperties from './components/Featuredproperties ';
import NewsConsultSection from './components/NewsConsultSection';
import PopularLocations from './components/PopularLocations';

// Import ScrollAnimationWrapper
import ScrollAnimationWrapper from './components/ScrollAnimationWrapper';

export default function HomePage() {
  return (
    <main className="bg-white overflow-hidden">
      
      {/* Hero section e shobshomoy animation dorkar na hoy, but wrapper use korte paren */}
      <ScrollAnimationWrapper>
        <HeroSection />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <MarqueeSection />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <FeaturedProperties />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <PopularLocations />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <WhyChooseUs />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <NewsConsultSection />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <TestimonialSection />
      </ScrollAnimationWrapper>

    </main>
  );
}