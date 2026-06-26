import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Photo URL validation
    if (!formData.photoURL.trim()) {
      newErrors.photoURL = "Profile photo URL is required";
    } else if (!formData.photoURL.startsWith("http")) {
      newErrors.photoURL =
        "Please enter a valid URL (start with http:// or https://)";
    }

    // Password validation
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(", ");
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.photoURL,
      );
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Password strength
  const getPasswordStrength = () => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];
  const strengthTexts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚀</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our community of changemakers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="form-label">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.name ? "input-error" : ""}`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="form-label">Profile Photo URL</label>
            <div className="relative">
              <FaCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.photoURL ? "input-error" : ""}`}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">{errors.photoURL}</p>
            )}
            {formData.photoURL && !errors.photoURL && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={formData.photoURL}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${formData.name || "User"}&background=3b82f6&color=fff&size=100`;
                  }}
                />
                <span className="text-sm text-emerald-600 dark:text-emerald-400">
                  ✓ Photo preview
                </span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.password ? "input-error" : ""}`}
                placeholder="Must have uppercase, lowercase, 6+ chars"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 h-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Strength:{" "}
                  <span className="font-medium">
                    {strengthTexts[passwordStrength - 1] || "Enter password"}
                  </span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Must have: 6+ chars, uppercase, lowercase
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password</label>
            <div className="relative">
              <FaCheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.confirmPassword ? "input-error" : ""}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {formData.password &&
              formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <p className="text-emerald-500 text-sm mt-1">
                  ✓ Passwords match
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                Creating account...
              </>
            ) : (
              <>
                Register <FaArrowRight className="text-sm" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
            🔒 By registering, you agree to our Terms of Service and Privacy
            Policy. We'll never share your data with third parties.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
