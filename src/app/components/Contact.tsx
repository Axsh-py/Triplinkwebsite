import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { contactInfo } from '../content/contactInfo';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">Let's Plan Your Journey</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Have questions? Our travel experts are here to help you create the perfect adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20">
            <div className="bg-secondary text-primary p-4 rounded-xl w-fit mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl mb-4">Phone</h3>
            <a href={`tel:${contactInfo.phoneTel}`} className="text-gray-200 hover:text-secondary transition-colors block">
              {contactInfo.phoneDisplay}
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20">
            <div className="bg-secondary text-primary p-4 rounded-xl w-fit mb-6">
              <Mail size={28} />
            </div>
            <h3 className="text-xl mb-4">Email</h3>
            <a href={`mailto:${contactInfo.email}`} className="text-gray-200 hover:text-secondary transition-colors block">
              {contactInfo.email}
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 border border-white/20">
            <div className="bg-secondary text-primary p-4 rounded-xl w-fit mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl mb-4">Instagram</h3>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-secondary transition-colors block">
              triplink_adventures
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-secondary text-primary p-3 rounded-xl">
              <Send size={24} />
            </div>
            <h3 className="text-2xl text-primary">Send us a Message</h3>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="destination" className="block text-gray-700 mb-2">Interested Destination</label>
                <select
                  id="destination"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50 text-gray-900"
                >
                  <option>Select destination</option>
                  <option>Paris, France</option>
                  <option>Bali, Indonesia</option>
                  <option>Dubai, UAE</option>
                  <option>Santorini, Greece</option>
                  <option>Maldives</option>
                  <option>Tokyo, Japan</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Your Message *</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50 resize-none text-gray-900"
                placeholder="Tell us about your dream vacation..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-secondary via-yellow-500 to-secondary bg-size-200 text-primary py-5 rounded-full hover:bg-pos-100 transition-all duration-500 flex items-center justify-center gap-2 shadow-2xl hover:shadow-2xl hover:scale-105"
            >
              <Send size={20} />
              <span>Get Free Travel Consultation</span>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-600">
              <Clock size={20} />
              <div>
                <span className="block text-sm text-gray-500">Business Hours</span>
                <span className="block">Mon-Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
