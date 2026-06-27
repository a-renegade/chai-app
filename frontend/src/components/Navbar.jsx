import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser, userType } = useAuthStore();
  const [showManageMenu, setShowManageMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8EC]/90 backdrop-blur-md border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
            ☕
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Chai
            <span className="text-orange-500">Bolo</span>
            Chai
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {authUser ? (
            <>
              <Link
                to="/"
                className="rounded-full px-5 py-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600"
              >
                Home
              </Link>

              {userType === "ADMIN" && (
                <div className="relative">
                  <button
                    onClick={() => setShowManageMenu(!showManageMenu)}
                    className="rounded-full px-5 py-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600"
                  >
                    Manage
                  </button>

                  {showManageMenu && (
                    <div className="absolute right-0 mt-3 w-52 rounded-xl border border-orange-100 bg-white shadow-xl overflow-hidden">
                      <Link
                        to="/manage/users"
                        className="block px-4 py-3 hover:bg-orange-50"
                      >
                        Manage Users
                      </Link>

                      <Link
                        to="/manage/shops"
                        className="block px-4 py-3 hover:bg-orange-50"
                      >
                        Manage Shops
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <Link
                to="/profile"
                className="rounded-full px-5 py-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="rounded-full bg-orange-500 px-5 py-2 font-medium text-white shadow transition hover:bg-orange-600 hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-orange-500 px-5 py-2 font-medium text-white shadow transition hover:bg-orange-600 hover:shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;