import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from "../../imports/WhatsApp_Image_2026-04-26_at_8.54.54_PM.jpeg";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const destinations = [
    {
      title: 'Leh Ladakh',
      subtitle: 'The Land of High Passes',
      description: 'Experience the breathtaking landscapes and ancient monasteries of the Himalayas',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    },
    {
      title: 'Kashmir Valley',
      subtitle: 'Paradise on Earth',
      description: 'Discover the stunning beauty of Dal Lake, Gulmarg, and traditional houseboats',
      image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=400',
    },
    {
      title: 'Spiti Valley',
      subtitle: 'The Middle Land',
      description: 'Journey through ancient villages and dramatic landscapes of the trans-Himalayan region',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400',
    },
    {
      title: 'Meghalaya',
      subtitle: 'Abode of Clouds',
      description: 'Explore living root bridges, waterfalls, and the wettest place on earth',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400',
    },
    {
      title: 'Rajasthan',
      subtitle: 'Land of Kings',
      description: 'Immerse yourself in royal palaces, desert safaris, and vibrant culture',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920',
      cardImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [destinations.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={dest.image}
              alt={dest.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Triplink" className="h-10 sm:h-12 md:h-14 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-poppins font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-secondary'
                      : 'text-white hover:text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+918238623437" className="text-white hover:text-secondary transition-colors">
                <Phone size={20} />
              </a>
              <Link to="/contact" className="bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-6 py-2 rounded-md font-poppins font-bold text-sm hover:scale-105 transition-all duration-300">
                Book Your Adventure
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left Side - Text Content */}
          <div className="text-white max-w-2xl">
            <div className="mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-secondary/40">
                <MapPin size={14} className="text-secondary sm:hidden" />
                <MapPin size={16} className="text-secondary hidden sm:block" />
                <span className="text-secondary text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider">Featured Destination</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 leading-none text-shadow-lg uppercase tracking-tight">
              {destinations[activeIndex].title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary font-display mb-4 sm:mb-6 italic">
              {destinations[activeIndex].subtitle}
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-light">
              {destinations[activeIndex].description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link to="/services" className="bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-poppins font-bold text-sm sm:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                Explore Now
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/40 text-white px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-poppins font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-center text-sm sm:text-base lg:text-lg"
              >
                Get Details
              </Link>
            </div>
          </div>

          {/* Right Side - Vertical Card Stack */}
          <div className="hidden lg:flex flex-col gap-4 h-[600px] justify-center">
            {destinations.map((dest, index) => {
              const offset = (index - activeIndex + destinations.length) % destinations.length;
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                    isActive
                      ? 'h-48 w-80 opacity-100 scale-105 ring-4 ring-secondary shadow-2xl'
                      : offset === 1
                        ? 'h-32 w-72 opacity-70 hover:opacity-90'
                        : 'h-24 w-64 opacity-50 hover:opacity-70'
                  }`}
                  style={{
                    transform: isActive ? 'translateX(0)' : offset === 1 ? 'translateX(20px)' : 'translateX(40px)',
                  }}
                >
                  <ImageWithFallback
                    src={dest.cardImage}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-display text-lg font-bold mb-1">
                      {dest.title}
                    </h3>
                    {isActive && (
                      <p className="text-gray-300 text-sm font-poppins">
                        {dest.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Counter */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 z-20">
        <div className="text-white font-display text-3xl sm:text-4xl lg:text-6xl font-bold opacity-30">
          {String(activeIndex + 1).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
