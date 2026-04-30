import { useSiteContent } from '../content/siteContent';
import { TripCarouselSection } from './TripCarouselSection';

export function Destinations() {
  const { internationalTrips } = useSiteContent();

  return (
    <TripCarouselSection
      id="destinations"
      section={internationalTrips}
      imageAlt="International Trips"
    />
  );
}
