import { ArrowRight, Zap } from 'lucide-react';
import { useSiteContent } from '../content/siteContent';

export function SpecialOfferStrip() {
  const { specialOffer } = useSiteContent();

  if (!specialOffer.enabled) return null;

  return (
    <section className="bg-gradient-to-r from-primary via-blue-900 to-primary py-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/20 backdrop-blur-sm p-3 rounded-full border border-secondary/30">
              <Zap className="text-secondary animate-pulse" size={28} />
            </div>
            <div className="text-white">
              <h3 className="text-xl md:text-2xl mb-1">{specialOffer.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{specialOffer.body}</p>
            </div>
          </div>

          <button className="group bg-gradient-to-r from-secondary to-yellow-500 text-primary px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 shadow-2xl hover:scale-110 flex items-center gap-2 whitespace-nowrap">
            <span>{specialOffer.buttonLabel}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
