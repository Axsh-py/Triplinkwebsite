import { MapPin, Users, Award, Globe } from 'lucide-react';

export function QuickStats() {
  const stats = [
    {
      icon: <Users size={40} />,
      value: '50,000+',
      label: 'Happy Travelers',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <MapPin size={40} />,
      value: '150+',
      label: 'Destinations',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <Award size={40} />,
      value: '4.9/5',
      label: 'Customer Rating',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: <Globe size={40} />,
      value: '25+',
      label: 'Years Experience',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {stat.icon}
              </div>
              <div className={`text-4xl md:text-5xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
