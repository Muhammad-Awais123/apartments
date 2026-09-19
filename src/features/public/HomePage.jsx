import React from "react";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { HeroSection } from "./home/HeroSection";
import { TrustBarSection } from "./home/TrustBarSection";
import { LocationsSection } from "./home/LocationsSection";
import { FeaturedApartmentsSection } from "./home/FeaturedApartmentsSection";
import { AmenitiesSection } from "./home/AmenitiesSection";
import { StayOptionsSection } from "./home/StayOptionsSection";
import { HowItWorksSection } from "./home/HowItWorksSection";
import { GalleryMasonrySection } from "./home/GalleryMasonrySection";
import { VideoReelsSection } from "./home/VideoReelsSection";
import { ReviewsCarouselSection } from "./home/ReviewsCarouselSection";
import { SpecialOffersSection } from "./home/SpecialOffersSection";
import { NeighborhoodGuideSection, PriceTeaserSection } from "./home/NeighborhoodGuideSection";
import { FAQSection } from "./home/FAQSection";
import { InstagramFeedSection, PartnerSection, FinalCTASection } from "./home/FinalCTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink-900 selection:bg-gold-500 selection:text-white">
      <SEOHelmet
        title="Luxury Fully-Furnished Apartments in Bahria Town & Johar Town Lahore"
        description="Book luxury serviced apartments in Lahore with 24/7 power backup, smart keyless door locks, high-speed fiber internet, and full housekeeping. Short & long stay options available."
      />

      {/* 1. Hero with Parallax & Search Widget */}
      <HeroSection />

      {/* 2. Trust Bar with Animated Counters */}
      <TrustBarSection />

      {/* 3. Locations Cards (Bahria Town, Johar Town & Coming Soon Waitlist) */}
      <LocationsSection />

      {/* 4. Featured Apartments Carousel */}
      <FeaturedApartmentsSection />

      {/* 5. Why Choose Us / Amenities Grid */}
      <AmenitiesSection />

      {/* 6. Stay Options (Short, Weekly, Monthly/Long, Corporate) */}
      <StayOptionsSection />

      {/* 7. How It Works (4 Animated Steps) */}
      <HowItWorksSection />

      {/* 8. Gallery Masonry with Category Filters & Lightbox */}
      <GalleryMasonrySection />

      {/* 9. Video/Reels Showcase */}
      <VideoReelsSection />

      {/* 10. Guest Reviews Carousel & Submission */}
      <ReviewsCarouselSection />

      {/* 11. Special Offers with Countdown Timer */}
      <SpecialOffersSection />

      {/* 12. Neighborhood Guides */}
      <NeighborhoodGuideSection />

      {/* 13. Price/Availability Calendar Teaser */}
      <PriceTeaserSection />

      {/* 14. FAQ Accordion */}
      <FAQSection />

      {/* 15. Instagram Social Feed Grid */}
      <InstagramFeedSection />

      {/* 16. Partner / List Your Property Form */}
      <PartnerSection />

      {/* 17. Final Direct CTA */}
      <FinalCTASection />
    </div>
  );
}
