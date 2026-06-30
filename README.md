# 🌍 EventHub - Client Side

## 📌 Live Site URL

[EventHub Live](https://eventhub.netlify.app)

---

## 📌 Features

- ✅ **User Authentication** - Login/Register with Email, Google, GitHub
- ✅ **Create Events** - Organize social service events with future date validation
- ✅ **Join Events** - Join community events and track participation
- ✅ **Manage Events** - Update or delete your own events
- ✅ **Filter & Search** - Search events by name and filter by type
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Responsive Design** - Works on all devices
- ✅ **Framer Motion Animations** - Smooth user interactions
- ✅ **Toast Notifications** - Error and success messages
- ✅ **Loading Spinners** - Better user experience

---

## 🛠️ Technologies Used

### Frontend

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Firebase Authentication** - Google & GitHub Login
- **Framer Motion** - Animations
- **React Toastify** - Notifications
- **React Datepicker** - Date selection
- **Axios** - API calls
- **React Icons** - Icons

### Backend (API)

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication

---

## 📁 Project Structure

eventhub-client/
├── src/
│ ├── api/
│ │ └── axiosConfig.js
│ ├── components/
│ │ ├── common/
│ │ │ ├── EventCard.jsx
│ │ │ ├── LoadingSpinner.jsx
│ │ │ ├── PrivateRoute.jsx
│ │ │ └── ToastNotifications.jsx
│ │ ├── pages/
│ │ │ ├── Home/
│ │ │ │ ├── Home.jsx
│ │ │ │ ├── Banner.jsx
│ │ │ │ ├── Features.jsx
│ │ │ │ ├── Gallery.jsx
│ │ │ │ └── Newsletter.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── UpcomingEvents.jsx
│ │ │ ├── EventDetails.jsx
│ │ │ ├── CreateEvent.jsx
│ │ │ ├── ManageEvents.jsx
│ │ │ └── JoinedEvents.jsx
│ │ └── shared/
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ ├── contexts/
│ │ ├── AuthContext.jsx
│ │ └── ThemeContext.jsx
│ ├── firebase/
│ │ └── firebase.config.js
│ ├── hooks/
│ │ ├── useAuth.js
│ │ ├── useEvents.js
│ │ └── useTheme.js
│ ├── utils/
│ │ └── validation.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── public/
│ └── images/
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
