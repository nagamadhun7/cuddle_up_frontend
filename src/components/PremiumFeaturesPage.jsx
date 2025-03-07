import React from 'react';
import { BarChart, PieChart, Calendar, Clock, Star, CheckCircle } from 'lucide-react';

const PremiumFeaturePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Star className="text-yellow-400 w-12 h-12" fill="#FBBF24" strokeWidth={1} />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Premium Features
          </h1>
          <p className="text-lg text-gray-600 font-light mt-2">
            Unlock premium features designed to elevate your well-being and productivity!
          </p>
        </div>

        {/* Mood-Based Food Recommendations */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Mood-Based Food Recommendations
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Get scientifically-backed food suggestions based on your current mood. Whether you're feeling happy, stressed, or anxious, we'll provide personalized meal options that align with your emotional state.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-yellow-100 p-4 rounded-xl text-center">
                  <span className="text-2xl">😊</span>
                  <p className="text-sm font-medium mt-2">Happy Foods</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-center">
                  <span className="text-2xl">😔</span>
                  <p className="text-sm font-medium mt-2">Mood Boosters</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl text-center">
                  <span className="text-2xl">😴</span>
                  <p className="text-sm font-medium mt-2">Calming Foods</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="rounded-2xl shadow-md bg-white w-full h-full max-w-md">
                {/* Food plate circular background */}
                <circle cx="150" cy="150" r="120" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2" />
                
                {/* Plate base */}
                <ellipse cx="150" cy="160" rx="100" ry="30" fill="#e9ecef" />
                <ellipse cx="150" cy="155" rx="90" ry="80" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2" />
                
                {/* Foods on plate */}
                {/* Green veggies */}
                <ellipse cx="120" cy="140" rx="25" ry="15" fill="#4ade80" />
                <ellipse cx="115" cy="130" rx="15" ry="10" fill="#86efac" />
                
                {/* Orange/protein */}
                <ellipse cx="170" cy="145" rx="20" ry="25" fill="#fdba74" />
                <ellipse cx="165" cy="135" rx="15" ry="10" fill="#fed7aa" />
                
                {/* Purple/berries */}
                <ellipse cx="145" cy="165" rx="15" ry="10" fill="#c084fc" />
                <ellipse cx="155" cy="170" rx="10" ry="8" fill="#a855f7" />
                
                {/* Emoji face above plate */}
                <circle cx="150" cy="90" r="25" fill="#fde047" />
                <circle cx="140" cy="85" r="5" fill="#1e293b" />
                <circle cx="160" cy="85" r="5" fill="#1e293b" />
                <path d="M130 100 Q150 115 170 100" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                
                {/* Decorative elements */}
                <text x="210" y="70" fontFamily="Arial" fontSize="12" fill="#6b7280">Happy</text>
                <text x="70" y="70" fontFamily="Arial" fontSize="12" fill="#6b7280">Mood</text>
                <text x="150" y="220" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#6b7280" textAnchor="middle">Food Recommendations</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Eunoia: Task Prioritization */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Eunoia: Task Prioritization
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 flex justify-center order-2 md:order-1">
              <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="rounded-2xl shadow-md bg-white w-full h-full max-w-md">
                {/* Background with light gradient */}
                <rect width="300" height="300" fill="#f9fafb" />
                <rect x="0" y="0" width="300" height="300" fill="url(#taskGradient)" />
                
                {/* Define gradient */}
                <defs>
                  <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#f3e8ff" />
                  </linearGradient>
                </defs>
                
                {/* Task list UI */}
                <rect x="50" y="70" width="200" height="180" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                <rect x="50" y="70" width="200" height="40" rx="10" fill="#a5b4fc" />
                <text x="150" y="95" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">My Tasks</text>
                
                {/* Task items */}
                {/* High priority task */}
                <rect x="60" y="120" width="180" height="30" rx="5" fill="#fee2e2" />
                <text x="85" y="140" fontFamily="Arial" fontSize="12" fill="#ef4444">Important Meeting</text>
                <circle cx="70" cy="135" r="5" fill="#ef4444" />
                
                {/* Medium priority task */}
                <rect x="60" y="160" width="180" height="30" rx="5" fill="#fef3c7" />
                <text x="85" y="180" fontFamily="Arial" fontSize="12" fill="#f59e0b">Review Documents</text>
                <circle cx="70" cy="175" r="5" fill="#f59e0b" />
                
                {/* Low priority task */}
                <rect x="60" y="200" width="180" height="30" rx="5" fill="#ecfdf5" />
                <text x="85" y="220" fontFamily="Arial" fontSize="12" fill="#10b981">Check Emails</text>
                <circle cx="70" cy="215" r="5" fill="#10b981" />
                
                {/* Emoji indicator */}
                <circle cx="220" cy="40" r="25" fill="#bfdbfe" />
                <circle cx="212" cy="35" r="4" fill="#1e3a8a" />
                <circle cx="228" cy="35" r="4" fill="#1e3a8a" />
                <path d="M212 45 Q220 50 228 45" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                <text x="150" y="270" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#6b7280" textAnchor="middle">Task Prioritization</text>
              </svg>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <p className="text-gray-600 mb-4">
                Eunoia helps you prioritize your tasks based on your mood. Feeling productive? Eunoia will push you towards the most important tasks, while calming you down during stressful moments, ensuring the right tasks get the right amount of focus.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mt-4">
                <p className="text-sm italic text-gray-700">
                  "Eunoia intelligently rearranges your to-do list based on your emotional state, helping you work with your feelings rather than against them."
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex items-center">
                  <CheckCircle className="text-blue-500 w-5 h-5 mr-2" />
                  <span className="text-sm text-gray-700">Smart Sorting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-purple-500 w-5 h-5 mr-2" />
                  <span className="text-sm text-gray-700">Mood Tracking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-pink-500 w-5 h-5 mr-2" />
                  <span className="text-sm text-gray-700">Focus Timer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Mood Analytics */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Advanced Mood Analytics
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Gain deeper insights into your emotional patterns with advanced analytics. Understand triggers, track progress, and develop strategies for emotional well-being with detailed reports and visualizations.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded-xl shadow border border-gray-100 flex items-center">
                  <BarChart className="text-blue-500 w-6 h-6 mr-2" />
                  <div>
                    <h3 className="text-gray-700 font-medium mb-1">Weekly Trends</h3>
                    <p className="text-xs text-gray-500">View patterns across the week</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow border border-gray-100 flex items-center">
                  <Calendar className="text-purple-500 w-6 h-6 mr-2" />
                  <div>
                    <h3 className="text-gray-700 font-medium mb-1">Mood Triggers</h3>
                    <p className="text-xs text-gray-500">Identify what affects your mood</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="rounded-2xl shadow-md bg-white w-full h-full max-w-md">
                {/* Dashboard background */}
                <rect width="300" height="300" fill="#f8fafc" />
                
                {/* Charts area */}
                <rect x="30" y="70" width="240" height="180" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                
                {/* Header */}
                <rect x="30" y="30" width="240" height="30" rx="5" fill="#93c5fd" />
                <text x="150" y="50" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Mood Analytics Dashboard</text>
                
                {/* Left chart - Bar chart */}
                <rect x="40" y="80" width="110" height="100" rx="5" fill="#f1f5f9" />
                <text x="95" y="100" fontFamily="Arial" fontSize="10" fill="#64748b" textAnchor="middle">Weekly Mood Trends</text>
                
                {/* Bars for bar chart */}
                <rect x="50" y="145" width="10" height="25" fill="#60a5fa" />
                <rect x="65" y="130" width="10" height="40" fill="#818cf8" />
                <rect x="80" y="110" width="10" height="60" fill="#a78bfa" />
                <rect x="95" y="125" width="10" height="45" fill="#c084fc" />
                <rect x="110" y="140" width="10" height="30" fill="#e879f9" />
                <rect x="125" y="155" width="10" height="15" fill="#f472b6" />
                
                {/* X-axis */}
                <line x1="50" y1="170" x2="135" y2="170" stroke="#94a3b8" strokeWidth="1" />
                <text x="55" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">M</text>
                <text x="70" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">T</text>
                <text x="85" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">W</text>
                <text x="100" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">T</text>
                <text x="115" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">F</text>
                <text x="130" y="185" fontFamily="Arial" fontSize="8" fill="#64748b">S</text>
                
                {/* Right chart - Pie chart */}
                <rect x="160" y="80" width="100" height="100" rx="5" fill="#f1f5f9" />
                <text x="210" y="100" fontFamily="Arial" fontSize="10" fill="#64748b" textAnchor="middle">Mood Distribution</text>
                
                {/* Pie chart */}
                <path d="M210,130 L210,170 A40,40 0 0,1 178,142 z" fill="#60a5fa" />
                <path d="M210,130 L178,142 A40,40 0 0,1 190,102 z" fill="#818cf8" />
                <path d="M210,130 L190,102 A40,40 0 0,1 230,108 z" fill="#a78bfa" />
                <path d="M210,130 L230,108 A40,40 0 0,1 242,142 z" fill="#e879f9" />
                <path d="M210,130 L242,142 A40,40 0 0,1 210,170 z" fill="#f472b6" />
                
                {/* Bottom chart - Line chart */}
                <rect x="40" y="190" width="220" height="50" rx="5" fill="#f1f5f9" />
                <text x="150" y="205" fontFamily="Arial" fontSize="10" fill="#64748b" textAnchor="middle">Monthly Overview</text>
                
                {/* Line for line chart */}
                <polyline points="50,225 80,220 110,230 140,215 170,225 200,218 230,222" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                
                {/* Dots on line */}
                <circle cx="50" cy="225" r="3" fill="#8b5cf6" />
                <circle cx="80" cy="220" r="3" fill="#8b5cf6" />
                <circle cx="110" cy="230" r="3" fill="#8b5cf6" />
                <circle cx="140" cy="215" r="3" fill="#8b5cf6" />
                <circle cx="170" cy="225" r="3" fill="#8b5cf6" />
                <circle cx="200" cy="218" r="3" fill="#8b5cf6" />
                <circle cx="230" cy="222" r="3" fill="#8b5cf6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 mb-12">
          <button className="py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
            Unlock Premium Now
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            Start your 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeaturePage;