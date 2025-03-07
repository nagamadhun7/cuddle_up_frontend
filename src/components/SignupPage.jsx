// import { ArrowLeft, Heart } from "lucide-react";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const Button = ({ children, className, ...props }) => {
//   return (
//     <button
//       className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// const InputField = ({ label, type, id, placeholder, ...props }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={id} className="block text-sm font-medium text-gray-600">
//         {label}
//       </label>
//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         {...props}
//       />
//     </div>
//   );
// };

// const Signup = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     const auth = getAuth();

//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate("/login"); 
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
//         <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
//         <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
//       </div>

//       {/* Main Content Container */}
//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo and Title Section */}
//         <div className="text-center mb-12">
//           <div className="inline-block p-4 mb-6">
//             <Heart className="w-16 h-16 text-blue-500 animate-pulse" />
//           </div>
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
//             Create Your Account
//           </h1>
//           <p className="text-lg text-gray-600 font-light px-4">
//             Sign up to start tracking your emotions.
//           </p>
//         </div>

//         {/* Sign Up Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
//           {/* Input Fields for Email, Password, and Confirm Password */}
//           <InputField
//             label="Email"
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <InputField
//             label="Password"
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputField
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             placeholder="Confirm your password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

// {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           {/* Sign Up with Google Button */}
//           <Button className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5">
//             <FcGoogle className="w-5 h-5" />
//             Sign Up with Gmail
//           </Button>

//           {/* Submit Sign Up Button */}
//           <Button className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5 mt-4"
//           onClick={e => handleSignUp(e)}>
//             Sign Up
//           </Button>
//         </div>

//         {/* Back to Home Button */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-600 flex items-center justify-center gap-2 hover:text-gray-800 transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;







import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const InputField = ({ label, type, id, placeholder, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Multi-step state

  // Step 1: Personal Information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Step 2: Email & Passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name || !age || !gender || !city || !country) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };


const handleSignUp = async (e) => {
  e.preventDefault();
  if (!email || !password || !confirmPassword) {
    setError("All fields are required.");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Firebase user object

    // Get Firebase ID token
    const token = await user.getIdToken();

    // Prepare data to send to backend
    const userData = {
      name,
      age,
      gender,
      city,
      country,
      uid: user.uid, // Firebase unique user ID
    };

    // Send data to backend with token
    const response = await fetch("https://cuddle-up-backend.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach Firebase token
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    console.log("User successfully registered:", data);
    navigate("/login");
  } catch (error) {
    console.error("Signup error:", error.message);
    setError(error.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-block p-4 mb-6">
            <Heart className="w-16 h-16 text-blue-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {step === 1 ? "Tell Us About Yourself" : "Create Your Account"}
          </h1>
          <p className="text-lg text-gray-600 font-light px-4">
            {step === 1
              ? "We'd love to get to know you better!"
              : "Secure your account with email and password."}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {step === 1 && (
            <>
              <InputField
                label="Full Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Age"
                type="number"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <InputField
                label="City"
                type="text"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <InputField
                label="Country"
                type="text"
                id="country"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
              <Button
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5 mt-4"
                onClick={handleNext}
              >
                Next
              </Button>
              
            </>
            
          )}

          {step === 2 && (
            <>
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Button className="w-full bg-gray-300 text-gray-700 mt-4" onClick={handleBack}>
                Back
              </Button>
              <Button className="w-full mt-4 bg-blue-600 text-white" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          )}
          
        </div>
        <div className="mt-6 text-center flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 flex items-center justify-center gap-2 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default Signup;


















// import React, { useState } from 'react';
// import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
// import { Calendar, User, Clock, MapPin, TrendingUp, Brain, Globe } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Progress } from "@/components/ui/progress";

// const MoodDashboard = () => {
//   const [timeFilter, setTimeFilter] = useState('week');
//   const [locationScope, setLocationScope] = useState('city');
  
//   const timeOfDayData = [
//     { name: 'Morning', value: 3 },
//     { name: 'Afternoon', value: 6 },
//     { name: 'Night', value: 2 },
//   ];

//   const locationData = [
//     { name: 'Office', value: 5 },
//     { name: 'Home', value: 3 },
//     { name: 'Friends', value: 2 },
//   ];

//   const comparisonData = [
//     { name: 'Mon', you: 7, average: 6 },
//     { name: 'Tue', you: 6, average: 6 },
//     { name: 'Wed', you: 8, average: 7 },
//     { name: 'Thu', you: 5, average: 6 },
//     { name: 'Fri', you: 7, average: 7 },
//   ];

//   const cityCountryData = [
//     { mood: 'Happy', you: 35, city: 28, country: 30 },
//     { mood: 'Excited', you: 25, city: 22, country: 20 },
//     { mood: 'Calm', you: 20, city: 25, country: 23 },
//     { mood: 'Worried', you: 12, city: 15, country: 17 },
//     { mood: 'Sad', you: 8, city: 10, country: 10 },
//   ];

//   const COLORS = ['#93c5fd', '#c4b5fd', '#fca5a5'];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-10">
//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Your Mood Dashboard
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Track and analyze your emotional journey over time
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex justify-end mb-8 gap-4">
//           <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
//             <SelectTrigger className="w-40 bg-white/90 backdrop-blur-lg shadow-md">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="week">Last Week</SelectItem>
//               <SelectItem value="month">Last Month</SelectItem>
//               <SelectItem value="quarter">Last Quarter</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select defaultValue={locationScope} onValueChange={setLocationScope}>
//             <SelectTrigger className="w-40 bg-white/90 backdrop-blur-lg shadow-md">
//               <SelectValue placeholder="Select location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="city">Compare to City</SelectItem>
//               <SelectItem value="country">Compare to Country</SelectItem>
//             </SelectContent>
//           </Select>
//           <div className="w-10 h-10 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-md">
//             <User className="w-6 h-6 text-blue-600" />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-8">
//           {/* Left Side */}
//           <div className="space-y-8">
//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8">
//               <div className="flex items-center gap-2 mb-6">
//                 <Clock className="w-6 h-6 text-blue-600" />
//                 <h2 className="text-xl font-semibold text-gray-700">Time of Day Mood</h2>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={timeOfDayData}
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {timeOfDayData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8">
//               <div className="flex items-center gap-2 mb-6">
//                 <MapPin className="w-6 h-6 text-purple-600" />
//                 <h2 className="text-xl font-semibold text-gray-700">Mood by Location</h2>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={locationData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#c4b5fd" radius={[8, 8, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="space-y-8">
//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                   <Globe className="w-6 h-6 text-purple-600" />
//                   <h2 className="text-xl font-semibold text-gray-700">Mood Distribution Comparison</h2>
//                 </div>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={cityCountryData}>
//                     <XAxis dataKey="mood" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="you" name="You" fill="#93c5fd" radius={[4, 4, 0, 0]} />
//                     <Bar 
//                       dataKey={locationScope === 'city' ? 'city' : 'country'} 
//                       name={locationScope === 'city' ? 'City Average' : 'Country Average'} 
//                       fill="#fca5a5" 
//                       radius={[4, 4, 0, 0]} 
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8">
//               <div className="flex items-center gap-2 mb-6">
//                 <Brain className="w-6 h-6 text-blue-600" />
//                 <h2 className="text-xl font-semibold text-gray-700">Progress Tracker</h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="text-sm text-gray-600">30-Day Mood Improvement</div>
//                 <Progress value={60} className="h-2" />
//                 <div className="text-right text-sm text-gray-600">60%</div>
//               </div>
//             </div>

//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8">
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Brain className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">Personalized Insight</h3>
//                   <p className="text-gray-600">
//                     You tend to feel stressed at work. Try taking a short break every 2 hours to refresh your mind!
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodDashboard;