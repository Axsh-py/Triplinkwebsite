import { type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Route,
  ShieldCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { useSiteContent } from '../content/siteContent';
import {
  findTripById,
  formatTripDateRange,
  formatTripPrice,
  getPublishedTrips,
} from '../content/tripUtils';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TripEnquiryButton } from '../components/TripEnquiryButton';

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </div>
      <div className="text-sm font-bold text-slate-950">{value}</div>
    </div>
  );
}

export function TripDetailPage() {
  const { tripId } = useParams();
  const content = useSiteContent();
  const trip = findTripById(content, tripId);

  if (!trip) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary">Trip not found</h1>
        <p className="mt-3 text-slate-600">This trip may be hidden, deleted, or not published yet.</p>
        <Link
          to="/trips"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
        >
          <ArrowLeft size={16} />
          Back to trips
        </Link>
      </div>
    );
  }

  const similarTrips = getPublishedTrips(content)
    .filter((item) => item.id !== trip.id)
    .filter((item) => item.destinationType === trip.destinationType || item.tripStyle === trip.tripStyle)
    .slice(0, 3);

  const gallery = [trip.image, ...trip.gallery].filter(Boolean).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative min-h-[620px] overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <ImageWithFallback src={trip.image} alt={trip.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-primary/65 to-black/35"></div>
        </div>

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/trips"
            className="mb-auto mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-primary"
          >
            <ArrowLeft size={16} />
            All Trips
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {[trip.destinationType, trip.tripStyle, trip.category, trip.difficulty].filter(Boolean).map((label) => (
                  <span key={label} className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                    {label}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                {trip.name}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
                {trip.summary || trip.details}
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="text-sm text-white/70">Starting from</div>
              <div className="mt-1 text-3xl font-bold text-secondary">{formatTripPrice(trip.price)}</div>
              <div className="mt-4 grid gap-3 text-sm text-white/85">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-secondary" />
                  {formatTripDateRange(trip.startDate, trip.endDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-secondary" />
                  {trip.startTime || 'Time on confirmation'}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-secondary" />
                  {trip.pickupPoint || 'Pickup shared after booking'}
                </div>
              </div>
              <TripEnquiryButton
                trip={trip}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-primary transition hover:bg-yellow-400"
              >
                <Phone size={16} />
                Enquire Now
              </TripEnquiryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoTile icon={<CalendarDays size={15} />} label="Duration" value={trip.duration || 'Flexible'} />
          <InfoTile icon={<Users size={15} />} label="Seats" value={trip.seats || 'Limited'} />
          <InfoTile icon={<ShieldCheck size={15} />} label="Lead" value={trip.leaderName || 'Triplink Lead'} />
          <InfoTile icon={<Route size={15} />} label="Route" value={trip.region || trip.destinationType} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-primary">Trip Summary</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{trip.details}</p>
              {trip.route && (
                <div className="mt-5 rounded-md bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
                    <Route size={18} className="text-secondary" />
                    Route
                  </div>
                  <p className="text-sm text-slate-700">{trip.route}</p>
                </div>
              )}
            </div>

            {trip.highlights.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-primary">Highlights</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                      <CheckCircle size={17} className="mt-0.5 shrink-0 text-secondary" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-primary">Itinerary</h2>
              <div className="mt-6 space-y-4">
                {trip.itinerary.map((item, index) => (
                  <div key={`${item.day}-${index}`} className="grid gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-[96px_minmax(0,1fr)]">
                    <div className="h-fit rounded-full bg-primary px-3 py-2 text-center text-sm font-bold text-white">
                      {item.day}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-primary">Inclusions</h2>
                <div className="mt-4 space-y-3">
                  {trip.inclusions.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={17} className="mt-0.5 shrink-0 text-green-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-primary">Exclusions</h2>
                <div className="mt-4 space-y-3">
                  {trip.exclusions.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <XCircle size={17} className="mt-0.5 shrink-0 text-red-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-primary">Gallery</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {gallery.map((image, index) => (
                    <ImageWithFallback
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${trip.name} ${index + 1}`}
                      className="h-56 w-full rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="sticky top-28 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-primary">Trip Lead</h2>
              <div className="mt-4 rounded-md bg-slate-50 p-4">
                <div className="text-lg font-bold text-slate-950">{trip.leaderName || 'Triplink Travel Captain'}</div>
                <div className="mt-1 text-sm text-slate-500">{trip.leaderRole || 'Trip Lead'}</div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-secondary" />
                  {trip.pickupPoint || 'Pickup point shared after booking'}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-secondary" />
                  {trip.startTime || 'Time on confirmation'}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-secondary" />
                  {trip.seats || 'Limited seats'}
                </div>
              </div>
              <TripEnquiryButton
                trip={trip}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                Ask for this trip
              </TripEnquiryButton>
            </div>

            {similarTrips.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-primary">Similar Trips</h2>
                <div className="mt-4 space-y-4">
                  {similarTrips.map((item) => (
                    <Link key={item.id} to={`/trips/${item.id}`} className="flex gap-3 rounded-md p-2 transition hover:bg-slate-50">
                      <ImageWithFallback src={item.image} alt={item.name} className="h-16 w-20 rounded-md object-cover" />
                      <div>
                        <div className="font-bold text-slate-950">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{formatTripPrice(item.price)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
