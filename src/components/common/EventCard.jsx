import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendar, FaMapMarkerAlt, FaTag, FaUsers } from "react-icons/fa";
import { format, isPast } from "date-fns";

const EventCard = ({ event, index = 0 }) => {
  const {
    _id,
    title,
    description,
    eventType,
    imageUrl,
    location,
    eventDate,
    participants = 0,
  } = event;

  const isEventPast = isPast(new Date(eventDate));
  const formattedDate = format(new Date(eventDate), "PPP");

  // Event type color mapping
  const typeColors = {
    Cleanup: "bg-green-500",
    Plantation: "bg-emerald-500",
    Donation: "bg-blue-500",
    Education: "bg-purple-500",
    Health: "bg-red-500",
    Other: "bg-gray-500",
  };

  const typeColor = typeColors[eventType] || "bg-blue-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400"
          }
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Event Type Badge */}
        <div
          className={`absolute top-4 right-4 ${typeColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1`}
        >
          <FaTag className="text-xs" />
          {eventType}
        </div>

        {/* Status Badge */}
        {isEventPast && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Past Event
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaCalendar className="text-blue-500 flex-shrink-0" />
            <span>{formattedDate}</span>
            {isEventPast && (
              <span className="text-xs text-red-500 ml-2">(Ended)</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {participants > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaUsers className="text-green-500 flex-shrink-0" />
              <span>{participants} participants</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/event/${_id}`}
          className={`block w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
            isEventPast
              ? "bg-gray-400 text-white cursor-not-allowed hover:bg-gray-400"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
          }`}
          onClick={(e) => isEventPast && e.preventDefault()}
        >
          {isEventPast ? "Event Ended" : "View Event Details"}
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
