import {
  FaHandsHelping,
  FaUsers,
  FaCalendarCheck,
  FaGlobe,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaHandsHelping />,
      title: "Create Events",
      desc: "Organize social service events in your area",
    },
    {
      icon: <FaUsers />,
      title: "Join Community",
      desc: "Connect with like-minded volunteers",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Track Impact",
      desc: "See the difference you're making",
    },
    {
      icon: <FaGlobe />,
      title: "Global Reach",
      desc: "Make an impact worldwide",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose EventHub?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Everything you need to make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
