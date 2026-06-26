import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

// Custom hooks
export const useAuthState = () => {
  const { user, loading, error } = useAuth();
  return { user, loading, error };
};

export const useIsAuthenticated = () => {
  const { user } = useAuth();
  return !!user;
};

export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

export const useAuthListener = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerData: user.providerData,
      });
      setLoading(false);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  return { profile, loading };
};
