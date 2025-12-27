import React, { useEffect} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles

const GoogleLogin = () => {
  const [cookies, setCookie] = useCookies(['access_token']);
  NProgress.configure({ showSpinner: false });
  // دالة التعامل مع التوكن
  const handleGoogleLogin = async (token) => {
    try {
      NProgress.start();
      // إرسال التوكن إلى الباك-إند للتحقق
      const response = await axios.post('https://note-app-backend-wzcl.onrender.com/google-login', { token });
      localStorage.setItem('user', JSON.stringify(response.data));
      setCookie('access_token', response.data.token, { expires: new Date(Date.now() + 3600000) });
      localStorage.setItem('isLoggedIn', 'true');
      // تخزين التوكن الذي تم إنشاؤه في الباك-إند
    } catch (err) {
      console.error('Google login failed:', err);
    }
    finally {
      NProgress.done();
    }
  };

  // تحميل مكتبة Google عند تشغيل التطبيق
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    // ربط دالة تسجيل الدخول بالنافذة
    window.loginCallBack = (response) => {
      handleGoogleLogin(response.credential); // استدعاء الدالة عند تسجيل الدخول
    };

    // تنظيف عند إزالة المكون
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div style={{
      display:'flex',
      justifyContent:"center",
      alignItems:"center"
    }}>
      {/* تحميل مكتبة Google */}
      <div
        id="g_id_onload"
        data-client_id="261685526090-pek528sms1d6dor133gq1dohpq2sut2o.apps.googleusercontent.com" // ضع الـ CLIENT ID الخاص بك هنا
        data-context="signin"
        data-ux_mode="popup"
        data-callback="loginCallBack" // استدعاء الدالة عند تسجيل الدخول
        data-auto_prompt="false"
      ></div>

      {/* زر تسجيل الدخول */}
    <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_black"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

export default GoogleLogin;
