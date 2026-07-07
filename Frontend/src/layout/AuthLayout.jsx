import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

function AuthLayout() {
  const user = useSelector((state) => state.auth.user);
  const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthResolved) {
      return;
    }

    if (!user) {
      navigate("/admin/login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthResolved, user, navigate, location]);

  if (!isAuthResolved) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage:
              "linear-gradient(#2ec5d4 1px, transparent 1px), linear-gradient(90deg, #2ec5d4 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-teal-600 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
            Verifying Credentials...
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Authenticating secure session...
          </p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : null;
}

export default AuthLayout;
