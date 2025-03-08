// import React, { useEffect, useState } from "react";

// import { getAuth } from "firebase/auth";

// const Profile = () => {
//   const [edit, setEdit] = useState(false);

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [moodCount, setMoodCount] = useState("");
//   const [streak, setStreak] = useState("");
//   const [error, setError] = useState(null);

//   const [userData, setUserData] = useState(null);
//   const auth = getAuth();
//   const user = auth.currentUser;
//   useEffect(() => {
//     if (user) fetchUserData(); // Call the fetch function when the component mounts
//   }, [user]); // Re-run if the user changes (e.g., on login)

//   // const fetchUserData = async () => {
//   //   if (!user) {
//   //     setError("User not logged in.");
//   //     return;
//   //   }

//   //   try {
//   //     // Get the Firebase token
//   //     const token = await user.getIdToken();

//   //     // https://cuddle-up-backend.onrender.com/api/users/me

//   //     // Make a GET request to your backend to fetch the user data
//   //     const response = await fetch(
//   //       // 'https://cuddle-up-backend.onrender.com/api/users/me',
//   //       "http://localhost:5001/api/users/me",
//   //       {
//   //       method: "GET",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`, // Attach the Firebase token
//   //       },
//   //     });

//   //     // Parse response and handle errors
//   //     const data = await response.json();
//   //     if (!response.ok) {
//   //       throw new Error(
//   //         data.error || "Something went wrong fetching the user data"
//   //       );
//   //     }

//   //     // Store the user data in the state
//   //     setUserData(data);
//   //     setName(data.name || "");
//   //     setAge(data.age || "");
//   //     setGender(data.gender || "");
//   //     setCity(data.city || "");
//   //     setCountry(data.country || "");
//   //     setMoodCount(data.moodCount)
//   //     setStreak(data.streak)
//   //   } catch (error) {
//   //     console.error("Error fetching user data:", error.message);
//   //     setError(error.message);
//   //   }
//   // };

//   const [longestStreak, setLongestStreak] = useState(0);
//   const [mostFrequentMood, setMostFrequentMood] = useState("");
//   const [mostFrequentMoodPercentage, setMostFrequentMoodPercentage] =
//     useState(0);
//   const [moodSwings, setMoodSwings] = useState(0);
//   const [moodStabilityScore, setMoodStabilityScore] = useState(0);
//   const [happiestDay, setHappiestDay] = useState("");
//   const [saddestDay, setSaddestDay] = useState("");
//   const [moodChangeRate, setMoodChangeRate] = useState(0);
//   const [mostActiveTime, setMostActiveTime] = useState("");

//   const [isLoading, setIsLoading] = useState(false);

//   const fetchUserData = async () => {
//     if (!user) {
//       setError("User not logged in.");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       // Get the Firebase token
//       const token = await user.getIdToken();

//       // Make a GET request to your backend to fetch the user data
//       const response = await fetch('https://cuddle-up-backend.onrender.com/api/users/me', {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Attach the Firebase token
//         },
//       });

//       // Parse response and handle errors
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(
//           data.error || "Something went wrong fetching the user data"
//         );
//       }

//       const userData = data.user || {};

//       // Store user details in state
//       setUserData(userData);
//       setName(userData.name || "");
//       setAge(userData.age || "");
//       setGender(userData.gender || "");
//       setCity(userData.city || "");
//       setCountry(userData.country || "");

//       // Store mood insights in state
//       setMoodCount(data.totalMoods);
//       setStreak(data.currentStreak);
//       setLongestStreak(data.longestStreak);
//       setMostFrequentMood(data.mostFrequentMood);
//       setMostFrequentMoodPercentage(data.mostFrequentMoodPercentage);
//       setMoodSwings(data.moodSwings);
//       setMoodStabilityScore(data.moodStabilityScore);
//       setHappiestDay(data.happiestDay);
//       setSaddestDay(data.saddestDay);
//       setMoodChangeRate(data.moodChangeRate);
//       setMostActiveTime(data.mostActiveTime);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   console.log("User Insights:");
//   console.log("Longest Streak:", longestStreak);
//   console.log("Most Frequent Mood:", mostFrequentMood);
//   console.log("Most Frequent Mood Percentage:", mostFrequentMoodPercentage);
//   console.log("Mood Swings:", moodSwings);
//   console.log("Mood Stability Score:", moodStabilityScore);
//   console.log("Happiest Day:", happiestDay);
//   console.log("Saddest Day:", saddestDay);
//   console.log("Mood Change Rate:", moodChangeRate);
//   console.log("Most Active Time:", mostActiveTime);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userData) {
//     // return <div>Loading user data...</div>;
//     setIsLoading(true)
//   }

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!name || !age || !gender || !city || !country) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       // Get Firebase ID token
//       const token = await user.getIdToken();

//       // Prepare data to send to backend
//       const userData = {
//         name,
//         age,
//         gender,
//         city,
//         country,
//         uid: user.uid, // Firebase unique user ID
//       };

//       // Send data to backend with token
//       const response = await fetch(
//         "https://cuddle-up-backend.onrender.com/api/users/update",

//         // "https://cuddle-up-backend.onrender.com/api/users/update",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Attach Firebase token
//           },
//           body: JSON.stringify(userData),
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       fetchUserData();
//       // navigate("/login");
//     } catch (error) {
//       console.error("Update error:", error.message);
//       setError(error.message);
//     }
//   };

//   if (isLoading) {
//     return <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading your profile...</p>
//       </div>
//     </div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Your Profile
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Manage your account information and preferences
//           </p>
//         </div>

//         {/* Main Profile Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {/* Profile Card - Left Column */}
//           <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 flex flex-col items-center">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
//                 NM
//               </div>
//               <div className="absolute bottom-0 right-0 bg-green-400 h-6 w-6 rounded-full border-4 border-white"></div>
//             </div>

//             <h2 className="text-2xl font-semibold text-gray-800 mt-4">
//               {userData?.name || 'User'}
//             </h2>
//             <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mt-1">
//               Free Member
//             </div>

//             <div className="w-full border-b border-gray-200 my-4"></div>

//             <div className="flex items-center justify-center w-full gap-3 mt-2">
//               <div className="text-center">
//                 <p className="text-gray-500 text-xs">Moods</p>
//                 <p className="font-bold text-gray-800">{moodCount}</p>
//               </div>
//               <div className="w-px h-10 bg-gray-200"></div>
//               <div className="text-center">
//                 <p className="text-gray-500 text-xs">Streak</p>
//                 <p className="font-bold text-gray-800">{streak}</p>
//               </div>
//               <div className="w-px h-10 bg-gray-200"></div>
//               <div className="text-center">
//                 <p className="text-gray-500 text-xs">Mood Swings</p>
//                 <p className="font-bold text-gray-800">{moodSwings}</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 w-full space-y-2">
//               <button
//                 onClick={() => setEdit(!edit)}
//                 className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-200"
//               >
//                 {!edit ? "Edit Profile" : "Cancel"}
//               </button>
//               <button className="w-full py-2.5 px-4 bg-white backdrop-blur-lg rounded-xl shadow-md text-gray-800 font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200">
//                 Change Membership
//               </button>
//             </div>
//           </div>

//           {/* Profile Details - Middle & Right Column */}
//           <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:col-span-2">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Personal Information
//               </h3>
//               <button
//                 onClick={(e) => {
//                   handleUpdate(e);
//                   setEdit(!edit);
//                 }}
//                 className={`text-blue-600 ${
//                   !edit ? "hidden" : ""
//                 } hover:text-blue-800 text-sm font-medium`}
//               >
//                 Submit
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   Full Name
//                 </label>
//                 {edit ? (
//                   <input
//                     type="text"
//                     className="border-dashed border-2"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-800 font-semibold">{userData.name}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   Age
//                 </label>
//                 {edit ? (
//                   <input
//                     type="text"
//                     className="border-dashed border-2"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-800 font-semibold">{userData.age}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   City
//                 </label>
//                 {edit ? (
//                   <input
//                     type="text"
//                     className="border-dashed border-2"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-800 font-semibold">{userData.city}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   Country
//                 </label>
//                 {edit ? (
//                   <input
//                     type="text"
//                     className="border-dashed border-2"
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-800 font-semibold">
//                     {userData.country}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   Gender
//                 </label>
//                 {edit ? (
//                   <input
//                     type="text"
//                     className="border-dashed border-2"
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                 ) : (
//                   <p className="text-gray-800 font-semibold">
//                     {userData.gender}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-500">
//                   Joined On
//                 </label>
//                 <p className="text-gray-800 font-semibold">
//                   {userData.createdAt}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   Account Preferences
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-not-allowed">
//                 {[
//                   { title: "Theme", description: "Light mode" },
//                   { title: "Notifications", description: "Enabled" },
//                   { title: "Language", description: "English (US)" },
//                   { title: "Privacy", description: "Private account" },
//                 ].map((item, index) => (
//                   <div
//                     key={index}
//                     className="relative flex items-center justify-between bg-gray-50 p-3 rounded-xl opacity-50"
//                   >
//                     <div>
//                       <p className="font-medium text-gray-800">{item.title}</p>
//                       <p className="text-sm text-gray-500">
//                         {item.description}
//                       </p>
//                     </div>
//                     <button
//                       className="text-gray-400 text-sm cursor-not-allowed"
//                       disabled
//                     >
//                       Locked
//                     </button>
//                     <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center rounded-xl">
//                       <span className="text-sm font-medium text-gray-700">
//                         🔒 Premium Required
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mood History Section - Full Width */}
//         {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Recent Mood History
//             </h3>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-500">
//                 🔒 Premium Access Required
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 opacity-50 cursor-not-allowed">

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-2xl">
//                   😊
//                 </div>
//                 <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Happy
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Today, 2:30 PM</p>
//               <p className="text-sm text-gray-700 mt-1">Personal Achievement</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-2xl">
//                   😭
//                 </div>
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Crying
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Yesterday</p>
//               <p className="text-sm text-gray-700 mt-1">Relationship Issues</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-2xl">
//                   🤩
//                 </div>
//                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Excited
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">2 days ago</p>
//               <p className="text-sm text-gray-700 mt-1">
//                 Excited for the Future
//               </p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center text-2xl">
//                   😟
//                 </div>
//                 <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Worried
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">3 days ago</p>
//               <p className="text-sm text-gray-700 mt-1">Work Stress</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-2xl">
//                   😠
//                 </div>
//                 <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Angry
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Last week</p>
//               <p className="text-sm text-gray-700 mt-1">Unexpected Event</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
//                   😔
//                 </div>
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Sad
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Last week</p>
//               <p className="text-sm text-gray-700 mt-1">Feeling Lonely</p>
//             </div>
//           </div>
//         </div> */}

//         {/* Using this */}

//         {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Mood Insights
//             </h3>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Mood Stability Score
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{moodStabilityScore}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Longest Streak
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{longestStreak}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Frequent Mood
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{mostFrequentMood}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Frequent Mood Percentage
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 {mostFrequentMoodPercentage}
//               </p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Happiest Day
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{happiestDay}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Saddest Day
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{saddestDay}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Mood Change Rate
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{moodChangeRate}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Active Time
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">{mostActiveTime}</p>
//             </div>
//           </div>
//         </div> */}

//         {/* Liked this */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Mood Insights
//             </h3>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//             <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Mood Stability Score
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{moodStabilityScore}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Longest Streak
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{longestStreak} Days</p>
//             </div>

//             <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Frequent Mood
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{mostFrequentMood}</p>
//             </div>

//             <div className="bg-white w-44 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Frequent Mood %
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">
//                 {mostFrequentMoodPercentage}%
//               </p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Happiest Day
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{happiestDay}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Saddest Day
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{saddestDay}</p>
//             </div>

//             <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Mood Change Rate
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{moodChangeRate}</p>
//             </div>

//             <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="bg-red-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//                   Most Active Time
//                 </span>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">{mostActiveTime}</p>
//             </div>
//           </div>
//         </div>

// {/* Testing this */}
// {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
//   <div className="flex justify-between items-center mb-6">
//     <h3 className="text-xl font-semibold text-gray-800">Mood Insights</h3>
//   </div>

//   <div>
//     <h4 className="text-sm font-medium text-gray-600 mb-3">Frequent Mood</h4>
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//       <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
//             Most Frequent Mood
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{mostFrequentMood}</p>
//       </div>

//       <div className="bg-white w-44 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
//             Most Frequent Mood %
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{mostFrequentMoodPercentage}%</p>
//       </div>
//     </div>
//   </div>

//   <div className="mt-6">
//     <h4 className="text-sm font-medium text-gray-600 mb-3">Emotional Highs & Lows</h4>
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//       <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
//             Happiest Day
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{happiestDay}</p>
//       </div>

//       <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//             Saddest Day
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{saddestDay}</p>
//       </div>
//     </div>
//   </div>

//   <div className="mt-6">
//     <h4 className="text-sm font-medium text-gray-600 mb-3">Other Insights</h4>
//     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">

//       <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//             Mood Stability Score
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{moodStabilityScore}</p>
//       </div>

//       <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//             Longest Streak
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{longestStreak} Days</p>
//       </div>

//       <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
//             Mood Change Rate
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{moodChangeRate}</p>
//       </div>

//       <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
//         <div className="flex justify-between items-center mb-2">
//           <span className="bg-red-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
//             Most Active Time
//           </span>
//         </div>
//         <p className="text-sm text-gray-500 mt-2">{mostActiveTime}</p>
//       </div>
//     </div>
//   </div>
// </div> */}

//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Picker from "@emoji-mart/react";
import { motion } from "framer-motion";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [moodCount, setMoodCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mood insights state
  const [longestStreak, setLongestStreak] = useState(0);
  const [mostFrequentMood, setMostFrequentMood] = useState("");
  const [mostFrequentMoodPercentage, setMostFrequentMoodPercentage] =
    useState(0);
  const [moodSwings, setMoodSwings] = useState(0);
  const [moodStabilityScore, setMoodStabilityScore] = useState(0);
  const [happiestDay, setHappiestDay] = useState("");
  const [saddestDay, setSaddestDay] = useState("");
  const [moodChangeRate, setMoodChangeRate] = useState(0);
  const [mostActiveTime, setMostActiveTime] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const [userEmoji, setUserEmoji] = useState("");
  const emotionEmojis = [
    "😀",
    "😂",
    "😢",
    "😎",
    "🤩",
    "😡",
    "🥳",
    "😴",
    "😇",
    "🤔",
    "😭",
    "😍",
    "😃",
    "🐥",
    "🌈",
    "🔥",
    "🎉",
    "🍀",
    "🚀",
    "💖",
    "🤖",
    "🦄",
  ];
  useEffect(() => {
    // Function to change emoji every 3 seconds
    const changeEmoji = () => {
      setUserEmoji(
        emotionEmojis[Math.floor(Math.random() * emotionEmojis.length)]
      );
    };

    changeEmoji(); // Set an emoji on first render
    const interval = setInterval(changeEmoji, 1000); // Change emoji every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData(); // Call the fetch function when the component mounts
    } else {
      setIsLoading(false);
      setError("User not logged in.");
    }
  }, [user]); // Re-run if the user changes (e.g., on login)

  const fetchUserData = async () => {
    if (!user) {
      setError("User not logged in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Get the Firebase token
      const token = await user.getIdToken(true);

      // Make a GET request to your backend to fetch the user data
      const response = await fetch(
        // "http://localhost:5001/api/users/me",

        "https://cuddle-up-backend.onrender.com/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json", // Attach the Firebase token
          },
        }
      );

      // Parse response and handle errors
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong fetching the user data"
        );
      }

      const userData = data.user || {};

      // Store user details in state
      setUserData(userData);
      setName(userData.name || "");
      setAge(userData.age || "");
      setGender(userData.gender || "");
      setCity(userData.city || "");
      setCountry(userData.country || "");

      // Store mood insights in state
      setMoodCount(data.totalMoods || 0);
      setStreak(data.currentStreak || 0);
      setLongestStreak(data.longestStreak || 0);
      setMostFrequentMood(data.mostFrequentMood || "N/A");
      setMostFrequentMoodPercentage(data.mostFrequentMoodPercentage || 0);
      setMoodSwings(data.moodSwings || 0);
      setMoodStabilityScore(data.moodStabilityScore || 0);
      setHappiestDay(data.happiestDay || "N/A");
      setSaddestDay(data.saddestDay || "N/A");
      setMoodChangeRate(data.moodChangeRate || 0);
      setMostActiveTime(data.mostActiveTime || "N/A");
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender || !city || !country) {
      setError("All fields are required.");
      return;
    }

    try {
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
      const response = await fetch(
        "https://cuddle-up-backend.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach Firebase token
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      fetchUserData();
      setEdit(false);
    } catch (error) {
      console.error("Update error:", error.message);
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // const userInitials = userData?.name ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase() : "?";
  const userInitials = userData?.name
    ? userData.name
        .split(" ") // Split the name into words
        .map((n) => n[0]) // Take the first letter of each word
        .slice(0, 2) // Keep only the first two initials
        .join("") // Join them together
        .toUpperCase() // Convert to uppercase
    : "?";

  function convertUTCRangeToLocal(utcRange, timeZone) {
    if (utcRange == "N/A") return "N/A";
    // Extract hours and minutes from the input range
    const timeRegex = /(\d{1,2}):(\d{2}) (\w{2}) - (\d{1,2}):(\d{2}) (\w{2})/;
    const match = utcRange.match(timeRegex);

    if (!match) {
      throw new Error("Invalid time range format.");
    }

    let [_, startHour, startMin, startPeriod, endHour, endMin, endPeriod] =
      match;

    // Convert to 24-hour format
    startHour =
      parseInt(startHour, 10) +
      (startPeriod === "PM" && startHour !== "12" ? 12 : 0);
    startHour = startPeriod === "AM" && startHour === 12 ? 0 : startHour;

    endHour =
      parseInt(endHour, 10) + (endPeriod === "PM" && endHour !== "12" ? 12 : 0);
    endHour = endPeriod === "AM" && endHour === 12 ? 0 : endHour;

    // Get current date to form a full UTC Date object
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // Get YYYY-MM-DD

    // Create UTC Date objects
    const startUTC = new Date(
      `${dateString}T${String(startHour).padStart(2, "0")}:${startMin}:00Z`
    );
    const endUTC = new Date(
      `${dateString}T${String(endHour).padStart(2, "0")}:${endMin}:00Z`
    );

    // Convert to local time
    const localStart = startUTC.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });
    const localEnd = endUTC.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });

    return `${localStart} - ${localEnd}`;
  }

  // Example: Convert "4:00 PM - 5:00 PM (UTC)" to New York Time
  // console.log(
  //   convertUTCRangeToLocal("4:00 PM - 5:00 PM (UTC)", "America/New_York")
  // );

  async function reauthenticateUser(user, password) {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthentication successful.");
      return true;
    } catch (error) {
      console.error("Reauthentication failed:", error.message);
      return false;
    }
  }

  async function deleteAccount(password) {
    const userAuth = getAuth();
    const user = userAuth.currentUser;
    const token = await user.getIdToken(true);
    if (!user) {
      console.log("No user signed in.");
      return;
    }

    try {
      // 🔹 Reauthenticate before deletion
      const reauthenticated = await reauthenticateUser(user, password);
      if (!reauthenticated) {
        console.log("Reauthentication failed. Cannot proceed with deletion.");
        return;
      }

      async function reauthenticateUser(user, password) {
        try {
          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);
          console.log("Reauthentication successful.");
          return true;
        } catch (error) {
          console.error("Reauthentication failed:", error.message);
          return false;
        }
      }

      const response = await fetch(
        // "http://localhost:5001/api/users/delete",
        "https://cuddle-up-backend.onrender.com/api/users/delete",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach Firebase token
          },
        }
      );

      if (response.status === 200) {
        console.log(
          "Firestore data deleted successfully. Now deleting user..."
        );

        // 🔹 Delete the user from Firebase Authentication
        await deleteUser(user);
        console.log("User deleted successfully from Firebase.");
      } else {
        console.error("Failed to delete user from Firestore:", response.data);
      }
    } catch (error) {
      console.error("Error during user deletion:", error.message);
    }
  }

  const handleDeleteAccount = async () => {
    const password = prompt(
      "Please enter your password to confirm account deletion:"
    );
    if (password) {
      await deleteAccount(password);
    } else {
      console.log("Account deletion canceled.");
    }
  };

  const emojiMap = {
    Happy: "😊",
    Sad: "😔",
    Angry: "😠",
    Worried: "😟",
    Crying: "😭",
    Excited: "🤩",
    Anger: "😡",
    Sadness: "😔",
    Excitement: "😆",
    Surprise: "😲",
    Disgust: "🤢",
    Neutral: "😐",
    Fear: "😨",
    Caring: "🤗",
    Annoyance: "😤",
    Disappointment: "😞",
    Nervousness: "😬",
    Approval: "👍",
    Desire: "🤤",
    Curiosity: "🤔",
    Pride: "😌",
    Confusion: "😕",
    Gratitude: "🙏",
    Love: "❤️",
    Amusement: "😂",
    Grief: "😢",
    Joy: "😄",
    Admiration: "👏",
    Embarrassment: "😳",
    Disapproval: "👎",
    Relief: "😌",
    Remorse: "😞",
    Realization: "💡",
    Optimism: "🌟",
    Boredom: "😴"
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 font-light mt-2">
            Manage your account information and preferences
          </p>
        </div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Profile Card - Left Column */}
          <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {/* {userEmoji} */}
                {/* <motion.div
                  key={userEmoji} // This ensures the animation runs every time emoji changes
                  initial={{ scale: 0 }} // Start from small
                  animate={{ scale: 1.2 }} // Pop effect
                  transition={{ type: "spring", stiffness: 200, damping: 10 }} // Spring animation
                >
                  {userEmoji}
                </motion.div> */}
                {userData.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <motion.div
                    key={userEmoji}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg"
                  >
                    {userEmoji}
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-0 right-0 bg-green-400 h-6 w-6 rounded-full border-4 border-white"></div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {userData?.name || "Guest User"}
            </h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mt-1">
              Free Member
            </div>

            <div className="w-full border-b border-gray-200 my-4"></div>

            <div className="flex items-center justify-center w-full gap-3 mt-2">
              <div className="text-center">
                <p className="text-gray-500 text-xs">Moods</p>
                <p className="font-bold text-gray-800">{moodCount}</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">Streak</p>
                <p className="font-bold text-gray-800">{streak}</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">Mood Swings</p>
                <p className="font-bold text-gray-800">{moodSwings}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 w-full space-y-2">
              <button
                onClick={() => setEdit(!edit)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-200"
              >
                {!edit ? "Edit Profile" : "Cancel"}
              </button>
              <button className="w-full py-2.5 px-4 bg-white backdrop-blur-lg rounded-xl shadow-md text-gray-800 font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200">
                Change Membership
              </button>
            </div>
          </div>

          {/* Profile Details - Middle & Right Column */}
          <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h3>
              {edit && (
                <button
                  onClick={handleUpdate}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Submit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                {edit ? (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {userData?.name || "Not set"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Age
                </label>
                {edit ? (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {userData?.age || "Not set"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  City
                </label>
                {edit ? (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {userData?.city || "Not set"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Country
                </label>
                {edit ? (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {userData?.country || "Not set"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Gender
                </label>
                {edit ? (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {userData?.gender || "Not set"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Joined On
                </label>
                <p className="text-gray-800 font-semibold">
                  {userData?.createdAt || "Unknown"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Account Preferences
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-not-allowed">
                {[
                  { title: "Theme", description: "Light mode", premium: true },
                  {
                    title: "Notifications",
                    description: "Enabled",
                    premium: true,
                  },
                  {
                    title: "Delete account",
                    description: "Permanently remove your data",
                    premium: false,
                  },
                  {
                    title: "Privacy",
                    description: "Private account",
                    premium: true,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center justify-between bg-gray-50 p-3 rounded-xl ${
                      item.premium
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-red-50 cursor-pointer"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <button
                      className={`text-sm ${
                        item.premium
                          ? "cursor-not-allowed text-gray-400"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      disabled={item.premium}
                      onClick={!item.premium ? handleDeleteAccount : undefined}
                    >
                      {item.premium ? "Locked" : "Delete"}
                    </button>
                    {item.premium && (
                      <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center rounded-xl">
                        <span className="text-sm font-medium text-gray-700">
                          🔒 Premium Required
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <Picker onEmojiSelect={(emoji) => setUserEmoji(emoji.native)} /> */}

        {/* Mood Insights Section - Full Width */}
        {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Mood Insights
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                  Mood Stability Score
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{moodStabilityScore}</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Longest Streak
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{longestStreak} Days</p>
            </div>

            <div className="bg-white  shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                
                  Dominant Mood
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{mostFrequentMood} {emojiMap[mostFrequentMood]}</p>
            </div>

            <div className="bg-white w-36 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                  
                  Dominant Mood%
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {mostFrequentMoodPercentage}%
              </p>
            </div>

            <div className="bg-white w-40 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Mood Change Rate
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{moodChangeRate}</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                  Happiest Day
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{happiestDay}</p>
            </div>

           
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                  Saddest Day
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{saddestDay}</p>
            </div>

           

            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-red-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                  Most Active Time
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {convertUTCRangeToLocal(mostActiveTime, "America/New_York")}
              </p>
            </div>
          </div>
        </div> */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 sm:p-6 w-full">
  <div className="flex justify-between items-center mb-4 sm:mb-6">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
      Mood Insights
    </h3>
  </div>

  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Mood Stability Score
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{moodStabilityScore}</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Longest Streak
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{longestStreak} Days</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Dominant Mood
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{mostFrequentMood} {emojiMap[mostFrequentMood]}</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Dominant Mood %
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {mostFrequentMoodPercentage}%
      </p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Mood Change Rate
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{moodChangeRate}</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Happiest Day
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{happiestDay}</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Saddest Day
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{saddestDay}</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <span className="bg-red-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium inline-block">
          Most Active Time
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {convertUTCRangeToLocal(mostActiveTime, "America/New_York")}
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Profile;
