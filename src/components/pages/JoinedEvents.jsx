import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaTag,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { format } from "date-fns";
import LoadingSpinner from "../common/LoadingSpinner";

const JoinedEvents = () => {
  const { user } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockJoinedEvents = [
        {
          _id: "1",
          title: "Road Cleaning in Mirpur 10",
          description:
            "Join us to clean the streets of Mirpur and make our neighborhood beautiful.",
          eventType: "Cleanup",
          imageUrl:
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
          location: "Mirpur 10, Dhaka",
          eventDate: "2026-07-15T10:00:00",
          organizerName: "John Doe",
          joinedAt: "2026-06-20T08:30:00",
          status: "upcoming",
        },
        {
          _id: "2",
          title: "Tree Plantation Drive",
          description: "Plant trees for a greener and healthier future.",
          eventType: "Plantation",
          imageUrl:
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
          location: "Hossainpur, Kishoreganj",
          eventDate: "2026-07-20T09:00:00",
          organizerName: "Jane Smith",
          joinedAt: "2026-06-19T14:20:00",
          status: "upcoming",
        },
        {
          _id: "3",
          title: "Food Donation Camp",
          description: "Distribute food to underprivileged communities.",
          eventType: "Donation",
          imageUrl:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
          location: "Mohammadpur, Dhaka",
          eventDate: "2026-07-25T11:00:00",
          organizerName: "Mike Johnson",
          joinedAt: "2026-06-18T10:15:00",
          status: "upcoming",
        },
      ];
      setJoinedEvents(mockJoinedEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const sortedEvents = [...joinedEvents].sort(
    (a, b) => new Date(a.eventDate) - new Date(b.eventDate),
  );

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          My Joined Events 📌
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Events you have joined and are participating in
        </p>
        {user && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Logged in as: {user.displayName || user.email}
          </p>
        )}
      </motion.div>

      {sortedEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            No Events Joined Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start making a difference by joining an event!
          </p>
          <Link to="/upcoming-events" className="btn-primary">
            Browse Events
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.eventType}
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <FaCheckCircle className="text-xs" />
                  Joined
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
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
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaTag className="text-green-500" />
                    <span>{event.eventType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaClock className="text-purple-500" />
                    <span>
                      Joined: {format(new Date(event.joinedAt), "PPP")}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/event/${event._id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View Event Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;
