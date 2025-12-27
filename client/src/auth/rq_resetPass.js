import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pass.css';
import { Toaster, toast } from 'react-hot-toast';
import EmailIcon from '@mui/icons-material/Email';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles
const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [emailLoading, setEmailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0); // State for countdown

  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && timer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Clear timer on cleanup
  }, [countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    if (isOffline) {
      setError(true);
      setMessage('Please check your internet connection and try again.');
      return;
    }

    try {
      setEmailLoading(true);
      NProgress.start();
      const res = await axios.post('https://note-app-backend-wzcl.onrender.com/request-reset-password', { email });
      setMessage(res.data.message);

    if (res.data.otp) {
      console.log(`Your OTP is: ${res.data.otp}`)
      toast.success(`Your OTP is: ${res.data.otp}`, { duration: 10000 }); // عرض OTP كتنبيه
      setShowOtp(true)
    }
      setError(false);
      
      // Start the countdown after successfully sending the request
      setCountdown(30); // Countdown starts from 30 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
      setError(true);
    } finally {
      setEmailLoading(false);
      NProgress.done();
    }
  };

const handleVerifyOtp = async () => {
  if (!otp) {
    toast.error("Please enter OTP");
    return;
  }

  try {
    setOtpLoading(true);
    NProgress.start();

    const res = await axios.post(
      'https://note-app-backend-wzcl.onrender.com/verify-otp',
      { email, otp }
    );

    toast.success(res.data.message);
    setError(false);

    // ✅ استخدم token بدل email
    const token = res.data.token;
    window.location.href = `/reset-password?token=${token}`;

  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid OTP");
    setError(true);
  } finally {
    setOtpLoading(false);
    NProgress.done();
  }
};


  return (
    <div className="auth_page">
      <div className="auth_left">
        <img src="/images/img-login-mern-project.png" className="auth_left_img" alt="auth_img" />
      </div>
      <div className="auth_right">
        <div className="auth_right_icon">
          <EmailIcon sx={{ width: '50px', height: '50px' }} />
        </div>
        <div className="auth_text_container">
          <h2>Request Password Reset</h2>
          <p>Please enter your Email To reset the password.</p>
        </div>
        <div className="auth_card">
          <form className="auth_form">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              onClick={handleSubmit} 
              className="auth_button" 
              disabled={emailLoading || countdown > 0} // Disable button during countdown
            >
              {emailLoading ? 'Loading...' : countdown > 0 ? `Wait ${countdown}s` : 'Send'}
            </button>
          </form>
          {showOtp && (
              <>
                <TextField
                  id="otp"
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  type="button"
                  className="auth_button"
                  onClick={handleVerifyOtp}
                  disabled={otpLoading}
                >
                  Verify OTP
                </button>
              </>
            )}
            {message && <p style={{
              color: error ? 'red' : 'green',
              marginTop: '10px',
              textAlign:"center",
              fontSize:"0.8rem",
            }}>{message}</p>}
          <p className="auth_redirect">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
    
  );
}

export default RequestResetPassword;
