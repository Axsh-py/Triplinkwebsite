import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Gift, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TripEnquiryButton } from './TripEnquiryButton';

export function CampaignBanners() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full mb-8 border border-secondary/20 luxury-shadow">
            <Gift size={22} className="text-secondary" />
            <span className="font-poppins font-semibold text-primary">Exclusive Offers</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-6 leading-tight">
            Limited <span className="italic text-secondary">Luxury</span> Deals
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Seize these extraordinary opportunities for unforgettable journeys
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-primary via-blue-900 to-primary rounded-3xl overflow-hidden luxury-shadow-hover p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>

          <div className="relative space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4 w-fit border border-white/30">
                  <Sparkles size={18} className="text-yellow-300" />
                  <span className="text-sm">Running Campaign</span>
                </div>

                <h3 className="font-display text-4xl md:text-6xl text-white mb-4 leading-tight text-shadow-lg">
                  Summer Adventure Sale 2026
                </h3>
                <p className="text-xl text-white/90 mb-6 leading-relaxed font-light">
                  Save up to <span className="font-display text-5xl font-bold text-secondary">40% OFF</span> on all Himalayan expeditions!
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-5 py-3">
                    <div className="text-xs text-white/80 mb-1">Valid Till</div>
                    <div className="text-lg text-white flex items-center gap-2">
                      <Clock size={16} />
                      May 31, 2026
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-5 py-3">
                    <div className="text-xs text-white/80 mb-1">Destinations</div>
                    <div className="text-lg text-white">15+ Locations</div>
                  </div>
                </div>
              </div>

              <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                  alt="Summer Campaign"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-primary px-5 py-2 rounded-full shadow-2xl animate-pulse">
                  <span className="text-xl font-bold">40% OFF</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-yellow-300" size={20} />
                  <span className="text-yellow-300 text-xs uppercase tracking-wide">Coming Soon</span>
                </div>
                <h4 className="text-xl text-white mb-4">New Trips - June 2026</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin size={14} className="text-yellow-300" />
                    <span>Spiti Valley Circuit - June 15</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin size={14} className="text-yellow-300" />
                    <span>Meghalaya Bridges - June 20</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin size={14} className="text-yellow-300" />
                    <span>Andaman Islands - June 25</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-yellow-300" size={20} />
                  <span className="text-yellow-300 text-xs uppercase tracking-wide">Monsoon Special</span>
                </div>
                <h4 className="text-xl text-white mb-4">Monsoon Magic from Rs. 7,999</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span>Kerala, Coorg, Munnar</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span>Goa, Lonavala, Mahabaleshwar</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span>Udaipur, Mount Abu</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="text-yellow-300" size={20} />
                  <span className="text-yellow-300 text-xs uppercase tracking-wide">This Month</span>
                </div>
                <h4 className="text-xl text-white mb-4">Weekend Getaways Rs. 4,999</h4>
                <div className="flex flex-wrap gap-2">
                  {['Agra', 'Jaipur', 'Shimla', 'Mussoorie', 'Nainital', 'Udaipur'].map((city, index) => (
                    <span key={index} className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <TripEnquiryButton
                trip={{
                  title: 'Summer Adventure Sale 2026',
                  price: 'Up to 40% OFF',
                  duration: 'Valid till May 31, 2026',
                  route: 'Himalayan expeditions and seasonal Triplink offers',
                }}
                className="group relative bg-gradient-to-r from-secondary via-yellow-500 to-yellow-400 text-primary px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-500 luxury-shadow hover:scale-110 flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 font-poppins font-bold text-lg">Claim Your Discount</span>
                <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 animate-shimmer"></div>
              </TripEnquiryButton>
              <Link
                to="/trips"
                className="glass-dark border-2 border-white/40 text-white px-10 py-4 rounded-full hover:bg-white hover:text-primary hover:border-white transition-all duration-500 font-poppins font-semibold"
              >
                View All Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
