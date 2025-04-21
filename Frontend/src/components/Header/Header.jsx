import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { admin, adminLogout } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (admin) {
        await adminLogout();
      } else if (user) {
        await logout();
      }
    } finally {
      setIsLoggingOut(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-lg border-b border-cyan-400">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {admin ? (
            <span className="text-lg font-bold">
              Welcome, {admin?.adminname} <span className="text-cyan-400">(as Admin)</span>
            </span>
          ) : user ? (
            <>
              <img
                src={user?.avatar}
                alt="User Photo"
                className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
              />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {user?.username}
              </span>
            </>
          ) : (
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Mess Management System
            </span>
          )}
        </div>

        {/* Right Section for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-slate-800 text-cyan-400 shadow-lg shadow-cyan-500/30 hover:bg-slate-700 transition-all duration-300"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Middle Section: Navigation (Visible on Desktop) */}
        {(admin || user) && (
          <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
            {admin ? (
              <>
                <Link
                  to="/admin/home"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin-register"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Create a New Admin
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/myaccount"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  My Account
                </Link>
                <Link
                  to="/userhome"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Home
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Right Section: Logout Button (Visible on Desktop) */}
        <div className="hidden lg:block">
          {admin ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 ${
                isLoggingOut ? 'opacity-75 cursor-wait' : 'hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging Out...
                </>
              ) : (
                <>
                  <LogOut size={18} className="mr-2" />
                  Logout
                </>
              )}
            </button>
          ) : user ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 ${
                isLoggingOut ? 'opacity-75 cursor-wait' : 'hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging Out...
                </>
              ) : (
                <>
                  <LogOut size={18} className="mr-2" />
                  Logout
                </>
              )}
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-800/95 backdrop-blur-sm text-white shadow-xl shadow-cyan-500/10 rounded-lg mt-2 mx-6 p-4 border border-slate-700">
          <ul className="space-y-4">
            {admin ? (
              <>
                <li>
                  <Link
                    to="/admin/home"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-register"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create a New Admin
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`flex items-center w-full text-left text-lg font-semibold ${
                      isLoggingOut ? 'text-cyan-300' : 'text-cyan-400 hover:text-cyan-300'
                    } transition`}
                  >
                    {isLoggingOut ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging Out...
                      </>
                    ) : (
                      <>
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </>
                    )}
                  </button>
                </li>
              </>
            ) : user ? (
              <>
                <li>
                  <Link
                    to="/myaccount"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/userhome"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`flex items-center w-full text-left text-lg font-semibold ${
                      isLoggingOut ? 'text-cyan-300' : 'text-cyan-400 hover:text-cyan-300'
                    } transition`}
                  >
                    {isLoggingOut ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging Out...
                      </>
                    ) : (
                      <>
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </>
                    )}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-lg font-semibold hover:text-emerald-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block text-lg font-semibold hover:text-purple-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;