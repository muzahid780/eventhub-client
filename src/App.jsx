import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/common/PrivateRoute";

import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UpcomingEvents from "./components/pages/UpcomingEvents";
import EventDetails from "./components/pages/EventDetails";
import CreateEvent from "./components/pages/CreateEvent";
import ManageEvents from "./components/pages/ManageEvents";
import JoinedEvents from "./components/pages/JoinedEvents";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upcoming-events" element={<UpcomingEvents />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route
                  path="/create-event"
                  element={
                    <PrivateRoute>
                      <CreateEvent />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manage-events"
                  element={
                    <PrivateRoute>
                      <ManageEvents />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/joined-events"
                  element={
                    <PrivateRoute>
                      <JoinedEvents />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
