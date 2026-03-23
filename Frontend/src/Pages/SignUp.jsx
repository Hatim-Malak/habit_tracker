import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/UseAuthStore";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import PremiumPanel from "../Components/PremiumPanel";

const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, endAdornment }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#706C61] group-focus-within:text-[#333333] transition-colors duration-300">
      <Icon className="w-[18px] h-[18px]" />
    </div>
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      required
      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white border border-[#E1F4F3] shadow-sm text-[#333333] text-sm placeholder:text-[#706C61]/60 outline-none transition-all duration-300 focus:border-[#333333] focus:shadow-md focus:ring-4 focus:ring-[#E1F4F3]" 
    />
    {endAdornment && <div className="absolute right-4 top-1/2 -translate-y-1/2">{endAdornment}</div>}
  </div>
);

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAuth();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signUp({ username: formData.username, email: formData.email, password: formData.password });
    if (success) navigate("/login", { state: { fromSignup: true } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-bl from-[#FFFFFF] to-[#FAFAFA]">
      
      {/* LEFT: animated panel */}
      <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block md:w-1/2 min-h-screen">
        <PremiumPanel />
      </motion.div>

      {/* RIGHT: form */}
      <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 py-12 md:px-12 md:ml-auto relative z-10">
        <div className="w-full max-w-md">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-2 tracking-tight">Create Account</h1>
            <p className="text-[#706C61] font-medium text-sm mb-8">Start building better routines today.</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col gap-5">
            <InputField icon={User} type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            <InputField icon={Mail} type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} />
            <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange}
              endAdornment={
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-[#706C61] hover:text-[#333333] transition-colors cursor-pointer" tabIndex={-1}>
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              } />

            <motion.button type="submit" disabled={isSigningUp} 
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="group mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#333333] hover:bg-[#3f3f3f] text-[#FFFFFF] shadow-inner border border-[#333333] font-semibold text-sm cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSigningUp ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4 text-[#FFFFFF]" />
                  Creating account…
                </span>
              ) : (
                <>
                  Sign Up 
                  <ArrowRight className="w-4 h-4 text-[#E1F4F3] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 text-center text-sm text-[#706C61] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#333333] font-bold hover:text-[#333333] hover:underline underline-offset-4 decoration-2 decoration-[#E1F4F3] transition-all">
              Log in
            </Link>
          </motion.p>
        </div>
      </motion.div>
      
    </motion.div>
  );
};

export default SignUp;