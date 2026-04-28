import { Plane, Hotel, Car, Compass, Shield, Headphones } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Plane size={32} />,
      title: 'Flight Booking',
      description: 'Book domestic and international flights at competitive prices with 24/7 customer support.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Hotel size={32} />,
      title: 'Hotel Reservations',
      description: 'Choose from thousands of hotels worldwide, from budget to luxury accommodations.',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Car size={32} />,
      title: 'Car Rentals',
      description: 'Rent vehicles at your destination for ultimate flexibility and convenience.',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <Compass size={32} />,
      title: 'Tour Packages',
      description: 'Customized tour packages for families, couples, and solo travelers.',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: <Shield size={32} />,
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance to protect your journey and peace of mind.',
      gradient: 'from-red-500 to-red-600',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you throughout your journey.',
      gradient: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-yellow-500/10 text-primary px-6 py-3 rounded-full mb-6 border border-secondary/20">
            <span className="text-2xl">✨</span>
            <span>Complete Travel Solutions</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-primary mb-6">
            Everything You Need for <span className="text-secondary">Perfect Trips</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From planning to execution, we handle every detail so you can focus on creating memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl text-primary mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
