import { Plane, Hotel, Car, Compass, Shield, Headphones, CheckCircle, Star, Users, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ServicesPage() {
  const services = [
    {
      icon: <Plane size={48} />,
      title: 'Flight Booking',
      description: 'Book domestic and international flights at competitive prices',
      features: [
        'Best fare guaranteed across all airlines',
        '24/7 booking support',
        'Easy cancellation & modifications',
        'Group booking discounts available',
        'Flight status updates via SMS/Email'
      ],
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Hotel size={48} />,
      title: 'Hotel Reservations',
      description: 'Choose from thousands of hotels worldwide',
      features: [
        'Budget to luxury accommodations',
        'Verified hotel reviews',
        'Flexible check-in/check-out',
        'Special rates for extended stays',
        'Complimentary breakfast options'
      ],
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Car size={48} />,
      title: 'Car Rentals',
      description: 'Rent vehicles at your destination',
      features: [
        'Wide range of vehicles available',
        'Affordable daily/weekly rates',
        'GPS navigation included',
        'Airport pickup/drop facility',
        'Well-maintained & sanitized cars'
      ],
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <Compass size={48} />,
      title: 'Tour Packages',
      description: 'Customized packages for every traveler',
      features: [
        'Family, couples & solo packages',
        'Adventure & leisure options',
        'Professional tour guides',
        'All-inclusive pricing',
        'Customizable itineraries'
      ],
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: <Shield size={48} />,
      title: 'Travel Insurance',
      description: 'Comprehensive coverage for peace of mind',
      features: [
        'Medical emergency coverage',
        'Trip cancellation protection',
        'Lost baggage compensation',
        'Emergency evacuation',
        'COVID-19 coverage included'
      ],
      gradient: 'from-red-500 to-red-600',
    },
    {
      icon: <Headphones size={48} />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      features: [
        'Dedicated support team',
        'Multi-language assistance',
        'Emergency helpline',
        'Live chat support',
        'Email & phone support'
      ],
      gradient: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-blue-900 to-primary py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920"
            alt="Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm text-secondary px-6 py-3 rounded-full mb-6 border border-secondary/30">
            <span>Our Services</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6">
            Complete Travel Solutions
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            From planning to execution, we handle every detail of your journey with professional expertise and care
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl text-primary mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Why Choose <span className="text-secondary">Triplink Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go above and beyond to ensure your travel experience is seamless and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-4 sm:p-5 md:p-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4 sm:mb-5 md:mb-6">
                <Award size={32} className="sm:hidden" />
                <Award size={40} className="hidden sm:block" />
              </div>
              <h3 className="text-xl sm:text-2xl text-primary mb-2 sm:mb-3">25+ Years Experience</h3>
              <p className="text-gray-600">
                Trusted by 50,000+ travelers worldwide with proven track record
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-4 sm:p-5 md:p-6 rounded-full bg-gradient-to-br from-secondary to-yellow-500 text-primary mb-4 sm:mb-5 md:mb-6">
                <Star size={32} className="sm:hidden" />
                <Star size={40} className="hidden sm:block" />
              </div>
              <h3 className="text-xl sm:text-2xl text-primary mb-2 sm:mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We match any competitor's price and offer exclusive deals
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-4 sm:p-5 md:p-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white mb-4 sm:mb-5 md:mb-6">
                <Users size={32} className="sm:hidden" />
                <Users size={40} className="hidden sm:block" />
              </div>
              <h3 className="text-xl sm:text-2xl text-primary mb-2 sm:mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Dedicated travel experts available 24/7 to assist you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-blue-900 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8">
            Let our experts help you plan the perfect trip
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <button className="bg-gradient-to-r from-secondary to-yellow-500 text-primary px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Get Free Consultation
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full hover:bg-white hover:text-primary transition-all duration-300 text-sm sm:text-base">
              Call: +91 82386 23437
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
