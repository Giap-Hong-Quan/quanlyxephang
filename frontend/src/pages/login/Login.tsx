import React from 'react';
import FormLogin from '../../components/FormLogin';
import anh2login from '../../assets/image/image1.png';
import logo from '../../assets/image/logoalta.png';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7F2] via-[#F2F5FB] to-[#EBF0FA] flex items-center justify-center p-4 md:p-8 font-sans">
      {/* Outer Card Container */}
      <div className="w-full max-w-4xl min-h-[560px] grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden bg-white shadow-[20px_20px_50px_rgba(180,195,215,0.45),-20px_-20px_50px_rgba(255,255,255,0.95)] border border-white/80">
        
        {/* Left Column: Form Section */}
        <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-white relative">
          <div className="space-y-8">
            {/* Logo - Centered & Enlarged */}
            <div className="flex justify-center items-center w-full">
              <img src={logo} alt="Alta Logo" className="h-20 md:h-24 w-auto object-contain mx-auto" />
            </div>

            {/* Title - Centered */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Đăng Nhập</h1>
            </div>

            {/* Login Form */}
            <FormLogin />
          </div>

          {/* Copyright Footer - Clear reading contrast */}
          <div className="pt-8 text-center text-xs md:text-sm text-slate-500 font-semibold">
            © 2026 Alta Software. All rights reserved.
          </div>
        </div>

        {/* Right Column: Hero Banner Section */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-[#FF8742] via-[#FF6D1B] to-[#EE4E00] relative overflow-hidden text-white">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none"></div>

          {/* Hero Content Container - Illustration directly on gradient */}
          <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center space-y-6">
            <img
              src={anh2login}
              alt="Illustration"
              className="w-full max-w-[320px] md:max-w-[350px] h-auto object-contain drop-shadow-2xl transform hover:scale-[1.03] transition-transform duration-300"
            />
            
            <div className="text-center space-y-2 pt-2">
              <h2 className="text-xl font-extrabold text-white tracking-wide leading-snug">
                HỆ THỐNG QUẢN LÝ XẾP HÀNG
              </h2>
              <p className="text-xs text-white/95 font-medium leading-relaxed max-w-xs mx-auto">
                Tối ưu hóa quy trình phục vụ khách hàng, theo dõi thời gian thực và cấp số tự động nhanh chóng.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
