import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Store/UseAuthStore";
import { useTask } from "../Store/UseTaskStore";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, LayoutDashboard, LogOut, Menu, X, Trash2, RefreshCw, Plus, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { logout, authUser } = useAuth();
  const { history, deleteRoutine, updateAllandresettask, getHistoryForGraph, getStatsForGraph, updatingAllTask } = useTask();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tasks, setTasks] = useState([{ title: "", startTime: "", endTime: "" }]);

  const isActive = (path) => location.pathname === path;

  // Pre-fill tasks when opening modal
  useEffect(() => {
    if (isUpdateModalOpen) {
      if (history && history.length > 0) {
        // Map history to task objects
        const prefilledTasks = history.map(h => ({
          title: h.taskName || h.name || "",
          startTime: h.startTime || "",
          endTime: h.endTime || ""
        }));
        setTasks(prefilledTasks);
      } else {
        setTasks([{ title: "", startTime: "", endTime: "" }]);
      }
    }
  }, [isUpdateModalOpen, history]);

  const handleDeleteRoutine = async () => {
    if (window.confirm("Are you sure you want to delete the entire routine? This action cannot be undone.")) {
      await deleteRoutine();
      await getHistoryForGraph();
      await getStatsForGraph();
    }
  };

  const handleAddRow = () => setTasks([...tasks, { title: "", startTime: "", endTime: "" }]);
  
  const handleRemoveRow = (index) => {
    if (tasks.length > 1) {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };

  const handleChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const handleUpdateRoutine = async (e) => {
    e.preventDefault();
    for (let t of tasks) {
      if (!t.title.trim() || !t.startTime || !t.endTime) {
        toast.error("Please fill all fields for every task.");
        return;
      }
    }

    const payload = tasks.map(t => {
      const formatTime = (timeStr) => timeStr.split(":").length === 2 ? `${timeStr}:00` : timeStr;
      return {
        title: t.title,
        startTime: formatTime(t.startTime),
        endTime: formatTime(t.endTime)
      };
    });

    await updateAllandresettask(payload);
    setIsUpdateModalOpen(false);
    await getHistoryForGraph();
    await getStatsForGraph();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#FFFFFF]/70 backdrop-blur-xl border-b border-[#E1F4F3] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Left: User avatar + greeting ── */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E1F4F3] flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-[#333333]" />
              </div>
              <span className="font-bold text-xl text-[#333333]">
                Hi, {authUser?.username || "User"} 
              </span>
            </div>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={handleDeleteRoutine}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#706C61] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border border-transparent"
                title="Delete Entire Routine"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden lg:inline">Delete Routine</span>
              </button>
              
              <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#706C61] hover:text-[#333333] hover:bg-[#E1F4F3]/50 transition-colors cursor-pointer bg-transparent border border-[#E1F4F3]"
                title="Reset/Update Routine"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden lg:inline">Update Routine</span>
              </button>

              <Link to="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                  isActive("/dashboard") ? "bg-[#E1F4F3] text-[#333333]" : "text-[#706C61] hover:text-[#333333] hover:bg-[#E1F4F3]/50"
                }`}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#706C61] hover:text-[#333333] hover:bg-red-50 transition-all duration-200 cursor-pointer bg-transparent border-none">
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-[#333333] hover:bg-[#E1F4F3] transition-colors bg-transparent border-none cursor-pointer">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[#E1F4F3] bg-[#FFFFFF]/90 backdrop-blur-xl">
              <div className="px-4 py-3 flex flex-col gap-1">
                <button onClick={() => { setMobileOpen(false); setIsUpdateModalOpen(true); }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#706C61] hover:text-[#333333] hover:bg-[#E1F4F3]/50 transition-colors cursor-pointer bg-transparent border-none text-left w-full">
                  <RefreshCw className="w-4 h-4" />
                  Update Routine
                </button>
                <button onClick={() => { setMobileOpen(false); handleDeleteRoutine(); }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none text-left w-full">
                  <Trash2 className="w-4 h-4" />
                  Delete Routine
                </button>
                <hr className="border-[#E1F4F3] my-1" />
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                    isActive("/dashboard") ? "bg-[#E1F4F3] text-[#333333]" : "text-[#706C61] hover:text-[#333333] hover:bg-[#E1F4F3]/50"
                  }`}>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={() => { setMobileOpen(false); logout(); }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#706C61] hover:text-[#333333] hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none text-left w-full">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Update Routine Modal ── */}
      <AnimatePresence>
        {isUpdateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsUpdateModalOpen(false)}
              className="absolute inset-0 bg-[#333333]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#E1F4F3] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#FFFFFF] border-b border-[#E1F4F3] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-[#333333]">Update Routine</h2>
                  <p className="text-xs text-[#706C61] mt-0.5">Edit or Reset your daily tasks.</p>
                </div>
                <button 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#E1F4F3] text-[#706C61] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleUpdateRoutine} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    {tasks.map((task, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border border-[#E1F4F3] rounded-xl bg-[#FAFAFA]">
                        <div className="flex-1 w-full">
                          <label className="block text-xs font-medium text-[#706C61] mb-1">Task Title</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g., Morning Workout"
                            value={task.title}
                            onChange={(e) => handleChange(idx, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#E1F4F3] rounded-lg focus:outline-none focus:border-[#333333] transition-colors text-[#333333] text-sm bg-[#FFFFFF]"
                          />
                        </div>
                        <div className="w-full sm:w-auto flex items-center gap-3">
                          <div>
                            <label className="block text-xs font-medium text-[#706C61] mb-1">Start Time</label>
                            <input 
                              type="time" 
                              required
                              value={task.startTime}
                              onChange={(e) => handleChange(idx, "startTime", e.target.value)}
                              className="w-full px-3 py-2 border border-[#E1F4F3] rounded-lg focus:outline-none focus:border-[#333333] transition-colors text-[#333333] text-sm bg-[#FFFFFF]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#706C61] mb-1">End Time</label>
                            <input 
                              type="time" 
                              required
                              value={task.endTime}
                              onChange={(e) => handleChange(idx, "endTime", e.target.value)}
                              className="w-full px-3 py-2 border border-[#E1F4F3] rounded-lg focus:outline-none focus:border-[#333333] transition-colors text-[#333333] text-sm bg-[#FFFFFF]"
                            />
                          </div>
                          {tasks.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveRow(idx)}
                              className="mt-5 p-2 bg-transparent border-none rounded-lg text-[#706C61] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Remove Task"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#E1F4F3]">
                    <button 
                      type="button" 
                      onClick={handleAddRow}
                      className="flex items-center gap-2 text-sm font-medium text-[#333333] bg-[#E1F4F3] hover:opacity-80 px-4 py-2 rounded-lg transition-all cursor-pointer border-none"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Task
                    </button>

                    <button 
                      type="submit" 
                      disabled={updatingAllTask}
                      className="flex items-center gap-2 text-sm font-medium text-[#FFFFFF] bg-[#333333] hover:bg-[#1a1a1a] px-6 py-2 rounded-lg transition-all cursor-pointer border-none disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {updatingAllTask ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Update Routine
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;