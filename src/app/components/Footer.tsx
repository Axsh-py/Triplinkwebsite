import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import logo from "../../imports/WhatsApp_Image_2026-04-26_at_8.54.54_PM.jpeg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary to-black text-white relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83z\' fill=\'%23f4b837\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <img src={logo} alt="Triplink" className="h-14 w-auto mb-6" />
            <p className="text-gray-300 mb-8 leading-relaxed font-light max-w-sm">
              Your trusted partner for crafting unforgettable journeys around the world since 1999. <span className="text-secondary font-medium">Experience travel redefined</span>.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/triplink_adventures" target="_blank" rel="noopener noreferrer" className="glass-dark hover:bg-secondary text-white hover:text-primary p-4 rounded-xl transition-all duration-300 hover:scale-110 luxury-shadow">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/triplink_adventures" target="_blank" rel="noopener noreferrer" className="glass-dark hover:bg-secondary text-white hover:text-primary p-4 rounded-xl transition-all duration-300 hover:scale-110 luxury-shadow">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/triplink_adventures" target="_blank" rel="noopener noreferrer" className="glass-dark hover:bg-secondary text-white hover:text-primary p-4 rounded-xl transition-all duration-300 hover:scale-110 luxury-shadow">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/triplink_adventures" target="_blank" rel="noopener noreferrer" className="glass-dark hover:bg-secondary text-white hover:text-primary p-4 rounded-xl transition-all duration-300 hover:scale-110 luxury-shadow">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com/@triplink_adventures" target="_blank" rel="noopener noreferrer" className="glass-dark hover:bg-secondary text-white hover:text-primary p-4 rounded-xl transition-all duration-300 hover:scale-110 luxury-shadow">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl mb-6 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl mb-6 text-secondary">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Flight Booking</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Hotel Reservations</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Car Rentals</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Tour Packages</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Travel Insurance</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">24/7 Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl mb-6 text-secondary">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+918238623437" className="text-gray-300 hover:text-secondary transition-colors">+91 82386 23437</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@triplinktours.com" className="text-gray-300 hover:text-secondary transition-colors">contact@triplinktours.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <a href="https://triplinktours.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">triplinktours.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 font-poppins text-center md:text-left">
              &copy; {currentYear} <span className="text-secondary font-semibold">Triplink</span> - India's Most Loved Travel Community. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-gray-400 font-poppins">
              <a href="#" className="hover:text-secondary transition-colors duration-300">Privacy Policy</a>
              <span className="text-secondary">•</span>
              <a href="#" className="hover:text-secondary transition-colors duration-300">Terms & Conditions</a>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 font-light">
            Crafted with <span className="text-secondary">passion</span> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
