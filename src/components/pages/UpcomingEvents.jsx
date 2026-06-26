import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendar, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { format } from "date-fns";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockEvents = [
      {
        _id: "1",
        title: "Road Cleaning in Mirpur 10",
        description:
          "Join us to clean the streets of Mirpur and make our neighborhood beautiful.",
        eventType: "Cleanup",
        imageUrl:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
        location: "Mirpur 10, Dhaka",
        eventDate: "2026-07-15",
      },
      {
        _id: "2",
        title: "Tree Plantation Drive",
        description: "Plant trees for a greener and healthier future.",
        eventType: "Plantation",
        imageUrl:
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
        location: "Hossainpur, Kishoreganj",
        eventDate: "2026-07-20",
      },
      {
        _id: "3",
        title: "Food Donation Camp",
        description: "Distribute food to underprivileged communities.",
        eventType: "Donation",
        imageUrl:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
        location: "Mohammadpur, Dhaka",
        eventDate: "2026-07-25",
      },
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Upcoming Events
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover and join events that are making a difference in communities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {event.eventType}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaCalendar className="text-blue-500" />
                  <span>{format(new Date(event.eventDate), "PPP")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Link
                to={`/event/${event._id}`}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Event
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
