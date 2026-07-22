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
      toast.error("Vui lòng điền đầy đủ Email và Mật khẩu");
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
      {/* Email Input */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5" htmlFor="email">
          <Mail size={14} className="text-orange-500" />
          <span>Tên đăng nhập / Email *</span>
        </label>
        <div className="relative">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="clay-input w-full pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 font-medium"
            type="text"
            id="email"
            placeholder="nhapemail@example.com"
          />
          <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-1.5 text-left">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5" htmlFor="password">
          <Lock size={14} className="text-orange-500" />
          <span>Mật khẩu *</span>
        </label>
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="clay-input w-full pl-10 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 font-medium"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
          />
          <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
          <input type="checkbox" className="rounded accent-orange-500" />
          <span>Ghi nhớ đăng nhập</span>
        </label>
        <a href="#forgot" className="text-orange-600 hover:text-orange-700 font-bold hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="clay-btn clay-btn-orange w-full py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 transition-all mt-2"
      >
        <LogIn size={18} />
        <span>{loginMutation.isPending ? "Đang xử lý..." : "ĐĂNG NHẬP"}</span>
      </button>
    </form>
  );
};

export default FormLogin;