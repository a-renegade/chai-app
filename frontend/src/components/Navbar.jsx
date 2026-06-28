import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser, userType } = useAuthStore();
  const [showManageMenu, setShowManageMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200 bg-[#FFF8EC]/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
            Tea
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Chai
            <span className="text-orange-500">Bolo</span>
            Chai
          </h1>
        </Link>

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
                    onClick={() => setShowManageMenu((isOpen) => !isOpen)}
                    className="rounded-full px-5 py-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600"
                  >
                    Manage
                  </button>

                  {showManageMenu && (
                    <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl border border-orange-100 bg-white shadow-xl">
                      <Link
                        to="/profile"
                        onClick={() => setShowManageMenu(false)}
                        className="block px-4 py-3 hover:bg-orange-50"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/add-shop"
                        onClick={() => setShowManageMenu(false)}
                        className="block px-4 py-3 hover:bg-orange-50"
                      >
                        Add Shop
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
