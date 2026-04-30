import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  Download,
  Eye,
  FileJson,
  Home,
  ImagePlus,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  ADMIN_PASSCODE,
  createContentId,
  exportSiteContent,
  importSiteContent,
  resetSiteContent,
  saveSiteContent,
  type FeaturedTrip,
  type HeroSlide,
  type SiteContent,
  type TripCard,
  type TripSection,
  useSiteContent,
} from '../content/siteContent';

type AdminTab = 'dashboard' | 'banners' | 'hero' | 'featured' | 'india' | 'international' | 'data';
type TripSectionKey = 'indiaTrips' | 'internationalTrips';

const SESSION_KEY = 'triplink.admin.session.v1';

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'banners', label: 'Banners' },
  { id: 'hero', label: 'Hero' },
  { id: 'featured', label: 'Featured' },
  { id: 'india', label: 'India Trips' },
  { id: 'international', label: 'International' },
  { id: 'data', label: 'Data' },
];

const blankHeroSlide = (): HeroSlide => ({
  id: createContentId('hero'),
  title: 'New Destination',
  subtitle: 'Short subtitle',
  description: 'Add a clear destination description.',
  image: '',
  cardImage: '',
  enabled: true,
});

const blankFeaturedTrip = (): FeaturedTrip => ({
  id: createContentId('featured'),
  title: 'New Featured Trip',
  description: 'Add trip highlights, inclusions, or campaign copy.',
  image: '',
  duration: '5 Days',
  groupSize: '10-15',
  price: 'Rs. 49,999',
  enabled: true,
});

const blankTrip = (): TripCard => ({
  id: createContentId('trip'),
  name: 'New Trip',
  price: '9,999',
  duration: '4 Days',
  details: 'Add itinerary highlights or short trip details.',
  summary: 'Add a short customer-facing summary.',
  destinationType: 'India',
  tripStyle: 'Friends',
  category: 'Adventure',
  region: '',
  route: '',
  leaderName: 'Triplink Travel Captain',
  leaderRole: 'Trip Lead',
  startDate: '',
  endDate: '',
  startTime: '',
  pickupPoint: '',
  seats: '12-20',
  difficulty: 'Moderate',
  highlights: [],
  itinerary: [
    {
      day: 'Day 1',
      title: 'Arrival and orientation',
      details: 'Add the first day plan.',
    },
  ],
  inclusions: [],
  exclusions: [],
  gallery: [],
  image: '',
  enabled: true,
});

const listToText = (items: string[]) => items.join('\n');

const textToList = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const itineraryToText = (items: TripCard['itinerary']) =>
  items.map((item) => `${item.day} | ${item.title} | ${item.details}`).join('\n');

const textToItinerary = (value: string): TripCard['itinerary'] =>
  value
    .split('\n')
    .map((line, index) => {
      const [day, title, ...details] = line.split('|').map((item) => item.trim());

      return {
        day: day || `Day ${index + 1}`,
        title: title || '',
        details: details.join(' | '),
      };
    })
    .filter((item) => item.title || item.details);

function getStoredSession() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SESSION_KEY) === 'true';
}

function setStoredSession(value: boolean) {
  if (typeof window === 'undefined') return;

  if (value) {
    window.localStorage.setItem(SESSION_KEY, 'true');
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function moveArrayItem<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;

  const nextItems = [...items];
  const item = nextItems[index];
  nextItems[index] = nextItems[nextIndex];
  nextItems[nextIndex] = item;
  return nextItems;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
    />
  );
}

function TextAreaInput({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
    />
  );
}

function ToggleField({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isReading, setIsReading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;

    setIsReading(true);
    try {
      onChange(await readImageFile(file));
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_160px]">
      <Field label={label}>
        <TextInput value={value} onChange={onChange} placeholder="https://..." />
      </Field>
      <div className="flex flex-col gap-2">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Upload
        </span>
        <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          <ImagePlus size={16} />
          {isReading ? 'Loading' : 'Image'}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
      </div>
      {value && (
        <div className="lg:col-span-2">
          <img
            src={value}
            alt=""
            className="h-32 w-full rounded-md border border-slate-200 object-cover"
          />
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

function IconButton({
  children,
  onClick,
  variant = 'default',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'muted' | 'danger';
  type?: 'button' | 'submit';
}) {
  const styles = {
    default: 'bg-primary text-white hover:bg-primary/90',
    muted: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export function AdminPage() {
  const savedContent = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(savedContent);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredSession);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [status, setStatus] = useState('');
  const [jsonText, setJsonText] = useState('');

  useEffect(() => {
    setDraft(savedContent);
  }, [savedContent]);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(savedContent),
    [draft, savedContent],
  );

  const stats = useMemo(() => {
    const indiaPublished = draft.indiaTrips.trips.filter((trip) => trip.enabled).length;
    const internationalPublished = draft.internationalTrips.trips.filter((trip) => trip.enabled).length;
    const heroPublished = draft.heroSlides.filter((slide) => slide.enabled).length;
    const featuredPublished = draft.featuredTrips.filter((trip) => trip.enabled).length;

    return [
      { label: 'Hero Slides', value: heroPublished },
      { label: 'Featured Trips', value: featuredPublished },
      { label: 'India Trips', value: indiaPublished },
      { label: 'International', value: internationalPublished },
    ];
  }, [draft]);

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passcode === ADMIN_PASSCODE) {
      setStoredSession(true);
      setIsAuthenticated(true);
      setLoginError('');
      setPasscode('');
      return;
    }

    setLoginError('Invalid admin passcode');
  };

  const logout = () => {
    setStoredSession(false);
    setIsAuthenticated(false);
  };

  const saveDraft = () => {
    try {
      saveSiteContent(draft);
      setStatus('Saved');
    } catch {
      setStatus('Could not save. Uploaded images may be too large for browser storage.');
    }
  };

  const resetDraft = () => {
    setDraft(savedContent);
    setStatus('Draft reset');
  };

  const restoreDefaults = () => {
    if (!window.confirm('Restore default content?')) return;
    resetSiteContent();
    setStatus('Defaults restored');
  };

  const updateTripSection = (sectionKey: TripSectionKey, patch: Partial<TripSection>) => {
    setDraft((previous) => ({
      ...previous,
      [sectionKey]: {
        ...previous[sectionKey],
        ...patch,
      },
    }));
  };

  const updateTrip = (sectionKey: TripSectionKey, tripId: string, patch: Partial<TripCard>) => {
    setDraft((previous) => ({
      ...previous,
      [sectionKey]: {
        ...previous[sectionKey],
        trips: previous[sectionKey].trips.map((trip) =>
          trip.id === tripId ? { ...trip, ...patch } : trip,
        ),
      },
    }));
  };

  const addTrip = (sectionKey: TripSectionKey) => {
    setDraft((previous) => ({
      ...previous,
      [sectionKey]: {
        ...previous[sectionKey],
        trips: [...previous[sectionKey].trips, blankTrip()],
      },
    }));
  };

  const deleteTrip = (sectionKey: TripSectionKey, tripId: string) => {
    setDraft((previous) => ({
      ...previous,
      [sectionKey]: {
        ...previous[sectionKey],
        trips: previous[sectionKey].trips.filter((trip) => trip.id !== tripId),
      },
    }));
  };

  const moveTrip = (sectionKey: TripSectionKey, index: number, direction: -1 | 1) => {
    setDraft((previous) => ({
      ...previous,
      [sectionKey]: {
        ...previous[sectionKey],
        trips: moveArrayItem(previous[sectionKey].trips, index, direction),
      },
    }));
  };

  const updateHeroSlide = (slideId: string, patch: Partial<HeroSlide>) => {
    setDraft((previous) => ({
      ...previous,
      heroSlides: previous.heroSlides.map((slide) =>
        slide.id === slideId ? { ...slide, ...patch } : slide,
      ),
    }));
  };

  const updateFeaturedTrip = (tripId: string, patch: Partial<FeaturedTrip>) => {
    setDraft((previous) => ({
      ...previous,
      featuredTrips: previous.featuredTrips.map((trip) =>
        trip.id === tripId ? { ...trip, ...patch } : trip,
      ),
    }));
  };

  const importJson = () => {
    try {
      importSiteContent(jsonText);
      setStatus('Imported');
      setJsonText('');
    } catch {
      setStatus('Invalid JSON');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
          <form onSubmit={login} className="w-full rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-2xl">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white">
                <FileJson size={22} />
              </div>
              <h1 className="text-2xl font-bold">Triplink Admin</h1>
              <p className="mt-1 text-sm text-slate-500">Private content panel</p>
            </div>

            <Field label="Admin Passcode">
              <input
                type="password"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </Field>

            {loginError && <p className="mt-3 text-sm font-medium text-red-600">{loginError}</p>}

            <button
              type="submit"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              <FileJson size={18} />
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div>
      <SectionTitle title="Dashboard" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            <div className="mt-2 text-3xl font-bold text-slate-950">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-base font-bold text-slate-950">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <IconButton onClick={() => setActiveTab('hero')} variant="muted">
            <Eye size={16} />
            Hero
          </IconButton>
          <IconButton onClick={() => setActiveTab('india')} variant="muted">
            <Home size={16} />
            India Trips
          </IconButton>
          <IconButton onClick={() => setActiveTab('international')} variant="muted">
            <Home size={16} />
            International
          </IconButton>
          <IconButton onClick={saveDraft}>
            <Save size={16} />
            Save
          </IconButton>
        </div>
      </div>
    </div>
  );

  const renderBanners = () => (
    <div>
      <SectionTitle title="Banners" />
      <div className="grid gap-5">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-slate-950">Top Banner</h3>
            <ToggleField
              checked={draft.topBanner.enabled}
              onChange={(enabled) => setDraft((previous) => ({
                ...previous,
                topBanner: { ...previous.topBanner, enabled },
              }))}
              label={draft.topBanner.enabled ? 'Published' : 'Hidden'}
            />
          </div>
          <Field label="Text">
            <TextInput
              value={draft.topBanner.text}
              onChange={(text) => setDraft((previous) => ({
                ...previous,
                topBanner: { ...previous.topBanner, text },
              }))}
            />
          </Field>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-slate-950">Flash Offer</h3>
            <ToggleField
              checked={draft.specialOffer.enabled}
              onChange={(enabled) => setDraft((previous) => ({
                ...previous,
                specialOffer: { ...previous.specialOffer, enabled },
              }))}
              label={draft.specialOffer.enabled ? 'Published' : 'Hidden'}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={draft.specialOffer.title}
                onChange={(title) => setDraft((previous) => ({
                  ...previous,
                  specialOffer: { ...previous.specialOffer, title },
                }))}
              />
            </Field>
            <Field label="Button Label">
              <TextInput
                value={draft.specialOffer.buttonLabel}
                onChange={(buttonLabel) => setDraft((previous) => ({
                  ...previous,
                  specialOffer: { ...previous.specialOffer, buttonLabel },
                }))}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Body">
                <TextAreaInput
                  value={draft.specialOffer.body}
                  onChange={(body) => setDraft((previous) => ({
                    ...previous,
                    specialOffer: { ...previous.specialOffer, body },
                  }))}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHero = () => (
    <div>
      <SectionTitle
        title="Hero Slides"
        actions={(
          <IconButton
            onClick={() => setDraft((previous) => ({
              ...previous,
              heroSlides: [...previous.heroSlides, blankHeroSlide()],
            }))}
          >
            <Plus size={16} />
            Add Slide
          </IconButton>
        )}
      />
      <div className="grid gap-5">
        {draft.heroSlides.map((slide, index) => (
          <div key={slide.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-slate-950">{slide.title || `Slide ${index + 1}`}</h3>
              <div className="flex flex-wrap gap-2">
                <ToggleField
                  checked={slide.enabled}
                  onChange={(enabled) => updateHeroSlide(slide.id, { enabled })}
                  label={slide.enabled ? 'Published' : 'Hidden'}
                />
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    heroSlides: moveArrayItem(previous.heroSlides, index, -1),
                  }))}
                  variant="muted"
                >
                  <ArrowUp size={16} />
                </IconButton>
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    heroSlides: moveArrayItem(previous.heroSlides, index, 1),
                  }))}
                  variant="muted"
                >
                  <ArrowDown size={16} />
                </IconButton>
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    heroSlides: previous.heroSlides.filter((item) => item.id !== slide.id),
                  }))}
                  variant="danger"
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title">
                <TextInput value={slide.title} onChange={(title) => updateHeroSlide(slide.id, { title })} />
              </Field>
              <Field label="Subtitle">
                <TextInput value={slide.subtitle} onChange={(subtitle) => updateHeroSlide(slide.id, { subtitle })} />
              </Field>
              <div className="md:col-span-2">
                <Field label="Description">
                  <TextAreaInput value={slide.description} onChange={(description) => updateHeroSlide(slide.id, { description })} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <ImageField label="Background Image" value={slide.image} onChange={(image) => updateHeroSlide(slide.id, { image })} />
              </div>
              <div className="md:col-span-2">
                <ImageField label="Card Image" value={slide.cardImage} onChange={(cardImage) => updateHeroSlide(slide.id, { cardImage })} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeatured = () => (
    <div>
      <SectionTitle
        title="Featured Trips"
        actions={(
          <IconButton
            onClick={() => setDraft((previous) => ({
              ...previous,
              featuredTrips: [...previous.featuredTrips, blankFeaturedTrip()],
            }))}
          >
            <Plus size={16} />
            Add Featured
          </IconButton>
        )}
      />
      <div className="grid gap-5">
        {draft.featuredTrips.map((trip, index) => (
          <div key={trip.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-slate-950">{trip.title || `Featured ${index + 1}`}</h3>
              <div className="flex flex-wrap gap-2">
                <ToggleField
                  checked={trip.enabled}
                  onChange={(enabled) => updateFeaturedTrip(trip.id, { enabled })}
                  label={trip.enabled ? 'Published' : 'Hidden'}
                />
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    featuredTrips: moveArrayItem(previous.featuredTrips, index, -1),
                  }))}
                  variant="muted"
                >
                  <ArrowUp size={16} />
                </IconButton>
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    featuredTrips: moveArrayItem(previous.featuredTrips, index, 1),
                  }))}
                  variant="muted"
                >
                  <ArrowDown size={16} />
                </IconButton>
                <IconButton
                  onClick={() => setDraft((previous) => ({
                    ...previous,
                    featuredTrips: previous.featuredTrips.filter((item) => item.id !== trip.id),
                  }))}
                  variant="danger"
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Field label="Title">
                  <TextInput value={trip.title} onChange={(title) => updateFeaturedTrip(trip.id, { title })} />
                </Field>
              </div>
              <Field label="Price">
                <TextInput value={trip.price} onChange={(price) => updateFeaturedTrip(trip.id, { price })} />
              </Field>
              <Field label="Duration">
                <TextInput value={trip.duration} onChange={(duration) => updateFeaturedTrip(trip.id, { duration })} />
              </Field>
              <Field label="Group Size">
                <TextInput value={trip.groupSize} onChange={(groupSize) => updateFeaturedTrip(trip.id, { groupSize })} />
              </Field>
              <div className="md:col-span-3">
                <Field label="Description">
                  <TextAreaInput value={trip.description} onChange={(description) => updateFeaturedTrip(trip.id, { description })} />
                </Field>
              </div>
              <div className="md:col-span-3">
                <ImageField label="Image" value={trip.image} onChange={(image) => updateFeaturedTrip(trip.id, { image })} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTripSection = (sectionKey: TripSectionKey, title: string) => {
    const section = draft[sectionKey];

    return (
      <div>
        <SectionTitle
          title={title}
          actions={(
            <IconButton onClick={() => addTrip(sectionKey)}>
              <Plus size={16} />
              Add Trip
            </IconButton>
          )}
        />

        <div className="mb-5 rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-bold text-slate-950">Section</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput value={section.title} onChange={(value) => updateTripSection(sectionKey, { title: value })} />
            </Field>
            <Field label="Subtitle">
              <TextInput value={section.subtitle} onChange={(subtitle) => updateTripSection(sectionKey, { subtitle })} />
            </Field>
            <Field label="Button Label">
              <TextInput value={section.ctaLabel} onChange={(ctaLabel) => updateTripSection(sectionKey, { ctaLabel })} />
            </Field>
            <Field label="Banner Video URL">
              <TextInput value={section.bannerVideo} onChange={(bannerVideo) => updateTripSection(sectionKey, { bannerVideo })} />
            </Field>
            <div className="md:col-span-2">
              <ImageField label="Banner Image" value={section.bannerImage} onChange={(bannerImage) => updateTripSection(sectionKey, { bannerImage })} />
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {section.trips.map((trip, index) => (
            <div key={trip.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-bold text-slate-950">{trip.name || `Trip ${index + 1}`}</h3>
                <div className="flex flex-wrap gap-2">
                  <ToggleField
                    checked={trip.enabled}
                    onChange={(enabled) => updateTrip(sectionKey, trip.id, { enabled })}
                    label={trip.enabled ? 'Published' : 'Hidden'}
                  />
                  <IconButton onClick={() => moveTrip(sectionKey, index, -1)} variant="muted">
                    <ArrowUp size={16} />
                  </IconButton>
                  <IconButton onClick={() => moveTrip(sectionKey, index, 1)} variant="muted">
                    <ArrowDown size={16} />
                  </IconButton>
                  <IconButton onClick={() => deleteTrip(sectionKey, trip.id)} variant="danger">
                    <Trash2 size={16} />
                  </IconButton>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Name">
                  <TextInput value={trip.name} onChange={(name) => updateTrip(sectionKey, trip.id, { name })} />
                </Field>
                <Field label="Price">
                  <TextInput value={trip.price} onChange={(price) => updateTrip(sectionKey, trip.id, { price })} />
                </Field>
                <Field label="Duration">
                  <TextInput value={trip.duration} onChange={(duration) => updateTrip(sectionKey, trip.id, { duration })} />
                </Field>
                <Field label="Trip Type">
                  <TextInput value={trip.tripStyle} onChange={(tripStyle) => updateTrip(sectionKey, trip.id, { tripStyle })} placeholder="Solo, Family, Friends, Couples" />
                </Field>
                <Field label="Destination Type">
                  <TextInput value={trip.destinationType} onChange={(destinationType) => updateTrip(sectionKey, trip.id, { destinationType })} placeholder="India, International, Local" />
                </Field>
                <Field label="Category">
                  <TextInput value={trip.category} onChange={(category) => updateTrip(sectionKey, trip.id, { category })} placeholder="Adventure, Weekend, Honeymoon" />
                </Field>
                <Field label="Region / State">
                  <TextInput value={trip.region} onChange={(region) => updateTrip(sectionKey, trip.id, { region })} />
                </Field>
                <Field label="Start Date">
                  <TextInput value={trip.startDate} onChange={(startDate) => updateTrip(sectionKey, trip.id, { startDate })} placeholder="2026-06-15" />
                </Field>
                <Field label="End Date">
                  <TextInput value={trip.endDate} onChange={(endDate) => updateTrip(sectionKey, trip.id, { endDate })} placeholder="2026-06-20" />
                </Field>
                <Field label="Start Time">
                  <TextInput value={trip.startTime} onChange={(startTime) => updateTrip(sectionKey, trip.id, { startTime })} placeholder="09:00 AM" />
                </Field>
                <Field label="Pickup Point">
                  <TextInput value={trip.pickupPoint} onChange={(pickupPoint) => updateTrip(sectionKey, trip.id, { pickupPoint })} />
                </Field>
                <Field label="Seats">
                  <TextInput value={trip.seats} onChange={(seats) => updateTrip(sectionKey, trip.id, { seats })} />
                </Field>
                <Field label="Difficulty">
                  <TextInput value={trip.difficulty} onChange={(difficulty) => updateTrip(sectionKey, trip.id, { difficulty })} />
                </Field>
                <Field label="Trip Lead">
                  <TextInput value={trip.leaderName} onChange={(leaderName) => updateTrip(sectionKey, trip.id, { leaderName })} />
                </Field>
                <Field label="Lead Role">
                  <TextInput value={trip.leaderRole} onChange={(leaderRole) => updateTrip(sectionKey, trip.id, { leaderRole })} />
                </Field>
                <div className="md:col-span-3">
                  <Field label="Summary">
                    <TextAreaInput rows={3} value={trip.summary} onChange={(summary) => updateTrip(sectionKey, trip.id, { summary })} />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Details">
                    <TextAreaInput rows={4} value={trip.details} onChange={(details) => updateTrip(sectionKey, trip.id, { details })} />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Route">
                    <TextAreaInput rows={2} value={trip.route} onChange={(route) => updateTrip(sectionKey, trip.id, { route })} placeholder="Delhi - Manali - Solang - Delhi" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Highlights">
                    <TextAreaInput rows={4} value={listToText(trip.highlights)} onChange={(value) => updateTrip(sectionKey, trip.id, { highlights: textToList(value) })} placeholder="One highlight per line" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Itinerary">
                    <TextAreaInput rows={6} value={itineraryToText(trip.itinerary)} onChange={(value) => updateTrip(sectionKey, trip.id, { itinerary: textToItinerary(value) })} placeholder="Day 1 | Arrival | Pickup, check-in, evening briefing" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Inclusions">
                    <TextAreaInput rows={4} value={listToText(trip.inclusions)} onChange={(value) => updateTrip(sectionKey, trip.id, { inclusions: textToList(value) })} placeholder="One inclusion per line" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Exclusions">
                    <TextAreaInput rows={4} value={listToText(trip.exclusions)} onChange={(value) => updateTrip(sectionKey, trip.id, { exclusions: textToList(value) })} placeholder="One exclusion per line" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <Field label="Gallery Image URLs">
                    <TextAreaInput rows={4} value={listToText(trip.gallery)} onChange={(value) => updateTrip(sectionKey, trip.id, { gallery: textToList(value) })} placeholder="One image URL per line" />
                  </Field>
                </div>
                <div className="md:col-span-3">
                  <ImageField label="Image" value={trip.image} onChange={(image) => updateTrip(sectionKey, trip.id, { image })} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderData = () => (
    <div>
      <SectionTitle title="Data" />
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <IconButton onClick={() => setJsonText(exportSiteContent())} variant="muted">
            <Download size={16} />
            Export
          </IconButton>
          <IconButton onClick={importJson} variant="muted">
            <Upload size={16} />
            Import
          </IconButton>
          <IconButton onClick={restoreDefaults} variant="danger">
            <RefreshCw size={16} />
            Defaults
          </IconButton>
        </div>
        <textarea
          value={jsonText}
          onChange={(event) => setJsonText(event.target.value)}
          rows={18}
          className="w-full rounded-md border border-slate-300 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>
    </div>
  );

  const renderActiveTab = () => {
    if (activeTab === 'dashboard') return renderDashboard();
    if (activeTab === 'banners') return renderBanners();
    if (activeTab === 'hero') return renderHero();
    if (activeTab === 'featured') return renderFeatured();
    if (activeTab === 'india') return renderTripSection('indiaTrips', 'India Trips');
    if (activeTab === 'international') return renderTripSection('internationalTrips', 'International Trips');
    return renderData();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <h1 className="text-xl font-bold">Triplink Admin</h1>
            <div className="mt-1 text-sm text-slate-500">
              {isDirty ? 'Unsaved changes' : 'All changes saved'}
              {status ? ` - ${status}` : ''}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={16} />
              Preview
            </Link>
            <IconButton onClick={resetDraft} variant="muted">
              <RefreshCw size={16} />
              Revert
            </IconButton>
            <IconButton onClick={saveDraft}>
              <Save size={16} />
              Save
            </IconButton>
            <IconButton onClick={logout} variant="muted">
              <LogOut size={16} />
              Logout
            </IconButton>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-6">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-2 lg:sticky lg:top-24">
          <nav className="grid gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main>{renderActiveTab()}</main>
      </div>
    </div>
  );
}

export default AdminPage;
