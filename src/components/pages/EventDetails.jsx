import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // All mock events data
  const allEvents = [
    {
      _id: "1",
      title: "Road Cleaning in Mirpur 10",
      description:
        "Join us for a community road cleaning event in Mirpur 10. We will clean the main streets, remove trash, and make our neighborhood beautiful. All supplies will be provided. Let's come together for a cleaner Dhaka!",
      eventType: "Cleanup",
      imageUrl:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      location: "Mirpur 10, Dhaka",
      eventDate: "2026-07-15T10:00:00",
      organizerEmail: "organizer@example.com",
      organizerName: "John Doe",
      organizerPhoto: "https://ui-avatars.com/api/?name=John+Doe",
      participants: 24,
      maxParticipants: 50,
    },
    {
      _id: "2",
      title: "Tree Plantation Drive",
      description:
        "Plant trees for a greener and healthier future. Join us in making our city more beautiful and environmentally friendly.",
      eventType: "Plantation",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      location: "Hossainpur, Kishoreganj",
      eventDate: "2026-07-20T09:00:00",
      organizerEmail: "organizer2@example.com",
      organizerName: "Jane Smith",
      organizerPhoto: "https://ui-avatars.com/api/?name=Jane+Smith",
      participants: 18,
      maxParticipants: 40,
    },
    {
      _id: "3",
      title: "Food Donation Camp",
      description:
        "Distribute food to underprivileged communities. Help us provide meals to those in need.",
      eventType: "Donation",
      imageUrl:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      location: "Mohammadpur, Dhaka",
      eventDate: "2026-07-25T11:00:00",
      organizerEmail: "organizer3@example.com",
      organizerName: "Mike Johnson",
      organizerPhoto: "https://ui-avatars.com/api/?name=Mike+Johnson",
      participants: 32,
      maxParticipants: 60,
    },
  ];

  useEffect(() => {
    const foundEvent = allEvents.find((e) => e._id === id);

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      toast.error("Event not found");
      navigate("/upcoming-events");
    }
    setLoading(false);
  }, [id, navigate]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.warning("Please login to join this event");
      navigate("/login");
      return;
    }

    setJoining(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Successfully joined the event! 🎉");
      setEvent((prev) => ({ ...prev, participants: prev.participants + 1 }));
    } catch (error) {
      toast.error(error.message || "Failed to join event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Event not found
        </h1>
        <Link to="/upcoming-events" className="btn-primary mt-4 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link
        to="/upcoming-events"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition"
      >
        <FaArrowLeft /> Back to Events
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
            {event.eventType}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaCalendar className="text-blue-500 text-xl" />
                <span>{format(new Date(event.eventDate), "PPP pp")}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaTag className="text-green-500 text-xl" />
                <span>{event.eventType}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaUser className="text-purple-500 text-xl" />
                <span>Organized by: {event.organizerName}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <FaUsers className="text-blue-500 text-xl" />
                <span>
                  {event.participants}{" "}
                  {event.maxParticipants && `/ ${event.maxParticipants}`}{" "}
                  participants
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              About this event
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-lg"
            >
              {joining ? "Joining..." : "🎯 Join Event"}
            </button>
            {user?.email === event.organizerEmail && (
              <button className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition">
                ✏️ Edit Event
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
