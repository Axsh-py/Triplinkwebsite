import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TimedCardBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const trips = [
    {
      title: 'Santorini, Greece',
      description: 'Explore the stunning white-washed villages perched on volcanic cliffs, witness breathtaking sunsets, and immerse yourself in crystal blue waters',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
      duration: '7 Days',
      groupSize: '15-20',
      price: '₹1,24,999',
    },
    {
      title: 'Bali, Indonesia',
      description: 'Discover tropical paradise with ancient temples, pristine beaches, lush rice terraces, and vibrant Balinese culture',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
      duration: '6 Days',
      groupSize: '12-18',
      price: '₹64,990',
    },
    {
      title: 'Swiss Alps',
      description: 'Experience breathtaking mountain views, thrilling adventure activities, charming alpine villages, and pristine natural beauty',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
      duration: '8 Days',
      groupSize: '10-15',
      price: '₹1,49,999',
    },
    {
      title: 'Maldives Paradise',
      description: 'Luxury island resort experience with overwater villas, pristine beaches, crystal-clear lagoons, and world-class diving',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
      duration: '5 Days',
      groupSize: '8-12',
      price: '₹1,24,999',
    },
    {
      title: 'Paris, France',
      description: 'The city of lights awaits with iconic landmarks, world-class cuisine, romantic ambiance, and rich cultural heritage',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
      duration: '7 Days',
      groupSize: '15-20',
      price: '₹1,19,999',
    },
  ];

  useEffect(() => {
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
            <span className="text-2xl">✨</span>
            <span className="font-poppins font-semibold">Featured Trips</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-4">
            Trending <span className="text-secondary">Adventures</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked destinations that rotate automatically every 4 seconds
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[500px] rounded-3xl overflow-hidden luxury-shadow-hover">
            {trips.map((trip, index) => (
              <div
                key={index}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

              </div>
            ))}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 z-10"
            >
              <ChevronLeft size={24} className="text-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full luxury-shadow hover:scale-110 transition-all duration-300 z-10"
            >
              <ChevronRight size={24} className="text-primary" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {trips.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 bg-secondary'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                } h-3`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
