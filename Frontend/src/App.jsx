import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Store/UseAuthStore";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import LandingPage from "./Pages/LandingPage"; // 1. Imported Landing Page
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import DashboardPage from "./Pages/DasboardPage";
import CreateRoutine from "./Pages/CreateRoutine";

/* ── loading spinner ── */
const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-[#333333] animate-spin" />
      <p className="text-sm text-[#706C61] tracking-wide">Loading…</p>
    </div>
  </div>
);

/* ── protected route wrapper (Updated) ── */
const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuth();
  // We check auth HERE now. So if they refresh /dashboard, they see a loader, not the login page.
  if (isCheckingAuth) return <FullScreenLoader />;
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
};

/* ── auth route wrapper (New) ── */
// This prevents the login/signup forms from "flashing" on the screen for a split second 
// if a logged-in user accidentally types /login in the URL bar.
const AuthRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuth();
  if (isCheckingAuth) return <FullScreenLoader />;
  if (authUser) return <Navigate to="/dashboard" replace />;
  return children;
};

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Notice: The global `if (isCheckingAuth)` is GONE! 
  // The app will immediately render the router.

  return (
    <>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            
            {/* ── Public Landing Route ── */}
            <Route path="/" element={<LandingPage />} />

            {/* ── Auth Routes ── */}
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />

            {/* ── Protected Routes ── */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-routine"
              element={
                <ProtectedRoute>
                  <CreateRoutine />
                </ProtectedRoute>
              }
            />

            {/* ── Fallback ── */}
            {/* Now defaults back to the landing page instead of login */}
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </AnimatePresence>
      </BrowserRouter>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333333",
            color: "#FFFFFF",
            borderRadius: "8px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};

export default App;