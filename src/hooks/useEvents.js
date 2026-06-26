import { useState, useEffect, useCallback } from "react";
import { eventApi } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

// Custom hooks
export const useUpcomingEvents = (params = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getUpcomingEvents(params);
      setEvents(data.events || []);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch events");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

export const useJoinedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getJoinedEvents();
      setEvents(data.events || []);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch joined events");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

export const useManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getManageEvents();
      setEvents(data.events || []);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch your events");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

export const useEvent = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setEvent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getEventById(eventId);
      setEvent(data);
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch event details");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, loading, error, refetch: fetchEvent };
};

export const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.createEvent(eventData);
      toast.success("Event created successfully!");
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to create event");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createEvent, loading, error };
};

export const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEvent = useCallback(async (eventId, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.updateEvent(eventId, eventData);
      toast.success("Event updated successfully! ✅");
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to update event");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateEvent, loading, error };
};

export const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEvent = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      await eventApi.deleteEvent(eventId);
      toast.success("Event deleted successfully!");
      return true;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to delete event");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteEvent, loading, error };
};

export const useJoinEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const joinEvent = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.joinEvent(eventId);
      toast.success("Successfully joined the event!");
      return data;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to join event");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { joinEvent, loading, error };
};

export const useLeaveEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const leaveEvent = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      await eventApi.unjoinEvent(eventId);
      toast.info("Left the event");
      return true;
    } catch (error) {
      setError(error.message);
      toast.error("Failed to leave event");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { leaveEvent, loading, error };
};
