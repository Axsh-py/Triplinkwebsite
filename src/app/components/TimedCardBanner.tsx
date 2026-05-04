import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { defaultSiteContent, useSiteContent } from '../content/siteContent';
import { getTripDetailPathForTitle } from '../content/tripUtils';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TimedCardBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const siteContent = useSiteContent();
  const { featuredTrips } = siteContent;

  const trips = useMemo(() => {
    const enabledTrips = featuredTrips.filter((trip) => trip.enabled && trip.title && trip.image);
    return enabledTrips.length > 0 ? enabledTrips : defaultSiteContent.featuredTrips;
  }, [featuredTrips]);

  useEffect(() => {
    if (activeIndex >= trips.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, trips.length]);

  useEffect(() => {
    if (trips.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [trips.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % trips.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + trips.length) % trips.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-yellow-500/10 text-primary px-6 py-3 rounded-full mb-6 border border-secondary/20">
            <Calendar size={20} className="text-secondary" />
            <span className="font-poppins font-semibold">Featured Trips</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-4">
            Trending <span className="text-secondary">Adventures</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked trips selected by the Triplink team
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[520px] rounded-3xl overflow-hidden luxury-shadow-hover">
            {trips.map((trip, index) => (
              <div
                key={trip.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <ImageWithFallback
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"></div>

                <div className="absolute inset-0 flex items-end md:items-center">
                  <div className="max-w-2xl px-6 py-12 sm:px-10 md:px-16">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-5 border border-white/25">
                      <Calendar size={16} className="text-secondary" />
                      <span className="text-sm">{trip.duration}</span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight text-shadow-lg">
                      {trip.title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                      {trip.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {trip.groupSize && (
                        <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-3 text-white">
                          <div className="text-xs text-white/70 mb-1">Group Size</div>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <Users size={16} />
                            {trip.groupSize}
                          </div>
                        </div>
                      )}
                      {trip.price && (
                        <div className="bg-secondary text-primary rounded-xl px-4 py-3">
                          <div className="text-xs text-primary/70 mb-1">Starting From</div>
                          <div className="text-sm font-bold">{trip.price}</div>
                        </div>
                      )}
                    </div>

                    <Link
                      to={getTripDetailPathForTitle(siteContent, trip.title)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-yellow-500 text-primary px-6 py-3 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 font-poppins font-bold text-sm sm:text-base"
                    >
                      Get Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {trips.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 z-10"
                  aria-label="Previous featured trip"
                >
                  <ChevronLeft size={24} className="text-primary" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 z-10"
                  aria-label="Next featured trip"
                >
                  <ChevronRight size={24} className="text-primary" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {trips.map((trip, index) => (
              <button
                key={trip.id}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 bg-secondary'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                } h-3`}
                aria-label={`Show ${trip.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
