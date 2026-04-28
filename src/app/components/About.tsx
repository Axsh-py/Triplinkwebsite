import { Link } from 'react-router-dom';
import { Award, Globe, Heart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const stats = [
    { icon: <Globe size={40} />, value: '150+', label: 'Destinations' },
    { icon: <Award size={40} />, value: '25+', label: 'Years Experience' },
    { icon: <Heart size={40} />, value: '50K+', label: 'Happy Customers' },
    { icon: <TrendingUp size={40} />, value: '98%', label: 'Satisfaction Rate' },
  ];

  const features = [
    'Expert Travel Consultation',
    'Best Price Guarantee',
    'Flexible Payment Options',
    '24/7 Customer Support',
    'Customized Itineraries',
    'Secure Online Booking',
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600"
                      alt="Travel 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600"
                      alt="Travel 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600"
                      alt="Travel 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
                      alt="Travel 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
              About Triplink
            </div>
            <h2 className="text-4xl md:text-5xl text-primary mb-6">
              Creating Unforgettable Travel Experiences
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              For over 25 years, Triplink has been the premier choice for travelers seeking authentic, personalized experiences. We specialize in crafting journeys that combine adventure, luxury, and cultural immersion.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of expert travel consultants works tirelessly to ensure every detail of your trip is perfect. From flight bookings to accommodation, tours, and beyond, we handle everything so you can focus on making memories.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group bg-gradient-to-r from-secondary via-yellow-500 to-secondary bg-size-200 text-primary px-10 py-5 rounded-full hover:bg-pos-100 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Discover Our Story</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className="text-secondary mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
