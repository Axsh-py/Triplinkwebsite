import { useSyncExternalStore } from 'react';

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cardImage: string;
  enabled: boolean;
};

export type TripCard = {
  id: string;
  name: string;
  price: string;
  duration: string;
  details: string;
  summary: string;
  destinationType: string;
  tripStyle: string;
  category: string;
  region: string;
  route: string;
  leaderName: string;
  leaderRole: string;
  startDate: string;
  endDate: string;
  startTime: string;
  pickupPoint: string;
  seats: string;
  difficulty: string;
  highlights: string[];
  itinerary: TripItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  image: string;
  enabled: boolean;
};

export type TripItineraryItem = {
  day: string;
  title: string;
  details: string;
};

export type TripSection = {
  title: string;
  subtitle: string;
  bannerImage: string;
  bannerVideo: string;
  ctaLabel: string;
  trips: TripCard[];
};

export type FeaturedTrip = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  price: string;
  enabled: boolean;
};

export type TopBannerContent = {
  enabled: boolean;
  text: string;
};

export type OfferStripContent = {
  enabled: boolean;
  title: string;
  body: string;
  buttonLabel: string;
};

export type SiteContent = {
  topBanner: TopBannerContent;
  specialOffer: OfferStripContent;
  heroSlides: HeroSlide[];
  featuredTrips: FeaturedTrip[];
  indiaTrips: TripSection;
  internationalTrips: TripSection;
};

const STORAGE_KEY = 'triplink.siteContent.v1';
const API_CONTENT_ENDPOINT = '/api/content';

export type SiteContentSaveResult = {
  persisted: 'api' | 'local';
  updatedAt?: string;
  warning?: string;
};

const defaultInclusions = [
  'Stay as per package category',
  'Local transfers mentioned in itinerary',
  'Trip captain support',
  'Breakfast on fixed departure days',
];

const defaultExclusions = [
  'Flights or train tickets unless mentioned',
  'Personal expenses and shopping',
  'Meals not mentioned in inclusions',
  'Entry tickets and adventure activity charges',
];

const createTrip = (
  trip: Pick<TripCard, 'id' | 'name' | 'price' | 'duration' | 'details' | 'image'> &
    Partial<TripCard>,
): TripCard => ({
  summary: trip.details,
  destinationType: 'India',
  tripStyle: 'Friends',
  category: 'Adventure',
  region: '',
  route: '',
  leaderName: 'Triplink Travel Captain',
  leaderRole: 'Trip Lead',
  startDate: '',
  endDate: '',
  startTime: '',
  pickupPoint: '',
  seats: '12-20',
  difficulty: 'Moderate',
  highlights: [],
  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival and orientation',
      details: 'Meet the Triplink team, settle in, and start with a relaxed local experience.',
    },
    {
      day: 'Day 2',
      title: 'Signature experiences',
      details: 'Cover the main attractions, scenic routes, cafes, markets, and curated local stops.',
    },
    {
      day: 'Day 3',
      title: 'Return with memories',
      details: 'Final breakfast, checkout, and assisted departure as per the package plan.',
    },
  ],
  inclusions: defaultInclusions,
  exclusions: defaultExclusions,
  gallery: [],
  ...trip,
});

export const defaultSiteContent: SiteContent = {
  topBanner: {
    enabled: true,
    text: 'Special Offer! Get up to 30% OFF on all international packages. Limited time only!',
  },
  specialOffer: {
    enabled: true,
    title: 'Flash Sale Alert!',
    body: 'Book any trip in next 24 hours and get FLAT Rs. 2,000 OFF + Free Travel Insurance',
    buttonLabel: 'Claim Offer Now',
  },
  heroSlides: [
    {
      id: 'hero-leh-ladakh',
      title: 'Leh Ladakh',
      subtitle: 'The Land of High Passes',
      description: 'Experience the breathtaking landscapes and ancient monasteries of the Himalayas',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      enabled: true,
    },
    {
      id: 'hero-kashmir-valley',
      title: 'Kashmir Valley',
      subtitle: 'Paradise on Earth',
      description: 'Discover the stunning beauty of Dal Lake, Gulmarg, and traditional houseboats',
      image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=400',
      enabled: true,
    },
    {
      id: 'hero-spiti-valley',
      title: 'Spiti Valley',
      subtitle: 'The Middle Land',
      description: 'Journey through ancient villages and dramatic landscapes of the trans-Himalayan region',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400',
      enabled: true,
    },
    {
      id: 'hero-meghalaya',
      title: 'Meghalaya',
      subtitle: 'Abode of Clouds',
      description: 'Explore living root bridges, waterfalls, and the wettest place on earth',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400',
      enabled: true,
    },
    {
      id: 'hero-rajasthan',
      title: 'Rajasthan',
      subtitle: 'Land of Kings',
      description: 'Immerse yourself in royal palaces, desert safaris, and vibrant culture',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400',
      enabled: true,
    },
  ],
  featuredTrips: [
    {
      id: 'featured-santorini',
      title: 'Santorini, Greece',
      description: 'Explore white-washed villages, volcanic cliffs, breathtaking sunsets, and crystal blue waters.',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
      duration: '7 Days',
      groupSize: '15-20',
      price: 'Rs. 1,24,999',
      enabled: true,
    },
    {
      id: 'featured-bali',
      title: 'Bali, Indonesia',
      description: 'Discover tropical temples, pristine beaches, rice terraces, and vibrant Balinese culture.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
      duration: '6 Days',
      groupSize: '12-18',
      price: 'Rs. 64,990',
      enabled: true,
    },
    {
      id: 'featured-swiss-alps',
      title: 'Swiss Alps',
      description: 'Experience mountain views, adventure activities, alpine villages, and pristine natural beauty.',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
      duration: '8 Days',
      groupSize: '10-15',
      price: 'Rs. 1,49,999',
      enabled: true,
    },
    {
      id: 'featured-maldives',
      title: 'Maldives Paradise',
      description: 'Luxury island resort experience with overwater villas, beaches, lagoons, and world-class diving.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
      duration: '5 Days',
      groupSize: '8-12',
      price: 'Rs. 1,24,999',
      enabled: true,
    },
    {
      id: 'featured-paris',
      title: 'Paris, France',
      description: 'The city of lights awaits with iconic landmarks, cuisine, romance, and rich cultural heritage.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
      duration: '7 Days',
      groupSize: '15-20',
      price: 'Rs. 1,19,999',
      enabled: true,
    },
  ],
  indiaTrips: {
    title: 'India Trips',
    subtitle: 'A Journey Through Time, Colour And Culture',
    bannerImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400',
    bannerVideo: '',
    ctaLabel: 'Explore',
    trips: [
      createTrip({
        id: 'india-leh-ladakh',
        name: 'Leh Ladakh',
        price: '13,600',
        duration: '6 Days',
        details: 'High passes, monasteries, lakes, and mountain roads.',
        summary: 'A high-altitude Himalayan road trip across passes, monasteries, turquoise lakes, and cold desert landscapes.',
        destinationType: 'India',
        tripStyle: 'Friends',
        category: 'Adventure',
        region: 'Ladakh',
        route: 'Leh - Sham Valley - Nubra - Pangong - Leh',
        leaderName: 'Aarav Mehta',
        leaderRole: 'Himalayan Trip Captain',
        startDate: '2026-06-12',
        endDate: '2026-06-17',
        startTime: '09:00 AM',
        pickupPoint: 'Leh Airport',
        seats: '18 seats',
        difficulty: 'Moderate',
        highlights: ['Pangong Lake', 'Khardung La', 'Nubra Valley', 'Monastery visits'],
        gallery: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900',
          'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900',
        ],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-spiti',
        name: 'Spiti',
        price: '16,990',
        duration: '7 Days',
        details: 'Remote Himalayan villages, monasteries, and dramatic valleys.',
        summary: 'A rugged mountain circuit through remote villages, ancient monasteries, and cinematic trans-Himalayan roads.',
        destinationType: 'India',
        tripStyle: 'Solo',
        category: 'Adventure',
        region: 'Himachal Pradesh',
        route: 'Manali - Kaza - Key - Chandratal - Manali',
        leaderName: 'Kabir Rana',
        leaderRole: 'Mountain Route Lead',
        startDate: '2026-06-20',
        endDate: '2026-06-26',
        startTime: '07:00 AM',
        pickupPoint: 'Manali Volvo Stand',
        seats: '14 seats',
        difficulty: 'Challenging',
        highlights: ['Chandratal Lake', 'Key Monastery', 'Kaza cafes', 'High altitude drives'],
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-kashmir',
        name: 'Kashmir',
        price: '24,490',
        duration: '5 Days',
        details: 'Dal Lake, Gulmarg, valleys, and classic houseboat stays.',
        summary: 'A scenic family-friendly escape with houseboats, meadows, gondola views, and valley drives.',
        destinationType: 'India',
        tripStyle: 'Family',
        category: 'Leisure',
        region: 'Jammu & Kashmir',
        route: 'Srinagar - Gulmarg - Pahalgam - Srinagar',
        leaderName: 'Zoya Khan',
        leaderRole: 'Guest Experience Lead',
        startDate: '2026-05-18',
        endDate: '2026-05-22',
        startTime: '11:00 AM',
        pickupPoint: 'Srinagar Airport',
        seats: '20 seats',
        difficulty: 'Easy',
        highlights: ['Dal Lake shikara', 'Gulmarg gondola', 'Pahalgam valley', 'Houseboat stay'],
        image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-meghalaya',
        name: 'Meghalaya',
        price: '21,690',
        duration: '6 Days',
        details: 'Root bridges, waterfalls, caves, and cloud forests.',
        summary: 'A nature-first trip through waterfalls, living root bridges, clean villages, caves, and misty drives.',
        destinationType: 'India',
        tripStyle: 'Friends',
        category: 'Nature',
        region: 'Meghalaya',
        route: 'Guwahati - Shillong - Cherrapunji - Dawki - Guwahati',
        leaderName: 'Rhea Dutta',
        leaderRole: 'North East Trip Lead',
        startDate: '2026-07-05',
        endDate: '2026-07-10',
        startTime: '10:30 AM',
        pickupPoint: 'Guwahati Airport',
        seats: '16 seats',
        difficulty: 'Moderate',
        highlights: ['Dawki river', 'Double decker root bridge', 'Waterfalls', 'Cave walks'],
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-himachal',
        name: 'Himachal',
        price: '8,990',
        duration: '4 Days',
        details: 'Mountain towns, cafes, valleys, and adventure activities.',
        summary: 'A quick mountain break for cafes, valley viewpoints, local markets, and easy adventure experiences.',
        destinationType: 'Local',
        tripStyle: 'Friends',
        category: 'Weekend',
        region: 'Himachal Pradesh',
        route: 'Delhi - Manali - Solang - Delhi',
        leaderName: 'Nikhil Suri',
        leaderRole: 'Weekend Trip Captain',
        startDate: '2026-05-09',
        endDate: '2026-05-12',
        startTime: '08:00 PM',
        pickupPoint: 'Delhi RK Ashram Metro Gate 3',
        seats: '25 seats',
        difficulty: 'Easy',
        highlights: ['Cafe hopping', 'Solang Valley', 'Mountain drives', 'Bonfire evening'],
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-goa',
        name: 'Goa',
        price: '9,999',
        duration: '4 Days',
        details: 'Beaches, nightlife, Portuguese streets, and relaxed stays.',
        summary: 'A beach escape built around relaxed stays, old Goa lanes, nightlife, cafes, and sunset points.',
        destinationType: 'India',
        tripStyle: 'Friends',
        category: 'Beach',
        region: 'Goa',
        route: 'North Goa - Panjim - South Goa',
        leaderName: 'Tanya Fernandes',
        leaderRole: 'Coastal Experience Lead',
        startDate: '2026-06-01',
        endDate: '2026-06-04',
        startTime: '12:00 PM',
        pickupPoint: 'Goa Airport',
        seats: '18 seats',
        difficulty: 'Easy',
        highlights: ['Beach clubs', 'Fontainhas walk', 'Sunset cruise', 'Cafe trail'],
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-rajasthan',
        name: 'Rajasthan',
        price: '15,999',
        duration: '5 Days',
        details: 'Forts, palaces, desert camps, markets, and royal trails.',
        summary: 'A culture-rich royal trail through forts, palaces, desert stays, markets, and local cuisine.',
        destinationType: 'India',
        tripStyle: 'Family',
        category: 'Culture',
        region: 'Rajasthan',
        route: 'Jaipur - Jodhpur - Jaisalmer',
        leaderName: 'Dev Singh',
        leaderRole: 'Culture Trip Lead',
        startDate: '2026-10-15',
        endDate: '2026-10-19',
        startTime: '09:30 AM',
        pickupPoint: 'Jaipur Airport',
        seats: '22 seats',
        difficulty: 'Easy',
        highlights: ['Amber Fort', 'Mehrangarh Fort', 'Desert camp', 'Local markets'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'india-kerala',
        name: 'Kerala',
        price: '13,999',
        duration: '5 Days',
        details: 'Backwaters, hill stations, beaches, and spice trails.',
        summary: 'A slow scenic trip through backwaters, tea hills, spice gardens, beaches, and calm stays.',
        destinationType: 'India',
        tripStyle: 'Family',
        category: 'Leisure',
        region: 'Kerala',
        route: 'Kochi - Munnar - Alleppey - Kochi',
        leaderName: 'Mira Nair',
        leaderRole: 'South India Trip Lead',
        startDate: '2026-08-08',
        endDate: '2026-08-12',
        startTime: '10:00 AM',
        pickupPoint: 'Kochi Airport',
        seats: '16 seats',
        difficulty: 'Easy',
        highlights: ['Houseboat stay', 'Tea gardens', 'Spice plantation', 'Kochi streets'],
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
        enabled: true,
      }),
    ],
  },
  internationalTrips: {
    title: 'International Trips',
    subtitle: "Explore The World's Most Iconic Destinations",
    bannerImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400',
    bannerVideo: '',
    ctaLabel: 'Explore',
    trips: [
      createTrip({
        id: 'international-paris',
        name: 'Paris',
        price: '89,999',
        duration: '7 Days',
        details: 'Landmarks, museums, cafes, shopping, and romantic city walks.',
        summary: 'A classic European city break through icons, museums, cafes, Seine walks, and curated photo spots.',
        destinationType: 'International',
        tripStyle: 'Family',
        category: 'Culture',
        region: 'France',
        route: 'Paris - Versailles - Paris',
        leaderName: 'Ananya Kapoor',
        leaderRole: 'Europe Tour Manager',
        startDate: '2026-09-04',
        endDate: '2026-09-10',
        startTime: '02:00 PM',
        pickupPoint: 'Paris Charles de Gaulle Airport',
        seats: '20 seats',
        difficulty: 'Easy',
        highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine cruise', 'Versailles day trip'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-bali',
        name: 'Bali',
        price: '64,990',
        duration: '6 Days',
        details: 'Temples, beaches, rice terraces, waterfalls, and villas.',
        summary: 'A tropical international escape with temples, waterfalls, rice terraces, beach clubs, and villa stays.',
        destinationType: 'International',
        tripStyle: 'Solo',
        category: 'Beach',
        region: 'Indonesia',
        route: 'Ubud - Kuta - Nusa Penida',
        leaderName: 'Ishaan Malhotra',
        leaderRole: 'Island Experience Lead',
        startDate: '2026-06-18',
        endDate: '2026-06-23',
        startTime: '01:00 PM',
        pickupPoint: 'Ngurah Rai International Airport',
        seats: '16 seats',
        difficulty: 'Easy',
        highlights: ['Nusa Penida', 'Ubud rice terraces', 'Temple trail', 'Beach club evening'],
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-dubai',
        name: 'Dubai',
        price: '79,999',
        duration: '5 Days',
        details: 'Skylines, desert safari, shopping, beaches, and theme parks.',
        summary: 'A polished city break with skyline icons, desert safari, shopping, beaches, and optional theme parks.',
        destinationType: 'International',
        tripStyle: 'Family',
        category: 'Luxury',
        region: 'United Arab Emirates',
        route: 'Dubai City - Desert Safari - Marina - Abu Dhabi optional',
        leaderName: 'Samaira Sheikh',
        leaderRole: 'Gulf Tour Manager',
        startDate: '2026-07-12',
        endDate: '2026-07-16',
        startTime: '12:30 PM',
        pickupPoint: 'Dubai International Airport',
        seats: '24 seats',
        difficulty: 'Easy',
        highlights: ['Burj Khalifa', 'Desert safari', 'Marina cruise', 'Dubai Mall'],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-santorini',
        name: 'Santorini',
        price: '94,999',
        duration: '7 Days',
        details: 'Cliffside villages, sunsets, beaches, and Aegean views.',
        summary: 'A romantic island escape with cliffside stays, blue-domed lanes, beaches, sunset viewpoints, and slow evenings.',
        destinationType: 'International',
        tripStyle: 'Couples',
        category: 'Honeymoon',
        region: 'Greece',
        route: 'Athens - Santorini - Oia - Fira',
        leaderName: 'Rohan Arora',
        leaderRole: 'Honeymoon Travel Curator',
        startDate: '2026-08-20',
        endDate: '2026-08-26',
        startTime: '11:00 AM',
        pickupPoint: 'Athens International Airport',
        seats: '12 seats',
        difficulty: 'Easy',
        highlights: ['Oia sunset', 'Caldera views', 'Island cruise', 'Black sand beach'],
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-maldives',
        name: 'Maldives',
        price: '1,24,999',
        duration: '5 Days',
        details: 'Overwater villas, reefs, lagoons, diving, and slow luxury.',
        summary: 'A slow luxury escape with lagoons, reefs, overwater villas, water sports, and private resort time.',
        destinationType: 'International',
        tripStyle: 'Couples',
        category: 'Luxury',
        region: 'Maldives',
        route: 'Male - Private Island Resort - Male',
        leaderName: 'Naina Sethi',
        leaderRole: 'Luxury Escape Specialist',
        startDate: '2026-11-02',
        endDate: '2026-11-06',
        startTime: '10:00 AM',
        pickupPoint: 'Male International Airport',
        seats: '10 seats',
        difficulty: 'Easy',
        highlights: ['Overwater villa', 'Snorkeling', 'Sunset dinner', 'Resort leisure'],
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-tokyo',
        name: 'Tokyo',
        price: '99,999',
        duration: '7 Days',
        details: 'City lights, food lanes, temples, fashion, and pop culture.',
        summary: 'A fast-moving city trip through food lanes, neon districts, temples, pop culture, and clean transit days.',
        destinationType: 'International',
        tripStyle: 'Friends',
        category: 'City',
        region: 'Japan',
        route: 'Tokyo - Hakone - Tokyo',
        leaderName: 'Aditya Sen',
        leaderRole: 'Japan Trip Lead',
        startDate: '2026-10-05',
        endDate: '2026-10-11',
        startTime: '01:30 PM',
        pickupPoint: 'Tokyo Haneda Airport',
        seats: '18 seats',
        difficulty: 'Moderate',
        highlights: ['Shibuya crossing', 'Temple walk', 'Hakone day trip', 'Food trail'],
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-new-york',
        name: 'New York',
        price: '1,09,999',
        duration: '7 Days',
        details: 'Icons, skyline views, museums, Broadway, and shopping.',
        summary: 'A classic city adventure with skyline decks, museums, Broadway energy, shopping streets, and park walks.',
        destinationType: 'International',
        tripStyle: 'Friends',
        category: 'City',
        region: 'United States',
        route: 'Manhattan - Brooklyn - Statue Cruise - Manhattan',
        leaderName: 'Mehak Batra',
        leaderRole: 'USA Tour Manager',
        startDate: '2026-09-22',
        endDate: '2026-09-28',
        startTime: '03:00 PM',
        pickupPoint: 'JFK Airport',
        seats: '18 seats',
        difficulty: 'Easy',
        highlights: ['Times Square', 'Statue cruise', 'Brooklyn Bridge', 'Broadway district'],
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
        enabled: true,
      }),
      createTrip({
        id: 'international-london',
        name: 'London',
        price: '84,999',
        duration: '6 Days',
        details: 'History, royal landmarks, markets, museums, and theatre.',
        summary: 'A heritage city break through royal landmarks, museums, markets, theatre lanes, and riverside walks.',
        destinationType: 'International',
        tripStyle: 'Family',
        category: 'Culture',
        region: 'United Kingdom',
        route: 'London - Windsor - London',
        leaderName: 'Vikram Chawla',
        leaderRole: 'UK Tour Manager',
        startDate: '2026-07-28',
        endDate: '2026-08-02',
        startTime: '02:00 PM',
        pickupPoint: 'London Heathrow Airport',
        seats: '20 seats',
        difficulty: 'Easy',
        highlights: ['Tower Bridge', 'Buckingham Palace', 'Camden Market', 'Windsor day trip'],
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600',
        enabled: true,
      }),
    ],
  },
};

const adminEnv = (import.meta as unknown as { env?: { VITE_ADMIN_PASSCODE?: string } }).env;
export const ADMIN_PASSCODE = adminEnv?.VITE_ADMIN_PASSCODE || 'triplink-admin';

const isBrowser = () => typeof window !== 'undefined';

const normalizeStringList = (value: unknown, fallback: string[] = []) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split('\n').map((item) => item.trim()).filter(Boolean);
  }

  return fallback;
};

const normalizeItinerary = (value: unknown, fallback: TripItineraryItem[] = []) => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value
    .map((item, index) => {
      const itineraryItem = item as Partial<TripItineraryItem>;
      return {
        day: itineraryItem.day || `Day ${index + 1}`,
        title: itineraryItem.title || '',
        details: itineraryItem.details || '',
      };
    })
    .filter((item) => item.title || item.details);
};

const normalizeTrip = (trip: Partial<TripCard>): TripCard => {
  const fallback = createTrip({
    id: trip.id || createContentId('trip'),
    name: trip.name || '',
    price: trip.price || '',
    duration: trip.duration || '',
    details: trip.details || '',
    image: trip.image || '',
  });

  return {
    ...fallback,
    ...trip,
    id: trip.id || fallback.id,
    name: trip.name || '',
    price: trip.price || '',
    duration: trip.duration || '',
    details: trip.details || '',
    summary: trip.summary || trip.details || '',
    destinationType: trip.destinationType || fallback.destinationType,
    tripStyle: trip.tripStyle || fallback.tripStyle,
    category: trip.category || fallback.category,
    region: trip.region || '',
    route: trip.route || '',
    leaderName: trip.leaderName || fallback.leaderName,
    leaderRole: trip.leaderRole || fallback.leaderRole,
    startDate: trip.startDate || '',
    endDate: trip.endDate || '',
    startTime: trip.startTime || '',
    pickupPoint: trip.pickupPoint || '',
    seats: trip.seats || fallback.seats,
    difficulty: trip.difficulty || fallback.difficulty,
    highlights: normalizeStringList(trip.highlights, fallback.highlights),
    itinerary: normalizeItinerary(trip.itinerary, fallback.itinerary),
    inclusions: normalizeStringList(trip.inclusions, defaultInclusions),
    exclusions: normalizeStringList(trip.exclusions, defaultExclusions),
    gallery: normalizeStringList(trip.gallery),
    image: trip.image || '',
    enabled: trip.enabled !== false,
  };
};

const normalizeTripSection = (section: TripSection, fallback: TripSection): TripSection => ({
  title: section?.title || fallback.title,
  subtitle: section?.subtitle || fallback.subtitle,
  bannerImage: section?.bannerImage || fallback.bannerImage,
  bannerVideo: section?.bannerVideo || '',
  ctaLabel: section?.ctaLabel || fallback.ctaLabel,
  trips: Array.isArray(section?.trips) ? section.trips.map(normalizeTrip) : fallback.trips,
});

const normalizeContent = (content: Partial<SiteContent> | null): SiteContent => {
  if (!content) {
    return defaultSiteContent;
  }

  return {
    topBanner: {
      ...defaultSiteContent.topBanner,
      ...content.topBanner,
      enabled: content.topBanner?.enabled !== false,
    },
    specialOffer: {
      ...defaultSiteContent.specialOffer,
      ...content.specialOffer,
      enabled: content.specialOffer?.enabled !== false,
    },
    heroSlides: Array.isArray(content.heroSlides)
      ? content.heroSlides.map((slide) => ({
          id: slide.id || createContentId('hero'),
          title: slide.title || '',
          subtitle: slide.subtitle || '',
          description: slide.description || '',
          image: slide.image || '',
          cardImage: slide.cardImage || slide.image || '',
          enabled: slide.enabled !== false,
        }))
      : defaultSiteContent.heroSlides,
    featuredTrips: Array.isArray(content.featuredTrips)
      ? content.featuredTrips.map((trip) => ({
          id: trip.id || createContentId('featured'),
          title: trip.title || '',
          description: trip.description || '',
          image: trip.image || '',
          duration: trip.duration || '',
          groupSize: trip.groupSize || '',
          price: trip.price || '',
          enabled: trip.enabled !== false,
        }))
      : defaultSiteContent.featuredTrips,
    indiaTrips: normalizeTripSection(
      content.indiaTrips || defaultSiteContent.indiaTrips,
      defaultSiteContent.indiaTrips,
    ),
    internationalTrips: normalizeTripSection(
      content.internationalTrips || defaultSiteContent.internationalTrips,
      defaultSiteContent.internationalTrips,
    ),
  };
};

const readStoredContent = (): SiteContent => {
  if (!isBrowser()) {
    return defaultSiteContent;
  }

  const storedContent = window.localStorage.getItem(STORAGE_KEY);
  if (!storedContent) {
    return defaultSiteContent;
  }

  try {
    return normalizeContent(JSON.parse(storedContent) as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
};

let currentContent = readStoredContent();
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export function subscribeToSiteContent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSiteContentSnapshot() {
  return currentContent;
}

export function useSiteContent() {
  return useSyncExternalStore(
    subscribeToSiteContent,
    getSiteContentSnapshot,
    getSiteContentSnapshot,
  );
}

const cacheSiteContent = (content: SiteContent) => {
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // The SQLite API is the source of truth; localStorage is only a fast cache.
    }
  }
};

const clearCachedSiteContent = () => {
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore cache cleanup failures.
    }
  }
};

class ApiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

const readApiError = async (response: Response) => {
  try {
    const payload = await response.json() as { error?: string };
    return payload.error || response.statusText;
  } catch {
    return response.statusText;
  }
};

const getAuthHeaders = (adminPasscode?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (adminPasscode) {
    headers['X-Admin-Passcode'] = adminPasscode;
  }

  return headers;
};

async function saveContentToApi(content: SiteContent, adminPasscode?: string) {
  const response = await fetch(API_CONTENT_ENDPOINT, {
    method: 'PUT',
    headers: getAuthHeaders(adminPasscode),
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new ApiRequestError(response.status, await readApiError(response));
  }

  return response.json() as Promise<{ ok: boolean; updatedAt?: string }>;
}

async function resetContentInApi(adminPasscode?: string) {
  const response = await fetch(API_CONTENT_ENDPOINT, {
    method: 'DELETE',
    headers: getAuthHeaders(adminPasscode),
  });

  if (!response.ok) {
    throw new ApiRequestError(response.status, await readApiError(response));
  }

  return response.json() as Promise<{ ok: boolean }>;
}

export async function refreshSiteContent() {
  if (!isBrowser()) {
    return currentContent;
  }

  try {
    const response = await fetch(API_CONTENT_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return currentContent;
    }

    const payload = await response.json() as {
      content?: Partial<SiteContent> | null;
    };

    if (!payload.content) {
      return currentContent;
    }

    currentContent = normalizeContent(payload.content);
    cacheSiteContent(currentContent);
    notifyListeners();
  } catch {
    return currentContent;
  }

  return currentContent;
}

if (isBrowser()) {
  void refreshSiteContent();
}

export async function saveSiteContent(
  content: SiteContent,
  adminPasscode?: string,
): Promise<SiteContentSaveResult> {
  const nextContent = normalizeContent(content);
  let apiError: unknown;

  if (isBrowser()) {
    try {
      const apiResult = await saveContentToApi(nextContent, adminPasscode);
      currentContent = nextContent;
      cacheSiteContent(nextContent);
      notifyListeners();
      return {
        persisted: 'api',
        updatedAt: apiResult.updatedAt,
      };
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 401) {
        throw error;
      }
      apiError = error;
    }
  }

  cacheSiteContent(nextContent);

  currentContent = nextContent;
  notifyListeners();

  return {
    persisted: 'local',
    warning: apiError instanceof Error ? apiError.message : 'Local DB API is not reachable',
  };
}

export async function resetSiteContent(adminPasscode?: string): Promise<SiteContentSaveResult> {
  let apiError: unknown;

  if (isBrowser()) {
    try {
      await resetContentInApi(adminPasscode);
      currentContent = defaultSiteContent;
      clearCachedSiteContent();
      notifyListeners();
      return { persisted: 'api' };
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 401) {
        throw error;
      }
      apiError = error;
    }
  }

  currentContent = defaultSiteContent;
  clearCachedSiteContent();

  notifyListeners();

  return {
    persisted: 'local',
    warning: apiError instanceof Error ? apiError.message : 'Local DB API is not reachable',
  };
}

export async function importSiteContent(jsonText: string, adminPasscode?: string) {
  const nextContent = normalizeContent(JSON.parse(jsonText) as Partial<SiteContent>);
  return saveSiteContent(nextContent, adminPasscode);
}

export function exportSiteContent() {
  return JSON.stringify(currentContent, null, 2);
}

export function createContentId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
