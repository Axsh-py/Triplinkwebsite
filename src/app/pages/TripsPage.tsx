import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Route, Search, Users } from 'lucide-react';
import { useSiteContent } from '../content/siteContent';
import {
  formatTripDateRange,
  formatTripPrice,
  getPublishedTrips,
  tripFilters,
  tripMatchesFilter,
} from '../content/tripUtils';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TripEnquiryButton } from '../components/TripEnquiryButton';

const getValidFilterId = (filterId: string | null) =>
  tripFilters.some((filter) => filter.id === filterId) ? filterId || 'all' : 'all';

export function TripsPage() {
  const content = useSiteContent();
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [activeFilter, setActiveFilter] = useState(() => getValidFilterId(query.get('filter')));
  const [searchTerm, setSearchTerm] = useState(() => query.get('search') || '');

  const allTrips = useMemo(() => getPublishedTrips(content), [content]);

  useEffect(() => {
    setActiveFilter(getValidFilterId(query.get('filter')));
    setSearchTerm(query.get('search') || '');
  }, [query]);

  const visibleTrips = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allTrips.filter((trip) => {
      const matchesFilter = tripMatchesFilter(trip, activeFilter);
      const matchesSearch = !normalizedSearch || [
        trip.name,
        trip.region,
        trip.destinationType,
        trip.tripStyle,
        trip.category,
        trip.route,
        trip.summary,
      ].join(' ').toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, allTrips, searchTerm]);

  const featuredTrip = allTrips[0];
  const heroImage = featuredTrip?.image || content.indiaTrips.bannerImage;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Trips"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-black/40"></div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-secondary/40 bg-secondary/15 px-4 py-2 text-sm font-semibold text-secondary">
              <Route size={16} />
              Curated Triplink Departures
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              Trips for every kind of traveller
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Solo escapes, family vacations, friend groups, local getaways, India circuits, and international adventures in one place.
            </p>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-secondary">{allTrips.length}</div>
                <div className="text-sm text-white/75">Published Trips</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">
                  {new Set(allTrips.map((trip) => trip.destinationType)).size}
                </div>
                <div className="text-sm text-white/75">Trip Types</div>
              </div>
              <div className="col-span-2 rounded-md bg-white/10 p-4">
                <div className="text-sm text-white/70">Next Featured</div>
                <div className="mt-1 text-lg font-semibold">{featuredTrip?.name || 'Coming Soon'}</div>
                <div className="mt-2 text-sm text-white/75">
                  {featuredTrip ? formatTripDateRange(featuredTrip.startDate, featuredTrip.endDate) : 'Fresh departures will appear here'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tripFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="relative block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search trips"
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleTrips.map((trip) => (
            <div
              key={trip.id}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to={`/trips/${trip.id}`} className="block">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={trip.image}
                    alt={trip.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
                    {[trip.destinationType, trip.tripStyle, trip.category].filter(Boolean).map((label) => (
                      <span key={label} className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white">{trip.name}</h2>
                    {trip.region && (
                      <div className="mt-1 flex items-center gap-1 text-sm text-white/85">
                        <MapPin size={14} />
                        {trip.region}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pb-0">
                  <p
                    className="min-h-[48px] text-sm leading-relaxed text-slate-600"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {trip.summary || trip.details}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-slate-400">
                        <CalendarDays size={13} />
                        Duration
                      </div>
                      <div className="font-bold text-slate-900">{trip.duration || 'Flexible'}</div>
                    </div>
                    <div className="rounded-md bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-slate-400">
                        <Users size={13} />
                        Seats
                      </div>
                      <div className="font-bold text-slate-900">{trip.seats || 'Limited'}</div>
                    </div>
                  </div>

                  {trip.route && (
                    <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                      <Route size={16} className="mt-0.5 shrink-0 text-secondary" />
                      <span>{trip.route}</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-5">
                <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase text-slate-400">Starting Price</div>
                    <div className="text-lg font-bold text-primary">{formatTripPrice(trip.price)}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                    >
                      Details
                      <ArrowRight size={16} />
                    </Link>
                    <TripEnquiryButton
                      trip={trip}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-primary transition hover:bg-yellow-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleTrips.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-slate-950">No trips found</h2>
            <p className="mt-2 text-slate-500">Try another filter or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
