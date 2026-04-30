import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../content/siteContent';

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { topBanner } = useSiteContent();

  if (!topBanner.enabled || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-secondary via-yellow-500 to-secondary text-primary py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
        <Sparkles size={20} className="hidden sm:block animate-pulse" />
        <p className="text-sm md:text-base">
          <span className="font-semibold">{topBanner.text}</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 hover:bg-primary/10 p-1 rounded transition-colors duration-200"
          aria-label="Close offer banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
