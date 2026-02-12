import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; // 1. استيراد navigate
import axios from "axios";

export default function Register() {
  const navigate = useNavigate(); // 2. تعريف الهوك
  
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<"company" | "driver">("company");
  const [agreed, setAgreed] = useState(false);
  const [, setLoading] = useState(false); // حالة التحميل
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", 
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // 2. إرسال البيانات مع الـ phone
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // تأكد إن الـ Backend بيستقبله
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: accountType 
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/", { state: { role: accountType } });
      }
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStepChange = (newStep: 1 | 2) => {
    setStep(newStep);
    setAccountType(newStep === 1 ? "company" : "driver");
  };

  
  const inputStyle = "w-full pl-10 pr-12 py-2.5 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#e45d05] bg-white text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -left-20 top-10 w-64 h-64 bg-orange-600 opacity-40 rounded-2xl blur-3xl z-0" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-orange-600 opacity-30 rounded-2xl blur-3xl z-0" />

      <div className="bg-white w-full max-w-2xl p-8 rounded-xl relative z-10 shadow-sm border border-gray-100">
        <h2 className=" font-['Tajawal'] size-40px text-center text-2xl font-bold text-[#232323] mb-1">Loop Delivery</h2>
        <p className=" font-['Poppins'] text-center  text-m  leading-[24px]   text-[#232323] mb-1 font-medium">Create A New Password </p>
        <p className="font-['Poppins'] text-center text-xs text-[#5f5f5f] mb-8">complete the following information to create your account</p>

        {/* STEPPER */}
        <div className="flex items-center justify-center mb-10">
          <div
            onClick={() => handleStepChange(1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold cursor-pointer transition-all border-2
            ${step === 1 ? " font-[Poppins] bg-[#E05C00] text-white border-[#E05C00]" : "bg-white text-[#E05C00] border-[#E05C00]"}`}
          >
            1
          </div>
          <div className="w-20 h-[3px] bg-gray-300 mx-0" />
          <div
            onClick={() => handleStepChange(2)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold cursor-pointer transition-all border-2
            ${step === 2 ? "font-[Poppins] bg-[#E05C00] text-white border-[#E05C00]" : "bg-white text-[#E05C00] border-[#E05C00]"}`}
          >
            2
          </div>
        </div>

        {/* ACCOUNT TYPE SELECTION */}
        <div className="mb-6">
          <label className= {`font-[Poppins] text-[#232323] text-m leading-[22px] font-medium`}>Account Type</label>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => handleStepChange(1)}
              className={`flex-1 py-3 rounded-3xl font-thin transition-all border-2 
              ${accountType === "company" ? "bg-[#e45d05] font-[Poppins] text-[#FCEFE6] border-[#e45d05]" : "bg-white font-[Poppins] text-[#5F5F5F] border-gray-300"}`}
            >
              Company
            </button>
            <button
              type="button"
              onClick={() => handleStepChange(2)}
              className={`flex-1 py-3 rounded-3xl font-thin transition-all border-2
              ${accountType === "driver" ? "bg-[#e45d05] font-[Poppins] text-[#FCEFE6] border-[#e45d05]" : "bg-white font-[Poppins] text-[#5F5F5F] border-gray-300"}`}
            >
              Driver
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <label className={`font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium`}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input className={inputStyle} placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={`font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium`}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="email" className={inputStyle} placeholder="example@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={`font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium`}>Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input className={inputStyle} placeholder="961xxxxxxxx" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
          </div>

          <div className="hidden md:block" />

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className={`font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium`}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                className={inputStyle} 
                placeholder="password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className={`font-[Poppins] text-[#232323] text-sm leading-[30px] font-medium`}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className={inputStyle} 
                placeholder="confirm password" 
                required 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="md:col-span-2 mt-2">
            <div className="flex items-center gap-2 mb-6">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#e45d05] cursor-pointer" 
                required
              />
              <label className=" font-[Poppins] text-[11px] md:text-xs text-[#232323] font-medium">
                I Agree To The <span className="text-[#e45d05] underline cursor-pointer">Privacy Policy</span> And <span className="text-[#e45d05] underline cursor-pointer">Terms & Conditions</span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!agreed}
                className={`w-full max-w-xs py-3.5 rounded-xl font-[Poppins] text-[#FCEFE6] transition-all shadow-md active:scale-95
                  ${agreed ? "bg-[#e45d05] hover:bg-[#c44e04]" : "bg-[#e45d05] opacity-60 cursor-not-allowed"}`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}