import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { setAuthToken, clearAuthToken } from "../api/axiosConfig";

// Create context
const AuthContext = createContext();

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get token and store it
        try {
          const token = await currentUser.getIdToken();
          setAuthToken(token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              emailVerified: currentUser.emailVerified,
            }),
          );
        } catch (error) {
          console.error("Error getting token:", error);
        }
        setUser(currentUser);
      } else {
        clearAuthToken();
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register with Email/Password
  const register = async (email, password, name, photoURL) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL:
          photoURL ||
          `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff&size=100`,
      });

      // Send email verification
      await sendEmailVerification(result.user);

      // Get token
      const token = await result.user.getIdToken();
      setAuthToken(token);

      toast.success("Account created successfully! ");
      toast.info("Please verify your email. Verification link sent!");

      return result.user;
    } catch (error) {
      setError(error.message);
      handleAuthError(error);
      throw error;
    }
  };

  // Login with Email/Password
  const login = async (email, password) => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Check if email is verified
      if (!result.user.emailVerified) {
        toast.warning("Please verify your email first. Check your inbox!");
        // Resend verification email
        await sendEmailVerification(result.user);
      }

      const token = await result.user.getIdToken();
      setAuthToken(token);

      toast.success(`Welcome back, ${result.user.displayName || "User"}! `);
      return result.user;
    } catch (error) {
      setError(error.message);
      handleAuthError(error);
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      setAuthToken(token);
      toast.success(`Welcome, ${result.user.displayName}! `);
      return result.user;
    } catch (error) {
      setError(error.message);
      handleAuthError(error);
      throw error;
    }
  };

  // Login with GitHub
  const loginWithGithub = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const token = await result.user.getIdToken();
      setAuthToken(token);
      toast.success(`Welcome, ${result.user.displayName}! `);
      return result.user;
    } catch (error) {
      setError(error.message);
      handleAuthError(error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      clearAuthToken();
      localStorage.removeItem("user");
      toast.info("Logged out successfully");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  // Reset Password
  const resetPassword = async (email) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError(error.message);
      handleAuthError(error);
      throw error;
    }
  };

  // Send Email Verification
  const sendVerificationEmail = async () => {
    setError(null);
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        toast.success("Verification email sent! Check your inbox.");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  // Update Profile
  const updateUserProfile = async (data) => {
    setError(null);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, data);

        // Update local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userData,
              displayName: data.displayName || userData.displayName,
              photoURL: data.photoURL || userData.photoURL,
            }),
          );
        }

        toast.success("Profile updated successfully!");
        return auth.currentUser;
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    }
  };

  // Handle Auth Errors
  const handleAuthError = (error) => {
    let message = error.message;
    switch (error.code) {
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/email-already-in-use":
        message = "Email already in use. Please use another email.";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;
      case "auth/invalid-email":
        message = "Invalid email address.";
        break;
      case "auth/too-many-requests":
        message = "Too many requests. Please try again later.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please check your connection.";
        break;
      default:
        message = error.message || "An error occurred. Please try again.";
    }
    toast.error(message);
    return message;
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getUser = () => {
    return user;
  };

  const refreshToken = async () => {
    try {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        setAuthToken(token);
        return token;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout,
    resetPassword,
    sendVerificationEmail,
    updateUserProfile,
    isAuthenticated,
    getUser,
    refreshToken,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
