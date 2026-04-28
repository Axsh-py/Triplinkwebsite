import { Hero } from '../components/Hero';
import { QuickStats } from '../components/QuickStats';
import { SpecialOfferStrip } from '../components/SpecialOfferStrip';
import { TimedCardBanner } from '../components/TimedCardBanner';
import { CampaignBanners } from '../components/CampaignBanners';
import { IndiaTrips } from '../components/IndiaTrips';
import { Destinations } from '../components/Destinations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <QuickStats />
      <SpecialOfferStrip />
      <TimedCardBanner />
      <CampaignBanners />
      <IndiaTrips />
      <Destinations />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
