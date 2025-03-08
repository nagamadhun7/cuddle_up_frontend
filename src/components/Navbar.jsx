import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Navbar({ user, isGuest }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false); // Close menu when logging out
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Close menu when navigating
    navigate(path);
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4 shadow-lg text-sm rounded-lg sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Left Side: Logo and App Name */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/logo.png"
              alt="Felora Logo"
              className="h-8 md:h-10 cursor-pointer"
              onClick={() => handleNavigation("/mood-capture")}
            />
            <span
              className="text-xl md:text-2xl font-semibold text-indigo-700 tracking-tight cursor-pointer"
              onClick={() => handleNavigation("/mood-capture")}
            >
              Cuddle Up
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/premium-features"
              className="text-[14px] text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-300 animate-pulseFast italic"
              onClick={() => setIsMenuOpen(false)}
            >
              ⭐️ Premium Features ⭐️
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[14px] text-gray-800 font-bold shadow-sm p-2 rounded-lg hover:text-white bg-violet-400 hover:bg-violet-500 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}

            {isGuest && (
              <>
                <Link to="/login" 
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
                
                >
                  Login
                </Link>
                <Link to="/signUp"
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
              >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-violet-100 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-3">
            <Link
              to="/premium-features"
              className="block text-[14px] text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-300 animate-pulseFast italic py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ⭐️ Premium Features ⭐️
            </Link>
            {user ? (
              <>
            <Link
              to="/profile"
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-[14px] text-gray-800 font-bold shadow-sm p-2 rounded-lg hover:text-white bg-violet-400 hover:bg-violet-500 transition-all duration-300"
            >
              Logout
            </button>
            </>
            ) : (
              <>
               <Link
              to="/login"
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
              // onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="block text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300 py-2"
              // onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
              </>
            )}
          </div>
        )}
        
      </div>
    </nav>
  );
}

export default Navbar;