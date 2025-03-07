// import React from "react";

// const Profile = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Your Profile
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             View and manage your personal information.
//           </p>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full max-w-2xl mx-auto">
//           <div className="flex flex-col items-center mb-8">
//             <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
//               NM
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Naga Madhu</h2>
//             <p className="text-gray-500 mt-1">Premium Member</p>
//           </div>

//           <div className="space-y-6">
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">Name</span>
//               <span className="font-semibold text-gray-800">Naga Madhu</span>
//             </div>
            
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">Age</span>
//               <span className="font-semibold text-gray-800">25</span>
//             </div>
            
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">City</span>
//               <span className="font-semibold text-gray-800">Westborough</span>
//             </div>
            
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">Country</span>
//               <span className="font-semibold text-gray-800">United States</span>
//             </div>
            
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">Gender</span>
//               <span className="font-semibold text-gray-800">Male</span>
//             </div>
            
//             <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//               <span className="text-gray-600 font-medium">Joined On</span>
//               <span className="font-semibold text-gray-800">February 19, 2025</span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-10 grid grid-cols-2 gap-4">
//             <button className="py-3 px-4 bg-white backdrop-blur-lg rounded-2xl shadow-md text-gray-800 font-semibold hover:bg-white/80 hover:shadow-lg transition-all duration-200 border border-gray-200">
//               Edit Profile
//             </button>
//             <button className="py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-200">
//               View Stats
//             </button>
//           </div>
//         </div>

//         {/* Mood History Teaser Card */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-2xl mx-auto">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Mood History</h2>
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-2">
//               <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center">😊</div>
//               <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">😭</div>
//               <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center">🤩</div>
//             </div>
//             <button className="py-2 px-4 bg-white rounded-xl shadow-sm text-blue-600 font-medium hover:bg-blue-50 transition-all duration-200 text-sm">
//               See All →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



// import React from "react";

// const Profile = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Your Profile
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             View and manage your personal information.
//           </p>
//         </div>

//         {/* Main Profile Section - Wider Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {/* Profile Avatar Section */}
//           <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center">
//             <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
//               NM
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800">Naga Madhu</h2>
//             <p className="text-gray-500 mt-1">Premium Member</p>
            
//             {/* Action Buttons */}
//             <div className="mt-4 grid grid-cols-2 gap-2 w-full">
//               <button className="py-2 px-3 bg-white backdrop-blur-lg rounded-xl shadow-md text-gray-800 font-semibold hover:bg-white/80 hover:shadow-lg transition-all duration-200 border border-gray-200 text-sm">
//                 Edit
//               </button>
//               <button className="py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-200 text-sm">
//                 Stats
//               </button>
//             </div>
//           </div>

//           {/* Profile Details Section - Takes 2 columns */}
//           <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:col-span-2">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">Name</span>
//                 <span className="font-semibold text-gray-800">Naga Madhu</span>
//               </div>
              
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">Age</span>
//                 <span className="font-semibold text-gray-800">25</span>
//               </div>
              
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">City</span>
//                 <span className="font-semibold text-gray-800">Westborough</span>
//               </div>
              
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">Country</span>
//                 <span className="font-semibold text-gray-800">United States</span>
//               </div>
              
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">Gender</span>
//                 <span className="font-semibold text-gray-800">Male</span>
//               </div>
              
//               <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-xl transition-colors duration-200">
//                 <span className="text-gray-600 font-medium">Joined On</span>
//                 <span className="font-semibold text-gray-800">February 19, 2025</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mood History Section - Full Width */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">Recent Mood History</h3>
//             <button className="py-2 px-4 bg-white rounded-xl shadow-sm text-blue-600 font-medium hover:bg-blue-50 transition-all duration-200 text-sm">
//               See All →
//             </button>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center mr-3">😊</div>
//               <div>
//                 <p className="font-medium text-gray-800">Happy</p>
//                 <p className="text-xs text-gray-500">Today, 2:30 PM</p>
//               </div>
//             </div>
            
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center mr-3">😭</div>
//               <div>
//                 <p className="font-medium text-gray-800">Crying</p>
//                 <p className="text-xs text-gray-500">Yesterday</p>
//               </div>
//             </div>
            
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-3">🤩</div>
//               <div>
//                 <p className="font-medium text-gray-800">Excited</p>
//                 <p className="text-xs text-gray-500">2 days ago</p>
//               </div>
//             </div>
            
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center mr-3">😟</div>
//               <div>
//                 <p className="font-medium text-gray-800">Worried</p>
//                 <p className="text-xs text-gray-500">3 days ago</p>
//               </div>
//             </div>
            
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center mr-3">😠</div>
//               <div>
//                 <p className="font-medium text-gray-800">Angry</p>
//                 <p className="text-xs text-gray-500">Last week</p>
//               </div>
//             </div>
            
//             <div className="bg-white shadow-md rounded-xl p-3 flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">😔</div>
//               <div>
//                 <p className="font-medium text-gray-800">Sad</p>
//                 <p className="text-xs text-gray-500">Last week</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";


const Profile = () => {

  const [edit, setEdit] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState("")
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState(null)


  const [userData, setUserData] = useState(null)
  const auth = getAuth();
  const user = auth.currentUser

  const fetchUserData = async () => {
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      // Get the Firebase token
      const token = await user.getIdToken();

      // Make a GET request to your backend to fetch the user data
      const response = await fetch('https://cuddle-up-backend.onrender.com/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach the Firebase token
        },
      });

      // Parse response and handle errors
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong fetching the user data');
      }

      // Store the user data in the state
      setUserData(data);
      setName(data.name || '');
      setAge(data.age || '');
      setGender(data.gender || '');
      setCity(data.city || '');
      setCountry(data.country || '');
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
     fetchUserData(); // Call the fetch function when the component mounts
  }, [user]); // Re-run if the user changes (e.g., on login)

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }
  console.log(userData)


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
      const response = await fetch("https://cuddle-up-backend.onrender.com/api/users/update", {
        method: "PUT",
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
  
      fetchUserData();
      // navigate("/login");
    } catch (error) {
      console.error("Update error:", error.message);
      setError(error.message);
    }
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
                NM
              </div>
              <div className="absolute bottom-0 right-0 bg-green-400 h-6 w-6 rounded-full border-4 border-white"></div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{userData.name}</h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mt-1">
              Free Member
            </div>
            
            <div className="w-full border-b border-gray-200 my-4"></div>
            
            <div className="flex items-center justify-center w-full gap-3 mt-2">
              <div className="text-center">
                <p className="text-gray-500 text-xs">Moods</p>
                <p className="font-bold text-gray-800">124</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">Streak</p>
                <p className="font-bold text-gray-800">7 days</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">Insights</p>
                <p className="font-bold text-gray-800">36</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 w-full space-y-2">
              <button onClick={() => setEdit(!edit)} className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-200">
                {!edit ? "Edit Profile" : "Cancel"}
              </button>
              <button className="w-full py-2.5 px-4 bg-white backdrop-blur-lg rounded-xl shadow-md text-gray-800 font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200">
               View Dashboard
              </button>
            </div>
          </div>

          {/* Profile Details - Middle & Right Column */}
          <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
            <button onClick={(e) => {handleUpdate(e);setEdit(!edit)}} className={`text-blue-600 ${!edit ? 'hidden' : ''} hover:text-blue-800 text-sm font-medium`}>
                Submit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                {edit ? <input type="text" className="border-dashed border-2" value={name} onChange={e => setName(e.target.value)} /> :
                <p className="text-gray-800 font-semibold">{userData.name}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Age</label>
                {edit ? <input type="text" className="border-dashed border-2" value={age} onChange={e => setAge(e.target.value)} /> :
                <p className="text-gray-800 font-semibold">{userData.age}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">City</label>
                {edit ? <input type="text" className="border-dashed border-2" value={city} onChange={e => setCity(e.target.value)} /> :
                <p className="text-gray-800 font-semibold">{userData.city}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Country</label>
                {edit ? <input type="text" className="border-dashed border-2" value={country} onChange={e => setCountry(e.target.value)} /> :
                <p className="text-gray-800 font-semibold">{userData.country}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                {edit ? <input type="text" className="border-dashed border-2" value={gender} onChange={e => setGender(e.target.value)} /> :
                <p className="text-gray-800 font-semibold">{userData.gender}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">Joined On</label>
                <p className="text-gray-800 font-semibold">{userData.createdAt}</p>
              </div>
            </div>
            
            <div className="mt-8">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold text-gray-800">Account Preferences</h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-not-allowed">
    {[
      { title: "Theme", description: "Light mode" },
      { title: "Notifications", description: "Enabled" },
      { title: "Language", description: "English (US)" },
      { title: "Privacy", description: "Private account" },
    ].map((item, index) => (
      <div key={index} className="relative flex items-center justify-between bg-gray-50 p-3 rounded-xl opacity-50">
        <div>
          <p className="font-medium text-gray-800">{item.title}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        <button 
          className="text-gray-400 text-sm cursor-not-allowed"
          disabled
        >
          Locked
        </button>
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center rounded-xl">
          <span className="text-sm font-medium text-gray-700">🔒 Premium Required</span>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Account Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Theme</p>
                    <p className="text-sm text-gray-500">Light mode</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Change</button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-500">Enabled</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Language</p>
                    <p className="text-sm text-gray-500">English (US)</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Change</button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">Privacy</p>
                    <p className="text-sm text-gray-500">Private account</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Manage</button>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Mood History Section - Full Width */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-xl font-semibold text-gray-800">Recent Mood History</h3>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">🔒 Premium Access Required</span>
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 opacity-50 cursor-not-allowed">
    {/* Each mood item here will appear dimmed and uninteractive */}
    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-2xl">😊</div>
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Happy</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Today, 2:30 PM</p>
      <p className="text-sm text-gray-700 mt-1">Personal Achievement</p>
    </div>
    
    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-2xl">😭</div>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Crying</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Yesterday</p>
      <p className="text-sm text-gray-700 mt-1">Relationship Issues</p>
    </div>
    
    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-2xl">🤩</div>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Excited</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">2 days ago</p>
      <p className="text-sm text-gray-700 mt-1">Excited for the Future</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center text-2xl">😟</div>
        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Worried</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">3 days ago</p>
      <p className="text-sm text-gray-700 mt-1">Work Stress</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-2xl">😠</div>
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Angry</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Last week</p>
      <p className="text-sm text-gray-700 mt-1">Unexpected Event</p>
    </div>

    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">😔</div>
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">Sad</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Last week</p>
      <p className="text-sm text-gray-700 mt-1">Feeling Lonely</p>
    </div>
  </div>
</div>

        {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Mood History</h3>
            <button className="py-2 px-4 bg-blue-50 rounded-xl text-blue-600 font-medium hover:bg-blue-100 transition-all duration-200 text-sm">
              View All Moods
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center text-2xl">😊</div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Happy</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Today, 2:30 PM</p>
              <p className="text-sm text-gray-700 mt-1">Personal Achievement</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-2xl">😭</div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Crying</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Yesterday</p>
              <p className="text-sm text-gray-700 mt-1">Relationship Issues</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center text-2xl">🤩</div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Excited</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">2 days ago</p>
              <p className="text-sm text-gray-700 mt-1">Excited for the Future</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-purple-300 flex items-center justify-center text-2xl">😟</div>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Worried</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">3 days ago</p>
              <p className="text-sm text-gray-700 mt-1">Work Stress</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-2xl">😠</div>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Angry</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last week</p>
              <p className="text-sm text-gray-700 mt-1">Unexpected Event</p>
            </div>
            
            <div className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">😔</div>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">Sad</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last week</p>
              <p className="text-sm text-gray-700 mt-1">Feeling Lonely</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;