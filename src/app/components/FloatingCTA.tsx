import { MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { contactInfo } from '../content/contactInfo';

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in slide-in-from-bottom-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-primary">Need Help Planning?</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close contact options"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Our travel experts are here to help you plan your perfect trip!
          </p>
          <div className="space-y-3">
            <a
              href={`tel:${contactInfo.phoneTel}`}
              className="flex items-center gap-3 bg-gradient-to-r from-secondary to-yellow-500 text-primary px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-gradient-to-r from-secondary via-yellow-500 to-secondary bg-size-200 text-primary p-5 rounded-full shadow-2xl hover:shadow-2xl hover:scale-110 transition-all duration-500 animate-bounce"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </button>
    </div>
  );
}
