import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      rating: 5,
      text: 'Triplink made our honeymoon to Maldives absolutely perfect! Every detail was taken care of, and the experiences were beyond our expectations. Highly recommended!',
      trip: 'Maldives Honeymoon Package',
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      rating: 5,
      text: 'Amazing service and incredible value. The team helped us plan a family trip to Japan that we will never forget. Professional, responsive, and truly cared about our experience.',
      trip: 'Japan Family Tour',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      rating: 5,
      text: 'As a solo traveler, I felt completely safe and supported throughout my Bali adventure. The itinerary was perfect, and I made memories that will last a lifetime!',
      trip: 'Solo Bali Adventure',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-yellow-500/10 text-primary px-6 py-3 rounded-full mb-6 border border-secondary/20">
            <span>Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-primary mb-6">
            Loved by <span className="text-secondary">50,000+</span> Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real travelers who have explored the world with Triplink
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative"
            >
              <div className="absolute -top-4 -left-4 bg-secondary text-primary p-4 rounded-full shadow-lg">
                <Quote size={24} />
              </div>

              <div className="flex items-center gap-1 mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-secondary">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-primary mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <p className="text-xs text-secondary mt-1">{testimonial.trip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-primary text-white px-8 py-6 rounded-2xl">
            <div className="text-center border-r border-white/20 pr-8">
              <div className="text-4xl text-secondary mb-2">4.9</div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-sm text-gray-300">Average Rating</p>
            </div>
            <div className="text-center border-r border-white/20 pr-8">
              <div className="text-4xl text-secondary mb-2">50K+</div>
              <p className="text-sm text-gray-300">Happy Travelers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-secondary mb-2">98%</div>
              <p className="text-sm text-gray-300">Would Recommend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
