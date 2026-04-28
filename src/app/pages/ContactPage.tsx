import { Contact } from '../components/Contact';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ContactPage() {
  const offices = [
    {
      city: 'Triplink Tours (Headquarters)',
      address: 'India',
      phone: '+91 82386 23437',
      email: 'contact@triplinktours.com',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-blue-900 to-primary py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm text-secondary px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-4 sm:mb-6 border border-secondary/30">
            <Send size={16} className="sm:hidden" />
            <Send size={20} className="hidden sm:block" />
            <span className="text-sm sm:text-base">Get In Touch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6">
            Contact Triplink
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Have questions? We're here to help you plan your perfect journey
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact />

      {/* Offices Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Get In <span className="text-secondary">Touch</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Reach out to us for all your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-2xl mx-auto">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                  <ImageWithFallback
                    src={office.image}
                    alt={office.city}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl text-white">{office.city}</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{office.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-secondary flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-primary">
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-secondary flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-primary">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-primary to-blue-900 text-white rounded-xl sm:rounded-2xl">
                <Clock size={24} className="sm:hidden" />
                <Clock size={32} className="hidden sm:block" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-primary">Business Hours</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-base sm:text-lg text-primary mb-3 sm:mb-4">Office Hours</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-secondary">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-secondary">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-primary mb-4">Contact Information</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-secondary" />
                    <span>Phone:</span>
                    <a href="tel:+918238623437" className="text-secondary hover:underline">+91 82386 23437</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <span>Email:</span>
                      <a href="mailto:contact@triplinktours.com" className="text-secondary hover:underline">contact@triplinktours.com</a>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Frequently Asked <span className="text-secondary">Questions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                q: 'How do I book a trip with Triplink?',
                a: 'You can book online through our website, call our customer service, or visit any of our offices. Our team will guide you through the entire booking process.',
              },
              {
                q: 'What is your cancellation policy?',
                a: 'We offer flexible cancellation policies depending on the package. Most bookings can be cancelled up to 48 hours before departure for a full refund. Please check specific terms during booking.',
              },
              {
                q: 'Do you provide travel insurance?',
                a: 'Yes, we offer comprehensive travel insurance covering medical emergencies, trip cancellations, lost baggage, and more. It can be added during the booking process.',
              },
              {
                q: 'Can I customize my travel package?',
                a: 'Absolutely! We specialize in creating customized itineraries based on your preferences, budget, and interests. Contact our travel consultants for personalized planning.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, net banking, UPI, and international payment methods. EMI options are also available for select packages.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl text-primary mb-2 sm:mb-3">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-2xl sm:rounded-3xl h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <div className="text-center px-4">
              <MapPin size={48} className="text-primary mx-auto mb-3 sm:mb-4 md:hidden" />
              <MapPin size={64} className="text-primary mx-auto mb-4 hidden md:block" />
              <p className="text-base sm:text-lg md:text-xl text-gray-600">Interactive Map Coming Soon</p>
              <p className="text-gray-500">Find our offices near you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-blue-900 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Still Have Questions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8">
            Our travel experts are just a call away
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <a
              href="tel:+918238623437"
              className="bg-gradient-to-r from-secondary to-yellow-500 text-primary px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 font-poppins font-bold text-sm sm:text-base text-center"
            >
              Call: +91 82386 23437
            </a>
            <a
              href="https://wa.me/918238623437"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 font-poppins font-semibold text-sm sm:text-base text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
