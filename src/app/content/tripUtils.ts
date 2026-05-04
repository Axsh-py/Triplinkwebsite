import { type SiteContent, type TripCard } from './siteContent';

export type TripSectionKey = 'indiaTrips' | 'internationalTrips';

export type TripWithSection = TripCard & {
  sectionKey: TripSectionKey;
  sectionTitle: string;
};

export const tripFilters = [
  { id: 'all', label: 'All Trips' },
  { id: 'solo', label: 'Solo' },
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'india', label: 'India' },
  { id: 'international', label: 'International' },
  { id: 'local', label: 'Local' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'adventure', label: 'Adventure' },
];

export function getAllTrips(content: SiteContent): TripWithSection[] {
  return [
    ...content.indiaTrips.trips.map((trip) => ({
      ...trip,
      sectionKey: 'indiaTrips' as const,
      sectionTitle: content.indiaTrips.title,
    })),
    ...content.internationalTrips.trips.map((trip) => ({
      ...trip,
      sectionKey: 'internationalTrips' as const,
      sectionTitle: content.internationalTrips.title,
    })),
  ];
}

export function getPublishedTrips(content: SiteContent) {
  return getAllTrips(content).filter((trip) => trip.enabled);
}

export function findTripById(content: SiteContent, tripId?: string) {
  if (!tripId) return undefined;
  return getPublishedTrips(content).find((trip) => trip.id === tripId);
}

const normalizeTripLookupText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function getTripDetailPathForTitle(content: SiteContent, title?: string) {
  const normalizedTitle = normalizeTripLookupText(title || '');

  if (!normalizedTitle) {
    return '/trips';
  }

  const matchingTrip = getPublishedTrips(content).find((trip) => {
    const normalizedName = normalizeTripLookupText(trip.name);
    return normalizedName && (
      normalizedTitle.includes(normalizedName) ||
      normalizedName.includes(normalizedTitle)
    );
  });

  if (matchingTrip) {
    return `/trips/${matchingTrip.id}`;
  }

  return `/trips?search=${encodeURIComponent(title || '')}`;
}

export function tripMatchesFilter(trip: TripWithSection, filterId: string) {
  if (filterId === 'all') return true;

  const searchable = [
    trip.destinationType,
    trip.tripStyle,
    trip.category,
    trip.sectionTitle,
    trip.region,
  ]
    .join(' ')
    .toLowerCase();

  return searchable.includes(filterId.toLowerCase());
}

export function formatTripPrice(price: string) {
  const trimmedPrice = price.trim();
  if (!trimmedPrice) return '';

  const hasCurrency = trimmedPrice.toLowerCase().includes('rs');
  const hasSuffix = trimmedPrice.endsWith('/-');

  if (hasCurrency) {
    return trimmedPrice;
  }

  return `Rs. ${trimmedPrice}${hasSuffix ? '' : '/-'}`;
}

export function formatTripDateRange(startDate: string, endDate: string) {
  if (!startDate && !endDate) return 'Flexible dates';
  if (startDate && !endDate) return startDate;
  if (!startDate && endDate) return endDate;
  return `${startDate} to ${endDate}`;
}
