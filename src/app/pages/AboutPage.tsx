import { Award, Globe, Heart, TrendingUp, Users, Target, Eye, CheckCircle, Handshake } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import logo from '../../imports/triplink_logo_transparent.png';

export function AboutPage() {
  const stats = [
    { icon: <Globe size={40} />, value: '150+', label: 'Destinations Worldwide' },
    { icon: <Award size={40} />, value: '25+', label: 'Years of Excellence' },
    { icon: <Heart size={40} />, value: '50K+', label: 'Happy Travelers' },
    { icon: <TrendingUp size={40} />, value: '98%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: 'Customer First',
      description: 'Your satisfaction and safety are our top priorities in every journey we plan',
    },
    {
      icon: <Handshake size={32} />,
      title: 'Trust & Transparency',
      description: 'Honest pricing, clear communication, and reliable service you can count on',
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'Committed to delivering exceptional travel experiences that exceed expectations',
    },
    {
      icon: <Heart size={32} />,
      title: 'Passion for Travel',
      description: 'We love what we do and it shows in every trip we carefully curate',
    },
  ];

  const milestones = [
    { year: '1999', event: 'Triplink Founded', description: 'Started with a vision to make travel accessible' },
    { year: '2005', event: '10,000 Travelers', description: 'Reached first major milestone' },
    { year: '2010', event: 'International Expansion', description: 'Expanded to 50+ countries' },
    { year: '2015', event: 'Digital Transformation', description: 'Launched online booking platform' },
    { year: '2020', event: 'COVID-19 Response', description: 'Adapted with flexible policies' },
    { year: '2026', event: '50,000+ Happy Travelers', description: 'Continuing to grow and serve' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-blue-900 to-primary py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920"
            alt="About Triplink"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logo} alt="Triplink" className="h-14 sm:h-16 md:h-20 w-auto max-w-[360px] mx-auto mb-8 object-contain drop-shadow-xl" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6">
            About Triplink
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Connecting people to unforgettable experiences since 1999
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-4 sm:mb-6 border border-secondary/30">
                <span className="text-sm sm:text-base">About Company</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
                Transforming Travel with <span className="text-secondary">Personalized Experiences</span>
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <p className="mb-3">
                    Triplink Tours is a Delhi-based travel company revolutionizing the travel industry with innovative and personalized experiences:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>50+ unique trip categories catering to every traveler's dream</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Exclusive celebrity-endorsed adventures for unforgettable experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Tailored corporate travel solutions for business excellence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Engaging social media platform fostering a vibrant community of explorers</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-primary mb-3">Our Vision</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Revolutionize the travel industry by making it more inclusive and accessible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Create unforgettable travel experiences that cater to diverse needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Foster a sense of belonging and adventure for everyone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Build a world where travel is not a privilege but a joyful, enriching experience accessible to all</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-primary mb-3">Our Mission</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Break down barriers and open up the world to those who might have thought travel was out of reach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Offer luxurious escapes for those seeking premium experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Provide exceptional corporate retreats that inspire and rejuvenate teams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Create adventures for everyone, including pet-friendly travel options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600"
                      alt="Travel 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-32 sm:h-36 md:h-40 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600"
                      alt="Travel 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  <div className="relative h-32 sm:h-36 md:h-40 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600"
                      alt="Travel 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
                      alt="Travel 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-secondary mb-3 sm:mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-12 text-white">
              <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Target size={40} className="text-secondary" />
              </div>
              <h3 className="text-3xl mb-4">Our Mission</h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                To inspire and enable people to explore the world by providing exceptional travel experiences, personalized service, and unbeatable value. We strive to make every journey memorable, safe, and accessible to travelers of all backgrounds.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary to-yellow-500 rounded-3xl p-12 text-primary">
              <div className="inline-flex p-4 bg-white/90 backdrop-blur-sm rounded-2xl mb-6">
                <Eye size={40} className="text-primary" />
              </div>
              <h3 className="text-3xl mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become the world's most trusted and innovative travel company, recognized for transforming dreams into reality and creating connections that transcend borders. We envision a future where travel enriches lives and brings people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Our Core <span className="text-secondary">Values</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary to-blue-900 text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
              Our <span className="text-secondary">Journey</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Key milestones that shaped Triplink
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block"></div>

            <div className="space-y-6 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl text-secondary mb-2">{milestone.year}</div>
                      <h3 className="text-xl text-primary mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-yellow-500 items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <CheckCircle size={24} className="text-primary" />
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
              Meet Our <span className="text-secondary">Team</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Passionate travel experts dedicated to making your dreams come true
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
              { name: 'Priya Sharma', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
              { name: 'Amit Patel', role: 'Travel Consultant Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' },
            ].map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-4 border-secondary">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl text-center mb-2">{member.name}</h3>
                <p className="text-secondary text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6">
            Join Our Travel <span className="text-secondary">Community</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Become part of 50,000+ travelers who trust Triplink for their adventures
          </p>
          <button className="bg-gradient-to-r from-secondary to-yellow-500 text-primary px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            Start Your Journey Today
          </button>
        </div>
      </section>
    </div>
  );
}
