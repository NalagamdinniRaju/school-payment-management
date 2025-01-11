import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  School,
  FileSearch,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-base ${
          isActive
            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-4 my-2">
        <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  TransactPro
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <NavLink to="/dashboard" icon={LayoutDashboard}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/school-transactions" icon={School}>
                      Schools
                    </NavLink>
                    <NavLink to="/transaction-status" icon={FileSearch}>
                      Status
                    </NavLink>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 text-gray-700 dark:text-gray-200"
                    >
                      {darkMode ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              {/* <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div> */}
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="px-4 py-3 space-y-2">
                {isAuthenticated ? (
                  <>
                    <NavLink to="/dashboard" icon={LayoutDashboard}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/school-transactions" icon={School}>
                      Schools
                    </NavLink>
                    <NavLink to="/transaction-status" icon={FileSearch}>
                      Status
                    </NavLink>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-200"
                    >
                      {darkMode ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
