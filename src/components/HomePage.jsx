import { Heart, UserCircle, LogIn, ArrowRight } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// import React from 'react';

const HomePage = ({ enableGuestMode }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 mb-6">
            <Heart className="w-16 h-16 text-blue-500 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            CuddleUp
          </h1>
          <p className="text-xl text-gray-600 font-light px-4">
          Capture the Quiet in Your Heart
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Buttons Container */}
          <div className="space-y-4">
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
              onClick={() => navigate("/login")}
            >
              <LogIn className="w-5 h-5" />
              Log In
              <FcGoogle className="w-5 h-5" />
            </Button>
            
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => navigate("/signUp")}
            >
              <UserCircle className="w-5 h-5" />
              Sign Up
              <FcGoogle className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full h-14 text-lg border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/50"
              onClick={enableGuestMode}
            >
              Continue as Guest
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
        </div>
        {/* <p className="mt-4 text-sm text-gray-600">
          Guest mode allows you to try our app without creating an account.
          <br />
          Note: Your data won't be saved in guest mode.
        </p> */}
        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 transition-transform duration-200 hover:-translate-y-0.5">
            🎯 Track Mood
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 transition-transform duration-200 hover:-translate-y-0.5">
            📊 Get Insights
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 transition-transform duration-200 hover:-translate-y-0.5">
            🔒 Private & Secure
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;