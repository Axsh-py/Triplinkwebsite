import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type TripSection } from '../content/siteContent';
import { formatTripPrice } from '../content/tripUtils';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TripEnquiryButton } from './TripEnquiryButton';

type TripCarouselSectionProps = {
  id: string;
  section: TripSection;
  imageAlt: string;
};

export function TripCarouselSection({ id, section, imageAlt }: TripCarouselSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const visibleTrips = section.trips.filter((trip) => trip.enabled);
  const tripsPagePath = id === 'india-trips' ? '/trips?filter=india' : '/trips?filter=international';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id={id} className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden luxury-shadow-hover">
          {section.bannerVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={section.bannerVideo} type="video/mp4" />
            </video>
          ) : (
            <ImageWithFallback
              src={section.bannerImage}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

          <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-2 sm:mb-3 md:mb-4 text-shadow-lg">
              {section.title}
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 font-light max-w-xl">
              {section.subtitle}
            </p>
            <div>
              <Link
                to={tripsPagePath}
                className="inline-flex bg-secondary hover:bg-yellow-500 text-black px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 luxury-shadow"
              >
                {section.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20">
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 -ml-2 md:-ml-4"
            aria-label={`Scroll ${section.title} left`}
          >
            <ChevronLeft size={20} className="text-primary md:hidden" />
            <ChevronLeft size={24} className="text-primary hidden md:block" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 -mr-2 md:-mr-4"
            aria-label={`Scroll ${section.title} right`}
          >
            <ChevronRight size={20} className="text-primary md:hidden" />
            <ChevronRight size={24} className="text-primary hidden md:block" />
          </button>

          <div
            ref={scrollContainerRef}
            className="triplink-scrollbar-hide flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {visibleTrips.map((destination) => (
              <div
                key={destination.id}
                className="group relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl overflow-hidden luxury-shadow hover:luxury-shadow-hover transition-all duration-500 hover:-translate-y-2"
              >
                <Link to={`/trips/${destination.id}`} className="block">
                  <div className="relative h-[210px] sm:h-[230px] md:h-[250px] overflow-hidden">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-poppins text-lg sm:text-xl text-white font-semibold leading-tight">
                          {destination.name}
                        </h3>
                        {destination.duration && (
                          <span className="shrink-0 rounded-full border border-white/30 bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                            {destination.duration}
                          </span>
                        )}
                      </div>
                      {destination.details && (
                        <p
                          className="text-white/80 text-[11px] sm:text-xs leading-snug mb-2"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {destination.details}
                        </p>
                      )}
                      {destination.price && (
                        <p className="text-white/90 text-xs font-poppins">
                          Starting Price <span className="font-semibold">{formatTripPrice(destination.price)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
                <TripEnquiryButton
                  trip={destination}
                  label="Enquire"
                  className="absolute right-3 top-3 z-10 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary shadow-lg transition hover:bg-yellow-400"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .triplink-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
