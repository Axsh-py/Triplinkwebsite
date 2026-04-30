import { useSiteContent } from '../content/siteContent';
import { TripCarouselSection } from './TripCarouselSection';

export function IndiaTrips() {
  const { indiaTrips } = useSiteContent();

  return (
    <TripCarouselSection
      id="india-trips"
      section={indiaTrips}
      imageAlt="India Trips"
    />
  );
}
