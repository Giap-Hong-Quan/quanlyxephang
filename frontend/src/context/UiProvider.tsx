import { createContext, useContext, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

type UIContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(false);

  return (
    <UIContext.Provider value={{ loading, setLoading }}>
      {children}

      {/* Global Claymorphism Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="clay-card p-8 flex flex-col items-center gap-4 max-w-xs w-full text-center transform scale-105 transition-transform duration-300">
            <div className="relative flex items-center justify-center">
              {/* Outer soft spinning ring */}
              <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
              <div className="absolute p-3 rounded-full bg-orange-500 text-white shadow-md">
                <Sparkles size={20} className="animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-base text-slate-800 tracking-wide">ALTA QUEUE</span>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 animate-pulse">
                Đang xử lý dữ liệu...
              </span>
            </div>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return ctx;
};