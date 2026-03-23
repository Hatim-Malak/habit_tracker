import { motion } from "framer-motion";
import { CheckCircle, BarChart3, CalendarDays } from "lucide-react";

const PremiumPanel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#E1F4F3] flex items-center justify-center">
      {/* Background Dot Matrix Pattern (Technical/Developer Feel) */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#706C61 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Hero Container for 3D Cards */}
      <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
        
        {/* Card 1: Back/Left (Mock Calendar Grid) */}
        <motion.div
          animate={{ y: [-15, 10, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-8 top-12 w-64 bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-[#706C61]" />
            <div className="w-20 h-2.5 rounded bg-[#333333]/20" />
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ backgroundColor: "rgba(225, 244, 243, 0.5)" }}
                animate={{ 
                  backgroundColor: [1, 5, 8, 12, 14, 18, 22, 26].includes(i) ? ["rgba(225, 244, 243, 0.5)", "#333333", "#333333"] : "rgba(225, 244, 243, 0.5)"
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  repeatType: "reverse"
                }}
                className="w-full aspect-square rounded-sm"
              />
            ))}
          </div>
        </motion.div>

        {/* Card 3: Floating Right (Mini Stats Bar Chart) */}
        <motion.div
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-4 top-32 w-52 bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-[#706C61]" />
            <div className="w-16 h-2.5 rounded bg-[#333333]/20" />
          </div>
          <div className="flex items-end gap-2 h-24 mt-2">
            {[40, 75, 45, 95, 65].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: "20%" }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.2 }}
                className="flex-1 bg-[#333333] rounded-t-sm"
              />
            ))}
          </div>
        </motion.div>

        {/* Card 2: Front/Center (Daily Task Pulse) */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute z-20 w-80 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <CheckCircle className="w-10 h-10 text-[#333333]" />
            </motion.div>
            <div className="flex-1 space-y-2.5">
              <div className="w-3/4 h-3.5 rounded bg-[#333333]/80" />
              <div className="w-1/2 h-2.5 rounded bg-[#706C61]/40" />
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/50 border border-white/40">
                <div className="w-4 h-4 rounded-full border-2 border-[#E1F4F3] bg-white text-transparent flex justify-center items-center text-[8px] font-bold" />
                <div className="w-2/3 h-2 rounded bg-[#706C61]/20" />
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Center Text Overlay */}
      <div className="absolute bottom-20 inset-x-0 flex flex-col items-center justify-center z-30 px-8 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-2xl lg:text-3xl font-extrabold text-[#333333] tracking-tight text-center leading-snug"
        >
          Routine, Perfected.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm font-medium text-[#706C61] mt-2 text-center"
        >
          Watch your daily habits compound into success.
        </motion.p>
      </div>
    </div>
  );
};

export default PremiumPanel;
