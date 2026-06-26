import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBagEBcGMk94tdvsChUB6KgeAzU_wMLRZY",
  authDomain: "eventhub-a9c59.firebaseapp.com",
  projectId: "eventhub-a9c59",
  storageBucket: "eventhub-a9c59.firebasestorage.app",
  messagingSenderId: "98258399827",
  appId: "1:98258399827:web:b2815f22f05b318188cca6",
  measurementId: "G-PFKJJ3E825",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
