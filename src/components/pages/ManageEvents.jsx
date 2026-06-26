import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaTag,
  FaEdit,
  FaTrash,
  FaPlus,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";

const ManageEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    setTimeout(() => {
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
          eventDate: "2026-07-15T10:00:00",
          organizerEmail: user?.email || "user@example.com",
          organizerName: user?.displayName || "John Doe",
          status: "upcoming",
        },
        {
          _id: "2",
          title: "Community Health Camp",
          description: "Free health checkup camp for the community.",
          eventType: "Health",
          imageUrl:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
          location: "Uttara, Dhaka",
          eventDate: "2026-08-01T09:00:00",
          organizerEmail: user?.email || "user@example.com",
          organizerName: user?.displayName || "John Doe",
          status: "upcoming",
        },
      ];
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleDelete = async (eventId) => {
    try {
      // API call will go here
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success("Event deleted successfully!");
      setDeleteModal(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  const handleUpdate = (eventId) => {
    navigate(`/update-event/${eventId}`);
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-12"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            Manage Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage all the events you have created
          </p>
        </div>
        <Link
          to="/create-event"
          className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
        >
          <FaPlus /> Create New Event
        </Link>
      </motion.div>

      {events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            No Events Created Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start by creating your first event!
          </p>
          <Link to="/create-event" className="btn-primary">
            Create Event
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {event.eventType}
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FaCheckCircle className="text-xs" />
                        {event.status || "Active"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
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
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/event/${event._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleUpdate(event._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm flex items-center gap-1"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => setDeleteModal(event)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 text-red-500">
                <FaExclamationTriangle />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Delete Event?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <strong>"{deleteModal.title}"</strong>? This action cannot be
                undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteModal._id)}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
