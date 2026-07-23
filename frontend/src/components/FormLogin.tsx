import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "../hooks/authQuery";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useUI } from "../context/UiProvider";

const FormLogin = () => {
  const loginMutation = useLogin();
  const { setLoading } = useUI();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu");
      return;
    }

    try {
      setLoading(true);
      await loginMutation.mutateAsync({ email, password });
      toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 w-full">
      {/* Username / Email Field */}
      <div className="space-y-2 text-left">
        <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Tên đăng nhập / Email <span className="text-orange-500 ml-0.5">*</span>
        </label>
        <div className="relative flex items-center">
          <Mail size={19} className="absolute left-4 text-slate-400 pointer-events-none" />
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full h-12 pl-12 pr-4 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400/70 shadow-[inset_2px_2px_5px_rgba(200,210,225,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2 text-left">
        <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Mật khẩu <span className="text-orange-500 ml-0.5">*</span>
        </label>
        <div className="relative flex items-center">
          <Lock size={19} className="absolute left-4 text-slate-400 pointer-events-none" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-12 pl-12 pr-12 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400/70 shadow-[inset_2px_2px_5px_rgba(200,210,225,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-orange-500 focus:outline-none cursor-pointer p-1.5 rounded-xl hover:bg-orange-50 transition-all"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
      </div>

      {/* Options Row */}
      <div className="flex items-center justify-between text-xs pt-1 px-1">
        <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 font-semibold select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-md border-slate-300 text-orange-500 accent-orange-500 cursor-pointer"
          />
          <span>Ghi nhớ đăng nhập</span>
        </label>
        <a href="#forgot" className="text-xs font-bold text-[#FF7506] hover:text-[#E06500] hover:underline transition-colors">
          Quên mật khẩu?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full mt-3 h-12 bg-gradient-to-r from-[#FF7E36] via-[#FF6A18] to-[#EE5000] hover:from-[#FF8A47] hover:to-[#FF5A08] active:scale-[0.99] text-white font-extrabold text-sm md:text-base tracking-wide rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
      >
        <LogIn size={20} strokeWidth={2.5} />
        <span>{loginMutation.isPending ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}</span>
      </button>
    </form>
  );
};

export default FormLogin;