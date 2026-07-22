import React from 'react';
import FormLogin from '../../components/FormLogin';
import anh2login from '../../assets/image/image1.png';
import logo from '../../assets/image/logoalta.png';
import { Sparkles, ShieldCheck } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F2F4F8] flex items-center justify-center p-4 md:p-8 font-sans">
      {/* Clay Outer Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/80">
        
        {/* Left Col: Clay Login Form Card */}
        <div className="p-8 md:p-12 flex flex-col justify-between bg-white/90 relative">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="Alta Logo" className="h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-slate-800 tracking-tight">ALTA QUEUE</span>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  Hệ thống Quản lý Xếp hàng
                </span>
              </div>
            </div>

            <div className="space-y-1 text-left pt-2">
              <h1 className="text-2xl font-black text-slate-800">Đăng Nhập</h1>
              <p className="text-xs font-semibold text-slate-400">
                Nhập thông tin tài khoản của bạn để truy cập hệ thống
              </p>
            </div>

            {/* Form */}
            <FormLogin />
          </div>

          <div className="pt-8 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Bảo mật hệ thống chuẩn Alta Software © 2026</span>
          </div>
        </div>

        {/* Right Col: Clay Hero Banner */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 clay-card-orange rounded-none text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6 max-w-sm">
            <div className="relative inline-block p-4 rounded-3xl bg-white/20 backdrop-blur-md shadow-inner">
              <img src={anh2login} alt="Illustration" className="w-56 h-auto drop-shadow-xl mx-auto" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white backdrop-blur-md mb-2">
                <Sparkles size={14} />
                <span>Giải pháp tự động hóa hàng chờ</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                HỆ THỐNG QUẢN LÝ XẾP HÀNG
              </h2>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                Tối ưu hóa quy trình phục vụ khách hàng, theo dõi thời gian thực và tự động phân luồng cấp số nhanh chóng.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
