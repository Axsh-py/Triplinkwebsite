import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { contactInfo } from '../content/contactInfo';
import { defaultSiteContent, useSiteContent } from '../content/siteContent';
import { TripEnquiryButton } from './TripEnquiryButton';
import logo from '../../imports/triplink_logo_transparent.png';

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { heroSlides } = useSiteContent();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trips', path: '/trips' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const destinations = useMemo(() => {
    const enabledSlides = heroSlides.filter((slide) => slide.enabled && slide.title && slide.image);
    return enabledSlides.length > 0 ? enabledSlides : defaultSiteContent.heroSlides;
  }, [heroSlides]);

  useEffect(() => {
    if (activeIndex >= destinations.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, destinations.length]);

  useEffect(() => {
    if (destinations.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [destinations.length]);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
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

      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Triplink" className="h-9 sm:h-11 md:h-12 w-auto max-w-[220px] object-contain drop-shadow-lg" />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-poppins font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                    (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                      ? 'text-secondary'
                      : 'text-white hover:text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a href={`tel:${contactInfo.phoneTel}`} className="text-white hover:text-secondary transition-colors">
                <Phone size={20} />
              </a>
              <Link to="/contact" className="bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-6 py-2 rounded-md font-poppins font-bold text-sm hover:scale-105 transition-all duration-300">
                Book Your Adventure
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="lg:hidden rounded-md border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 rounded-lg border border-white/15 bg-black/70 p-3 shadow-2xl backdrop-blur-md lg:hidden">
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-4 py-3 text-sm font-semibold transition ${
                      (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                        ? 'bg-secondary text-primary'
                        : 'text-white hover:bg-white/10 hover:text-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                <a
                  href={`tel:${contactInfo.phoneTel}`}
                  className="flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white"
                >
                  <Phone size={16} className="text-secondary" />
                  {contactInfo.phoneDisplay}
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md bg-secondary px-4 py-3 text-center text-sm font-bold text-primary"
                >
                  Book Your Adventure
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
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
              <Link to="/trips" className="bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-poppins font-bold text-sm sm:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                Explore Now
              </Link>
              <TripEnquiryButton
                trip={destinations[activeIndex]}
                label="Get Details"
                className="border-2 border-white/40 text-white px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-poppins font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-center text-sm sm:text-base lg:text-lg"
              />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 h-[600px] justify-center">
            {destinations.map((dest, index) => {
              const offset = (index - activeIndex + destinations.length) % destinations.length;
              const isActive = index === activeIndex;

              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 text-left ${
                    isActive
                      ? 'h-48 w-80 opacity-100 scale-105 ring-4 ring-secondary shadow-2xl'
                      : offset === 1
                        ? 'h-32 w-72 opacity-70 hover:opacity-90'
                        : 'h-24 w-64 opacity-50 hover:opacity-70'
                  }`}
                  style={{
                    transform: isActive ? 'translateX(0)' : offset === 1 ? 'translateX(20px)' : 'translateX(40px)',
                  }}
                  aria-label={`Show ${dest.title}`}
                >
                  <ImageWithFallback
                    src={dest.cardImage || dest.image}
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
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 z-20">
        <div className="text-white font-display text-3xl sm:text-4xl lg:text-6xl font-bold opacity-30">
          {String(activeIndex + 1).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
