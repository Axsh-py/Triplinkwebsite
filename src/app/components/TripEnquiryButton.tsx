import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarDays, Mail, Phone, Send, X } from 'lucide-react';

type EnquiryTrip = {
  id?: string;
  name?: string;
  title?: string;
  price?: string;
  duration?: string;
  route?: string;
  startDate?: string;
  endDate?: string;
};

type TripEnquiryButtonProps = {
  trip: EnquiryTrip;
  label?: string;
  className?: string;
  children?: ReactNode;
};

const COMPANY_EMAIL = 'contact@triplinktours.com';

function getTripName(trip: EnquiryTrip) {
  return trip.name || trip.title || 'Triplink trip';
}

export function TripEnquiryButton({
  trip,
  label = 'Enquire Now',
  className,
  children,
}: TripEnquiryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travellers: '2',
    preferredDate: trip.startDate || '',
    message: '',
  });

  const tripName = useMemo(() => getTripName(trip), [trip]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Trip Enquiry - ${tripName}`;
    const body = [
      'New trip enquiry from Triplink website',
      '',
      `Trip: ${tripName}`,
      trip.price ? `Price: ${trip.price}` : '',
      trip.duration ? `Duration: ${trip.duration}` : '',
      trip.route ? `Route: ${trip.route}` : '',
      trip.startDate || trip.endDate ? `Trip Dates: ${trip.startDate || 'Flexible'} to ${trip.endDate || 'Flexible'}` : '',
      '',
      `Customer Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Travellers: ${form.travellers}`,
      `Preferred Date: ${form.preferredDate || 'Flexible'}`,
      '',
      `Message: ${form.message || 'No extra message'}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsOpen(false);
  };

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${tripName} enquiry form`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-secondary">Trip Enquiry</div>
                <h2 className="mt-1 text-xl font-bold text-primary">{tripName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-primary"
                aria-label="Close enquiry form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitEnquiry} className="p-5">
              <div className="mb-5 grid gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-3">
                {trip.duration && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-secondary" />
                    {trip.duration}
                  </div>
                )}
                {trip.price && (
                  <div className="font-bold text-primary">{trip.price}</div>
                )}
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-secondary" />
                  {COMPANY_EMAIL}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Phone</span>
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Travellers</span>
                  <input
                    value={form.travellers}
                    onChange={(event) => updateField('travellers', event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Preferred Date</span>
                  <input
                    value={form.preferredDate}
                    onChange={(event) => updateField('preferredDate', event.target.value)}
                    placeholder="Flexible / 2026-06-15"
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Message</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    placeholder="Package questions, hotel preference, pickup city, budget..."
                    className="w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Phone size={15} className="text-secondary" />
                  +91 82386 23437
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary/90"
                >
                  <Send size={16} />
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
  );

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children || label}
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(modal, document.body)}
    </>
  );
}
