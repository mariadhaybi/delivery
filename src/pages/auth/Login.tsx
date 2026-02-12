import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Mail, Lock, Eye, EyeOff, UserRound, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);

      // Redirect based on role
      if (user?.role === "company") navigate("/company/dashboard");
      else if (user?.role === "driver") navigate("/driver/dashboard");
      else if (user?.role === "admin") navigate("/admin");
      else navigate("/"); // fallback
    } catch (error: any) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-white overflow-hidden">
      <div className="absolute -left-20 top-10 w-64 h-64 bg-orange-500 opacity-30 rounded-2xl blur-2xl z-0" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-orange-500 opacity-30 rounded-2xl blur-2xl z-0" />

      <div className="w-[420px] bg-white rounded-xl p-6 relative z-10 ">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-[#E05C00] rounded-xl flex items-center justify-center">
            <UserRound size={28} className="text-white stroke-[2px]" />
          </div>
        </div>

        <h2 className="font-[Poppins] text-[#232323] text-center text-lg font-medium">Login</h2>
        <p className="font-[Poppins] text-center text-[#5F5F5F] text-sm mb-6">
          Welcome back! Please log in to your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium">Email</label>
          <div className="mt-1 mb-4 flex items-center border border-gray-300 rounded-lg px-3 h-11">
            <Mail size={16} className="text-gray-400" />
            <input
              type="email"
              placeholder="example@loopdelivery.com"
              className="ml-2 w-full outline-none text-sm"
              value={email}                  // ← ربطنا القيمة بالـ state
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <label className="font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium">Password</label>
          <div className="mt-1 mb-6 flex items-center border border-gray-300 rounded-lg px-3 h-11">
            <Lock size={16} className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="ml-2 w-full outline-none text-sm"
              value={password}               // ← ربطنا القيمة بالـ state
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D95F08] hover:bg-[#b54f06] text-white h-11 rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all "
          >
            {loading ? (
              "Logging in..."
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Login</span>
                <LogIn size={18} className="stroke-[2.5px]" />
              </div>
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p className="text-gray-500">
            Don’t Have An Account?
            <span
              className="text-orange-500 cursor-pointer ml-1"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
