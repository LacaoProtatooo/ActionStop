import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

// Utility Components
import { Vortex } from './components/ui/vortex.jsx';
import { ModalProvider } from './components/ui/animated-modal.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Redux Provider and Store
import { Provider } from 'react-redux';
import store from './components/store/store.js';

// Admin Pages
import AdminHomePage from './components/admin/home';
import FigurineDashboard from './components/admin/figurine.jsx';
import ReviewsDashboard from './components/admin/reviews.jsx';
import OrdersDashboard from './components/admin/orders.jsx';
import UsersDashboard from './components/admin/users.jsx';

// User / Non-User Pages
import Home from './components/pages/home';
import About from './components/pages/about';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import Favorites from './components/pages/favorites';
import Purchases from './components/pages/purchases.jsx';
import ReviewPage from './components/pages/reviewPage.jsx';
import ProfileCard from './components/common/profile.jsx';
import AdminProfile from './components/admin/adminprofile.jsx';

// User Authentication
import { checkAuthStatus, handleLogout } from './utils/userauth.js';
import ProtectedRoute from './components/common/protectedroute.jsx';

import Checkout from './components/pages/checkout.jsx';
import { onMessage } from 'firebase/messaging';
import { messaging } from './utils/firebaseConfig.js';

function App() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      toast.info(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.image,
      });
      // ...
    });
  }, []);
  
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuthStatus);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [isAdmin, setAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

  const handleLogin = (userData) => {
    setIsAuthenticated(true); 
    setUser(userData);
    setAdmin(userData.isAdmin);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', userData.isAdmin.toString());
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedAuth = checkAuthStatus();
    const storedAdmin = localStorage.getItem('isAdmin') === 'true';

    if (storedAuth && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setAdmin(storedAdmin);
    }
    
  }, []);

  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true, // Enable React.startTransition for smoother updates
          v7_relativeSplatPath: true, // Enable updated relative splat path resolution
        }}
      >
        <Vortex
            rangeY={800}
            particleCount={500}
            baseHue={120}
          />
        <ModalProvider>
          <ToastContainer />
          <div className="relative z-10">
            <Routes>
              {/* User / Non-User Routes */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} handleLogout={() => handleLogout(setIsAuthenticated, setUser, setIsAdmin)} />} />

              {/* User Routes */}
              <Route path="/user/favorite" element={<ProtectedRoute element={<Favorites />} isAuthenticated={isAuthenticated} /> } />
              <Route path="/user/checkout" element={<ProtectedRoute element={<Checkout />} isAuthenticated={isAuthenticated} />} />
              <Route path="/user/purchases" element={<ProtectedRoute element={<Purchases />} isAuthenticated={isAuthenticated} />} />
              <Route path="/user/reviewpage" element={<ProtectedRoute element={<ReviewPage />} isAuthenticated={isAuthenticated} />} />
              <Route path="/profile" element={<ProtectedRoute element={<ProfileCard />} isAuthenticated={isAuthenticated} />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute element={<AdminHomePage />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} />} />
              <Route path="/admin/figurines" element={<ProtectedRoute element={<FigurineDashboard />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} />} />
              <Route path="/admin/reviews" element={<ProtectedRoute element={<ReviewsDashboard />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} />} />
              <Route path="/admin/orders" element={<ProtectedRoute element={<OrdersDashboard />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} />} />
              <Route path="/admin/users" element={<ProtectedRoute element={<UsersDashboard />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} />} />
              <Route path="/admin/profile" element={<ProtectedRoute element={<AdminProfile />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly={true} /> }/>

            </Routes>
          </div>
        </ModalProvider>
      </Router>
    </Provider>
  );
}

export default App;
