import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { contactInfo } from '../content/contactInfo';
import logo from '../../imports/triplink_logo_transparent.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trips', path: '/trips' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl luxury-shadow py-3' : 'bg-white/90 backdrop-blur-md py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Triplink" className="h-10 sm:h-12 lg:h-14 w-auto max-w-[190px] xl:max-w-[220px] object-contain" />
          </Link>

          <div className="hidden lg:flex items-center space-x-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                  className={`font-poppins font-medium px-4 py-2.5 rounded-full transition-all duration-300 ${
                  (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${contactInfo.phoneTel}`} className="hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 text-primary hover:bg-gray-100">
              <Phone size={18} className="text-secondary" />
              <span className="text-sm font-poppins font-medium">{contactInfo.phoneDisplay}</span>
            </a>
            <Link to="/contact" className="relative group bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-7 py-3 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden font-poppins font-semibold text-sm shadow-lg">
              <span className="relative z-10">Book Your Adventure</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-white/20 pt-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl transition-all duration-200 font-poppins font-medium ${
                    (link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path))
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <a href={`tel:${contactInfo.phoneTel}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-primary">
                <Phone size={18} className="text-secondary" />
                <span className="font-poppins">{contactInfo.phoneDisplay}</span>
              </a>
              <Link to="/contact" className="block text-center w-full bg-gradient-to-r from-secondary via-yellow-500 to-secondary text-primary px-6 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-poppins font-semibold" onClick={() => setIsMenuOpen(false)}>
                Book Your Adventure
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
