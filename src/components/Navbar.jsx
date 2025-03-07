// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signOut } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const Navbar = () => {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//       signOut(auth)
//         .then(() => {
//           console.log("User logged out successfully");
//           // Optionally, you can navigate to a different page, e.g. login page
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error("Error logging out:", error.message);
//         });
//     };
//   return (
//     <nav className="backdrop-blur-md bg-white/70 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4 shadow-lg h-16 text-sm rounded-lg sticky top-0 z-50 flex justify-between items-center w-full">
//       {/* Left Side: Logo and App Name */}
//       <div className="flex items-center align-middle space-x-4">
//         {/* Replace the text with your logo */}
//         <img src="/images/logo.png" alt="Felora Logo" className="h-10" />
//         <span className="text-2xl font-semibold text-indigo-700 tracking-tight cursor-pointer" onClick={() => navigate('/mood-capture')}>Cuddle Up</span>
//       </div>

//       {/* Right Side: Navigation Links */}
//       <div className="flex items-center space-x-8">
//       <Link
//           to="/premium-features"
//           className="text-[14px] text-blue-600 font-semibold hover:text-indigo-600 transition-all duration-300 animate-pulseFast italic"
//         >
//          ⭐️ Premium Features ⭐️
//         </Link>
//         <Link
//           to="/profile"
//           className="text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300"
//         >
//           Profile
//         </Link>
//         <Link
//           to="/dashboard"
//           className="text-[14px] text-gray-800 font-medium hover:text-indigo-600 transition-all duration-300"
//         >
//           Dashboard
//         </Link>
//         <button
//           onClick={handleLogout} // Handle logout functionality here
//           className="text-[14px] text-gray-800 font-bold shadow-sm p-2 rounded-lg hover:text-white bg-violet-400 transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";


function Navbar() {
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
            <img src="/images/logo.png" alt="Felora Logo" className="h-8 md:h-10" />
            <span 
              className="text-xl md:text-2xl font-semibold text-indigo-700 tracking-tight cursor-pointer" 
              onClick={() => handleNavigation('/mood-capture')}
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
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;













