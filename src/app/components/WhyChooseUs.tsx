import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function WhyChooseUs() {
  const features = [
    {
      title: 'TRANSPARENT PRICING',
      description: 'Enjoy over 60 handpicked tours designed to match your requirements and needs',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    },
    {
      title: 'CURATED ROUTES',
      description: 'Exclusive packages with the most affordable itineraries and experiences',
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400',
    },
    {
      title: 'TAILORED CORPORATE PACKAGES',
      description: 'Tailored corporate packages to suit your business needs',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400',
    },
    {
      title: 'SOCIALLY RESPONSIBLE TRAVEL COMMUNITY',
      description: 'Connect and share your love for travel with the community',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(244,184,55,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,58,95,0.1),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-4 uppercase tracking-wide">
            Our Unique Selling Propositions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden luxury-shadow hover:luxury-shadow-hover transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative flex justify-center pt-8 pb-4">
                <div className="w-24 h-24 rounded-full border-4 border-secondary overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-secondary py-3 px-4">
                <h3 className="font-poppins font-bold text-primary text-center text-sm uppercase tracking-wide">
                  {feature.title}
                </h3>
              </div>

              <div className="bg-primary py-6 px-5">
                <p className="text-white text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary via-blue-900 to-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl text-white mb-6">
              Ready to Start Your <span className="text-secondary">Adventure?</span>
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join 50,000+ happy travelers who have experienced the world with Triplink
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/trips"
                className="bg-gradient-to-r from-secondary via-yellow-500 to-secondary bg-size-200 text-primary px-10 py-5 rounded-full hover:bg-pos-100 transition-all duration-500 shadow-2xl hover:scale-105 inline-flex items-center"
              >
                Explore All Trips
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-10 py-5 rounded-full hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center"
              >
                Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
