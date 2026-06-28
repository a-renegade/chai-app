import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddShopPage from "./pages/AddShopPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Protected */}
        <Route
          path="/add-shop"
          element={authUser ? <AddShopPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/shop/:shopId"
          element={authUser ? <ShopPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
