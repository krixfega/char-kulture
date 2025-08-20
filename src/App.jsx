import { Toaster } from 'react-hot-toast';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import BlogListing from './pages/BlogListing';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import AdminSignup from './pages/admin/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import FirebaseTest from './firebaseTest'; 

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isTestRoute = location.pathname === '/test';

  return (
    <>
      {/* Only show Navbar for non-admin, non-test routes */}
      {!isAdminRoute && !isTestRoute && <Navbar />}
      
      <div>
        <Routes>
          {/* Public routes with navbar */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          
          {/* Admin authentication routes (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          
          {/* Protected admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Test route for Firebase testing */}
          <Route path="/test" element={<FirebaseTest />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            color: 'var(--text-dark)',
            border: '2px solid var(--accent)',
            borderRadius: '12px',
            fontFamily: 'inherit',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}