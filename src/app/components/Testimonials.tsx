import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Aarav Mehta',
      location: 'Pune, Maharashtra',
      image: 'https://images.unsplash.com/photo-1665034868573-5b63c589b70c?w=400&auto=format&fit=crop',
      rating: 5,
      text: 'I was trying to plan Ladakh on my own, but permits, stays and backup transport were getting difficult to manage. Triplink kept the route practical, the hotels were clean, and the daily WhatsApp updates made the whole trip feel very organised.',
      trip: 'Ladakh Group Adventure',
    },
    {
      name: 'Neha Sharma',
      location: 'Delhi NCR',
      image: 'https://images.unsplash.com/photo-1654436200209-de489ed205df?w=400&auto=format&fit=crop',
      rating: 5,
      text: 'We travelled to Kashmir with my parents, so safety and hotel location mattered a lot. The driver was punctual, the team helped with Gulmarg gondola planning, and the itinerary never felt rushed. It was a comfortable family holiday.',
      trip: 'Kashmir Family Vacation',
    },
    {
      name: 'Rohan Nair',
      location: 'Bengaluru, Karnataka',
      image: 'https://images.unsplash.com/photo-1619890632764-87d5fc97840a?w=400&auto=format&fit=crop',
      rating: 5,
      text: 'Our Kerala plan was smooth from the airport pickup to the Munnar stay and Alleppey houseboat. One day had to be changed because of rain, but the team arranged an alternative quickly. The budget was clear and there were no surprise charges.',
      trip: 'Kerala Couple Getaway',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-yellow-500/10 text-primary px-6 py-3 rounded-full mb-6 border border-secondary/20">
            <span>Traveller Reviews</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-primary mb-6">
            Loved by <span className="text-secondary">50,000+</span> Indian Travellers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Honest notes from families, couples and groups who planned their trips with Triplink
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

              <p className="text-gray-700 mb-6 leading-relaxed">
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
              <p className="text-sm text-gray-300">Happy Travellers</p>
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
