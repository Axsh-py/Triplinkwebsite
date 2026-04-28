import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Destinations() {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const internationalDestinations = [
    {
      name: 'Paris',
      price: '89,999',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
    },
    {
      name: 'Bali',
      price: '64,990',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
    },
    {
      name: 'Dubai',
      price: '79,999',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
    },
    {
      name: 'Santorini',
      price: '94,999',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600',
    },
    {
      name: 'Maldives',
      price: '1,24,999',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600',
    },
    {
      name: 'Tokyo',
      price: '99,999',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
    },
    {
      name: 'New York',
      price: '1,09,999',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600',
    },
    {
      name: 'London',
      price: '84,999',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden luxury-shadow-hover">
          {videoSrc ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400"
              alt="International Trips"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

          <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-2 sm:mb-3 md:mb-4 text-shadow-lg">
              International Trips
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 font-light max-w-xl">
              Explore The World's Most Iconic Destinations
            </p>
            <div>
              <button className="bg-secondary hover:bg-yellow-500 text-black px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 luxury-shadow">
                Explore
              </button>
            </div>
          </div>

          <input
            type="file"
            accept="video/*"
            className="hidden"
            id="video-upload-international"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setVideoSrc(url);
              }
            }}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20">
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 -ml-2 md:-ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-primary md:hidden" />
            <ChevronLeft size={24} className="text-primary hidden md:block" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 -mr-2 md:-mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-primary md:hidden" />
            <ChevronRight size={24} className="text-primary hidden md:block" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {internationalDestinations.map((destination, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl overflow-hidden luxury-shadow hover:luxury-shadow-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-[160px] sm:h-[180px] md:h-[200px] overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <h3 className="font-poppins text-lg sm:text-xl text-white mb-1 sm:mb-2 font-semibold">
                      {destination.name}
                    </h3>
                    <p className="text-white/90 text-xs font-poppins">
                      Starting Price Rs. <span className="font-semibold">{destination.price}/-</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
