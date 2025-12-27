import { Route, Routes, Navigate } from 'react-router-dom'; // Import routing components
import { useCookies } from 'react-cookie'; // Import cookie hook for auth token
import Home from './home'; // Home/dashboard page
import SignIn from './auth/SignIn'; // Sign-in page
import SignUp from './auth/signup'; // Sign-up page
import ErrorPage from './components/errorPage'; // 404/Error page
import RequestResetPassword from './auth/rq_resetPass'; // Request password reset page
import './styles/App.css'; // Global CSS
import ResetPassword from './auth/resetPassword'; // Reset password page

// ProtectedRoute component checks if user has access token
function ProtectedRoute({ children }) {
  const [cookies, setCookies] = useCookies(['access_token']); // Get access token from cookies
  return cookies.access_token ? children : <Navigate to="/signin" />; // If token exists, render children, else redirect to signin
}

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} /> {/* Redirect root to signin */}
          <Route path="/signin" element={<SignIn />} /> {/* Sign-in route */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign-up route */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Home /></ProtectedRoute>} 
          /> {/* Dashboard route, protected */}
          <Route path="/requestRessetPassword" element={<RequestResetPassword />} /> {/* Request reset password */}
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Reset password */}
          <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 */}
        </Routes>
    </div>
  );
}

export default App; // Export App component
