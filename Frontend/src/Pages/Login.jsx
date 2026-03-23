import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Store/UseAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, X, Loader2 } from "lucide-react";
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

const Login = () => {
  const { signIn, isSigningIn } = useAuth();
  const location = useLocation();
  const fromSignup = location.state?.fromSignup === true;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showBanner, setShowBanner] = useState(fromSignup);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn({ email: formData.email, password: formData.password });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#FFFFFF] to-[#FAFAFA]">
      
      {/* LEFT: form */}
      <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 py-12 md:px-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Welcome banner */}
          <AnimatePresence>
            {showBanner && (
              <motion.div initial={{ opacity: 0, y: -12, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -12, height: 0 }}
                transition={{ duration: 0.35 }} className="mb-6 bg-[#E1F4F3] rounded-xl px-4 py-3 flex items-center justify-between overflow-hidden shadow-sm border border-[#E1F4F3]/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#333333] shrink-0" />
                  <p className="text-sm font-medium text-[#333333]">✨ Welcome aboard! Please log in to your new account.</p>
                </div>
                <button onClick={() => setShowBanner(false)}
                  className="text-[#706C61] hover:text-[#333333] transition-colors cursor-pointer ml-2 shrink-0 bg-transparent border-none">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-[#706C61] font-medium text-sm mb-8">Log in to continue your streak.</p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col gap-5">
            <InputField icon={Mail} type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} />
            <InputField icon={Lock} type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange}
              endAdornment={
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-[#706C61] hover:text-[#333333] transition-colors cursor-pointer" tabIndex={-1}>
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              } />

            <motion.button type="submit" disabled={isSigningIn} 
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="group mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#333333] hover:bg-[#3f3f3f] text-[#FFFFFF] shadow-inner border border-[#333333] font-semibold text-sm cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSigningIn ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4 text-[#FFFFFF]" />
                  Signing in…
                </span>
              ) : (
                <>
                  Log In 
                  <ArrowRight className="w-4 h-4 text-[#E1F4F3] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 text-center text-sm text-[#706C61] font-medium">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#333333] font-bold hover:text-[#333333] hover:underline underline-offset-4 decoration-2 decoration-[#E1F4F3] transition-all">
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* RIGHT: animated panel */}
      <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="hidden md:block md:w-1/2 min-h-screen">
        <PremiumPanel />
      </motion.div>
    </motion.div>
  );
};

export default Login;