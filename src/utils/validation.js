export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Must contain an uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Must contain a lowercase letter");
  }
  return errors;
};

export const validateEvent = (data) => {
  const errors = {};
  if (!data.title?.trim()) errors.title = "Title is required";
  if (!data.description?.trim()) errors.description = "Description is required";
  if (!data.eventType) errors.eventType = "Event type is required";
  if (!data.imageUrl?.trim()) errors.imageUrl = "Image URL is required";
  if (!data.location?.trim()) errors.location = "Location is required";
  if (!data.eventDate) errors.eventDate = "Event date is required";
  if (data.eventDate && new Date(data.eventDate) <= new Date()) {
    errors.eventDate = "Event date must be in the future";
  }
  return errors;
};
