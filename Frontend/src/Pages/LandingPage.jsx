import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../Store/UseAuthStore";
import { Loader2, ArrowRight, Clock, CalendarDays, PieChart, Target } from "lucide-react";

/* ── Floating Mockup Component ── */
const GraphMockup = () => {
  const days = Array.from({ length: 35 });
  
  return (
    <div className="relative w-full max-w-sm mx-auto md:ml-auto md:mr-0 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-[#E1F4F3] shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#E1F4F3] flex items-center justify-center">
          <Target className="w-5 h-5 text-[#333333]" />
        </div>
        <div>
          <div className="w-24 h-3.5 rounded bg-[#333333]/10 mb-2"></div>
          <div className="w-16 h-2.5 rounded bg-[#706C61]/10"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((_, i) => {
          // Pre-determine dummy active squares to simulate typical use
          const isActive = [3, 4, 8, 10, 11, 14, 15, 17, 18, 22, 23, 24, 25, 29, 31, 32].includes(i);
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2, type: "spring", stiffness: 200 }}
              className={`w-full aspect-square rounded-sm ${isActive ? 'bg-[#333333]' : 'bg-[#E1F4F3] border border-[#706C61]/5'}`}
            />
          );
        })}
      </div>
      
      {/* Little floating element simulating analytics/streak callout */}
      <motion.div 
        animate={{ y: [-6, 6, -6] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -bottom-4 bg-[#FFFFFF] rounded-lg p-3 border border-[#E1F4F3] shadow-lg flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-[#333333]"></div>
        <span className="text-xs font-semibold text-[#333333]">Active Streak</span>
      </motion.div>
    </div>
  );
};

/* ── Main Landing Page ── */
const LandingPage = () => {
  const { authUser, isCheckingAuth } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans selection:bg-[#E1F4F3] selection:text-[#333333]">
      {/* Shared Navbar Strip across landing routes */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#FFFFFF]/80 backdrop-blur-md border-b border-[#E1F4F3]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-[#333333]" />
            <span className="font-bold text-lg text-[#333333]">RoutineX</span>
          </div>
          <div>
            {!isCheckingAuth && !authUser && (
              <Link to="/login" className="text-sm font-medium text-[#706C61] hover:text-[#333333] transition-colors">
                Log in
              </Link>
            )}
            {!isCheckingAuth && authUser && (
              <Link to="/dashboard" className="text-sm font-medium text-[#706C61] hover:text-[#333333] transition-colors">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E1F4F3] rounded-full blur-[100px] opacity-60 -z-10 animate-pulse"></div>
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#E1F4F3] rounded-full blur-[90px] opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center overflow-visible">
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#333333] leading-[1.15] mb-6">
              Master Your Routine. <br />
              <span className="text-[#333333]/90">Reclaim Your Time.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#706C61] mb-8 max-w-lg leading-relaxed">
              Track, measure, and grow with a simple time-blocking system built for deep work and unshakeable consistency.
            </p>
            
            {/* Dynamic Authenticated Button */}
            <div className="mt-2">
              {isCheckingAuth ? (
                <button disabled className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#333333] text-[#FFFFFF] rounded-lg font-medium opacity-70 cursor-not-allowed transition-all">
                  <Loader2 className="w-5 h-5 animate-spin text-[#FFFFFF]" />
                  Loading...
                </button>
              ) : authUser ? (
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#333333] text-[#FFFFFF] rounded-lg font-medium hover:scale-[1.03] hover:shadow-lg transition-transform duration-200">
                  Go to Dashboard <ArrowRight className="w-5 h-5 text-[#E1F4F3]" />
                </Link>
              ) : (
                <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#333333] text-[#FFFFFF] rounded-lg font-medium hover:scale-[1.03] hover:shadow-lg transition-transform duration-200">
                  Start Tracking for Free <ArrowRight className="w-5 h-5 text-[#E1F4F3]" />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative z-10"
          >
            <GraphMockup />
          </motion.div>
        </div>
      </section>

      {/* Features Bento Box */}
      <section className="py-24 bg-[#FAFAFA] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">Why RoutineX?</h2>
            <p className="text-[#706C61] text-lg">Built for focus, designed for clarity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-[#FFFFFF] border border-[#E1F4F3] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E1F4F3] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#333333]" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">Time-Blocked Tasks</h3>
              <p className="text-[#706C61] leading-relaxed">
                Schedule your day with precision. Only mark tasks complete within their active time window to stay fully invested in the present.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FFFFFF] border border-[#E1F4F3] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E1F4F3] flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6 text-[#333333]" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">GitHub-Style Consistency</h3>
              <p className="text-[#706C61] leading-relaxed">
                Gamify your habits. Build streaks and view your 30-day performance in a beautiful, grid-based history chart that rewards showing up.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FFFFFF] border border-[#E1F4F3] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E1F4F3] flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6 text-[#333333]" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">Deep Analytics</h3>
              <p className="text-[#706C61] leading-relaxed">
                Gain actionable insights. Break down your routine performance with beautiful dynamic charts to see exactly where your time goes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-[#E1F4F3] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#706C61]" />
            <span className="font-bold text-[#706C61]">RoutineX</span>
          </div>
          <p className="text-sm text-[#706C61]">
            &copy; {new Date().getFullYear()} Routine Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;