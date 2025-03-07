// import React, { useState } from 'react';
// import { Camera, Mic, Keyboard, Smile, Frown, Angry, AlertCircle, Meh } from 'lucide-react';

// const MoodCapture = () => {
//   const [selectedMood, setSelectedMood] = useState(null);

//   const moods = [
//     { emoji: '😊', label: 'Happy', color: 'bg-yellow-300' },
//     { emoji: '😔', label: 'Sad', color: 'bg-gray-300' },
//     { emoji: '😠', label: 'Angry', color: 'bg-red-400' },
//     { emoji: '🤩', label: 'Excited', color: 'bg-green-300' },
//     { emoji: '😟', label: 'Worried', color: 'bg-purple-300' },
//     { emoji: '😭', label: 'Crying', color: 'bg-blue-300' }
//   ];

//   const mediaOptions = [
//     { icon: <img src='/images/camera.png' className='h-16 w-16' />, label: 'Picture Your Emotions', color: 'hover:bg-blue-200' },
//     // { icon: <Camera />, label: 'Photo', color: 'hover:bg-blue-200' },
//     { icon: <img src='/images/microphone.png' className='h-16 w-16' />, label: 'Speak Up, Share Your Mood', color: 'hover:bg-purple-200' },
//     // { icon: <Mic />, label: 'Voice', color: 'hover:bg-purple-200' },
//     { icon: <img src='/images/conversation.png' className='h-16 w-16' />, label: 'Type to Express', color: 'hover:bg-pink-200' }
//     // { icon: <Keyboard />, label: 'Text', color: 'hover:bg-pink-200' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       {/* Background Decorative Elements (Consistent with HomePage) */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-32 left-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
//         <div className="absolute top-48 right-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
//         <div className="absolute -bottom-16 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
//       </div>

//       <div className="relative z-10 w-full max-w-5xl">
//         {/* Title Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Capture Your Mood
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Express how you feel and track your emotions over time.
//           </p>
//         </div>

//         {/* Mood Selection Section */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">How are you feeling?</h2>

//           <div className="grid grid-cols-6 gap-4 justify-center">
//             {moods.map((mood, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div
//                   onClick={() => setSelectedMood(mood)}
//                   className={`
//                     w-20 h-20 rounded-2xl cursor-pointer text-4xl flex items-center justify-center
//                     transition-all duration-200 shadow-md hover:shadow-lg active:scale-95
//                     ${selectedMood === mood ? 'scale-110 shadow-lg ring-2 ring-blue-400' : ''}
//                     ${mood.color}
//                   `}
//                 >
//                   <button className='hover:mb-4 hover:transition-all'>{mood.emoji}</button>
//                 </div>

//                 {/* Cute, Styled Mood Label */}
//                 <span className="mt-2 cursor-pointer text-sm font-medium text-gray-800 bg-white/80 px-3 py-1">
//                   {mood.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Media Input Options */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Capture Your Mood with Media</h2>
//           <div className="grid grid-cols-3 gap-6">
//             {mediaOptions.map((option, index) => (
//               <button
//                 key={index}
//                 className={`
//                   h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-lg font-medium
//                   bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 ${option.color}
//                 `}
//               >
//                 <span className="text-4xl">{option.icon}</span>
//                 <span className='text-sm'>{option.label}</span>
//               </button>
//             ))}

//           </div>
//         </div>

//         {/* Mood Result Section */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 flex items-center justify-center text-gray-500 text-lg w-full min-h-[150px]">
//           {selectedMood ? (
//             <div className="text-center">
//               <span className="text-6xl">{selectedMood.emoji}</span>
//               <p className="mt-2 text-gray-700 text-lg">{selectedMood.label}</p>
//             </div>
//           ) : (
//             <p>Your selected mood and media will appear here</p>

//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodCapture;

// Using this
// import React, { useState } from "react";
// import MoodInputModal from "./MoodInputModal"; // Import the modal

// const MoodCapture = () => {
//   const [selectedMood, setSelectedMood] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputType, setInputType] = useState(null);

//   const moods = [
//     { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
//     { emoji: "😔", label: "Sad", color: "bg-gray-300" },
//     { emoji: "😠", label: "Angry", color: "bg-red-400" },
//     { emoji: "🤩", label: "Excited", color: "bg-green-300" },
//     { emoji: "😟", label: "Worried", color: "bg-purple-300" },
//     { emoji: "😭", label: "Crying", color: "bg-blue-300" },
//   ];

//   const mediaOptions = [
//     { type: "photo", icon: <img src='/images/camera.png' className='h-16 w-16' />, label: "Picture Your Emotions", color: "hover:bg-blue-200" },
//     { type: "audio", icon: <img src='/images/microphone.png' className='h-16 w-16' />, label: "Speak Up, Share Your Mood", color: "hover:bg-purple-200" },
//     { type: "text", icon: <img src='/images/conversation.png' className="h-16 w-16" />, label: "Type to Express", color: "hover:bg-pink-200" },
//   ];

//   const openModal = (type) => {
//     setInputType(type);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">

//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Capture Your Mood
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Express how you feel and track your emotions over time.
//           </p>
//         </div>

//         {/* Mood Selection */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">How are you feeling?</h2>
//           <div className="grid grid-cols-6 gap-4 justify-center">
//             {moods.map((mood, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div
//                   onClick={() => setSelectedMood(mood)}
//                   className={`w-20 h-20 rounded-2xl cursor-pointer text-4xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${selectedMood === mood ? "scale-110 shadow-lg ring-2 ring-blue-400" : ""} ${mood.color}`}
//                 >
//                 <button className='hover:mb-4 hover:transition-all'>{mood.emoji}</button>

//                 </div>
//                 <span className="mt-2 cursor-pointer text-sm font-medium text-gray-800 bg-white/80 px-3 py-1">
//                   {mood.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Media Input Options */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Capture Your Mood with Media</h2>
//           <div className="grid grid-cols-3 gap-6">
//             {mediaOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => openModal(option.type)}
//                 className={`h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-lg font-medium bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 ${option.color}`}
//               >
//                 <span className="text-4xl">{option.icon}</span>
//                 <span className="text-sm">{option.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Mood Result Section */}
//         {/* <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 flex items-center justify-center text-gray-500 text-lg w-full min-h-[150px]">
//           {selectedMood ? (
//             <div className="text-center">
//               <span className="text-6xl">{selectedMood.emoji}</span>
//               <p className="mt-2 text-gray-700 text-lg">{selectedMood.label}</p>
//             </div>
//           ) : (
//             <p>Your selected mood and media will appear here</p>
//           )}
//         </div> */}
//         {/* Mood Result Section */}
// <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 flex flex-col items-center justify-center text-gray-700 text-lg w-full min-h-[200px] transition-all duration-300">
//   {selectedMood ? (
//     <div className="text-center">
//       <span className="text-6xl">{selectedMood.emoji}</span>
//       <p className="mt-2 text-xl font-semibold">{selectedMood.label}</p>
//       <p className="mt-2 text-gray-600 text-sm">
//         {selectedMood.label === "Happy" ? "Keep up the positivity! 😊 Try sharing your joy with someone today." :
//         selectedMood.label === "Sad" ? "It’s okay to feel sad. Take a break, listen to your favorite song, or talk to a friend. 💙" :
//         selectedMood.label === "Angry" ? "Breathe deeply, take a short walk, or write down your thoughts to ease the tension. 🔥" :
//         selectedMood.label === "Excited" ? "Channel your excitement into something productive or celebrate your joy! 🎉" :
//         selectedMood.label === "Worried" ? "Try noting down your concerns and addressing them step by step. You're stronger than you think. 💪" :
//         "Expressing emotions is healthy. If you're feeling overwhelmed, talking to someone can help. 💖"}
//       </p>
//     </div>
//   ) : (
//     <p>Select a mood to see insights and recommendations.</p>
//   )}
// </div>

//       </div>

//       {/* Reusable Modal */}
//       <MoodInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} inputType={inputType} />
//     </div>
//   );
// };

// export default MoodCapture;

// import React, { useState, useRef } from "react";
// import MoodInputModal from "./MoodInputModal"; // Import modal

// const MoodCapture = () => {
//   const [selectedMood, setSelectedMood] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputType, setInputType] = useState(null);
//   const insightsRef = useRef(null);

//   const moods = [
//     { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
//     { emoji: "😔", label: "Sad", color: "bg-gray-300" },
//     { emoji: "😠", label: "Angry", color: "bg-red-400" },
//     { emoji: "🤩", label: "Excited", color: "bg-green-300" },
//     { emoji: "😟", label: "Worried", color: "bg-purple-300" },
//     { emoji: "😭", label: "Crying", color: "bg-blue-300" },
//   ];

//   const moodInsights = {
//     Happy: { text: "Stay positive! 😊 Share your happiness with a friend.", food: "Try a fresh fruit smoothie 🍓🥤" },
//     Sad: { text: "It’s okay to feel down. Take time to rest and recharge.", food: "Warm herbal tea ☕ can be comforting." },
//     Angry: { text: "Breathe deeply, and try some relaxation techniques.", food: "Dark chocolate 🍫 helps improve mood." },
//     Excited: { text: "Enjoy the energy boost! Channel it into something creative.", food: "A protein-packed snack 🥜 keeps you fueled." },
//     Worried: { text: "Break tasks into steps. You’ve got this!", food: "Green tea 🍵 may help with relaxation." },
//     Crying: { text: "Let it out. Talking to someone can help.", food: "Comfort food like soup 🍜 can be soothing." },
//   };

//   const openModal = (type) => {
//     setInputType(type);
//     setIsModalOpen(true);
//   };

//   const handleMoodClick = (mood) => {
//     setSelectedMood(mood);

//     setTimeout(() => {
//       insightsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 300); // Small delay for smooth experience
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Capture Your Mood
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Express how you feel and track your emotions over time.
//           </p>
//         </div>

//         {/* Mood Selection */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">How are you feeling?</h2>
//           <div className="grid grid-cols-6 gap-4 justify-center">
//             {moods.map((mood, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div
//                   onClick={() => handleMoodClick(mood)}
//                   className={`w-20 h-20 rounded-2xl cursor-pointer text-4xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${
//                     selectedMood === mood ? "scale-110 shadow-lg ring-2 ring-blue-400" : ""
//                   } ${mood.color}`}
//                 >
//                   <button className='hover:mb-4 hover:transition-all'>{mood.emoji}</button>
//                 </div>
//                 <span className="mt-2 cursor-pointer text-sm font-medium text-gray-800 bg-white/80 px-3 py-1">
//                   {mood.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Media Input Options */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Capture Your Mood with Media</h2>
//           <div className="grid grid-cols-3 gap-6">
//             {["photo", "audio", "text"].map((type, index) => (
//               <button
//                 key={index}
//                 onClick={() => openModal(type)}
//                 className="h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-lg font-medium bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 hover:bg-blue-200"
//               >
//                 <span className="text-4xl">📷</span>
//                 <span className="text-sm capitalize">{type === "photo" ? "Picture Your Emotions" : type === "audio" ? "Speak Up, Share Your Mood" : "Type to Express"}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mood Insights Section */}
//       <div
//         ref={insightsRef}
//         className={`transition-all duration-500 ease-in-out max-w-5xl w-full h-[50vh] bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 text-center mx-auto ${
//           selectedMood ? "opacity-100 scale-100" : "opacity-0 scale-95"
//         }`}
//       >
//         {selectedMood && (
//           <>
//             <span className="text-6xl">{selectedMood.emoji}</span>
//             <p className="mt-2 text-xl font-semibold">{selectedMood.label}</p>
//             <p className="mt-2 text-gray-600 text-sm">{moodInsights[selectedMood.label]?.text}</p>
//             <p className="mt-4 text-gray-800 font-medium">{moodInsights[selectedMood.label]?.food}</p>
//           </>
//         )}
//       </div>

//       {/* Reusable Modal */}
//       <MoodInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} inputType={inputType} />
//     </div>
//   );
// };

// export default MoodCapture;





// import React, { useState, useRef } from "react";
// import MoodInputModal from "./MoodInputModal";
// import emotionColors from "../emotionColors.json";
// import { getAuth } from "firebase/auth";


// const MoodCapture = () => {
//   const [selectedMood, setSelectedMood] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputType, setInputType] = useState(null);
//   const insightsRef = useRef(null);

//   const [previousMood, setPreviousMood] = useState(null); 
//   const [errorMessage, setErrorMessage] = useState(""); 



//   const moodColor =
//     emotionColors[selectedMood?.label.toLowerCase()] || "#FFFFFF"; // default to white if not found

//   const moods = [
//     { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
//     { emoji: "😔", label: "Sad", color: "bg-gray-300" },
//     { emoji: "😠", label: "Angry", color: "bg-red-400" },
//     { emoji: "🤩", label: "Excited", color: "bg-green-300" },
//     { emoji: "😟", label: "Worried", color: "bg-purple-300" },
//     { emoji: "😭", label: "Crying", color: "bg-blue-300" },
//   ];

//   const mediaOptions = [
//     {
//       type: "photo",
//       icon: <img src="/images/camera.png" className="h-16 w-16" />,
//       label: "Picture Your Emotions",
//       color: "hover:bg-blue-200",
//     },
//     {
//       type: "audio",
//       icon: <img src="/images/microphone.png" className="h-16 w-16" />,
//       label: "Speak Up, Share Your Mood",
//       color: "hover:bg-purple-200",
//     },
//     {
//       type: "text",
//       icon: <img src="/images/conversation.png" className="h-16 w-16" />,
//       label: "Type to Express",
//       color: "hover:bg-pink-200",
//     },
//   ];

//   const moodInsights = {
//     Happy: {
//       text: "Stay positive! 😊 Share your happiness with a friend.",
//       food: "Try a fresh fruit smoothie 🍓🥤",
//     },
//     Sad: {
//       text: "It’s okay to feel down. Take time to rest and recharge.",
//       food: "Warm herbal tea ☕ can be comforting.",
//     },
//     Angry: {
//       text: "Breathe deeply, and try some relaxation techniques.",
//       food: "Dark chocolate 🍫 helps improve mood.",
//     },
//     Excited: {
//       text: "Enjoy the energy boost! Channel it into something creative.",
//       food: "A protein-packed snack 🥜 keeps you fueled.",
//     },
//     Worried: {
//       text: "Break tasks into steps. You’ve got this!",
//       food: "Green tea 🍵 may help with relaxation.",
//     },
//     Crying: {
//       text: "Let it out. Talking to someone can help.",
//       food: "Comfort food like soup 🍜 can be soothing.",
//     },
//   };

//   const openModal = (type) => {
//     setInputType(type);
//     setIsModalOpen(true);
//   };

//   const handleMoodClick = (mood) => {
//     setSelectedMood(mood);

//     setTimeout(() => {
//       insightsRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 300); // Small delay for smooth experience
//   };

//   const [reasons, setReasons] = useState([
//     "Work Stress",
//     "Relationship Issues",
//     "Health Concerns",
//     "Personal Achievement",
//     "Unexpected Event",
//     "Feeling Lonely",
//     "Excited for the Future",
//     "Nothing in Particular",
//     "Other", // Option for custom reason
//   ]);

//   const [selectedReason, setSelectedReason] = useState("");
//   const [customReason, setCustomReason] = useState("");

//   const handleSaveMood = async () => {

//     const auth = getAuth();
//     const user = auth.currentUser

//     const reasonToSave = selectedReason === "Other" ? customReason : selectedReason;

  
//     if (
//       previousMood?.mood === selectedMood.label &&
//       previousMood?.reason === reasonToSave
//     ) {
//       setErrorMessage("You cannot save the same mood and reason again.");
//       return;
//     }

//     if (selectedReason === "Other" && customReason && !reasons.includes(customReason)) {
//       setReasons((prevReasons) => [...prevReasons, customReason]);
//     }
   
//     setPreviousMood({ mood: selectedMood.label, reason: reasonToSave });
//     setErrorMessage(""); 

//     const moodData = {
//       mood: selectedMood.label,
//       reason: reasonToSave,
//     };

//     try {

//       const token = await user.getIdToken();
  
//       const response = await fetch('http://localhost:5001/api/users/store-mood', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, 
//         },
//         body: JSON.stringify(moodData),
//       });
  
//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.error || 'Failed to save mood.');
//       }
  
  
//       setPreviousMood({ mood: selectedMood.label, reason: reasonToSave });
//       setErrorMessage(""); 
  

//       alert('Mood saved successfully!');
//     } catch (error) {
//       setErrorMessage(error.message);
//     }

//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-5xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Capture Your Mood
//           </h1>
//           <p className="text-lg text-gray-600 font-light mt-2">
//             Express how you feel and track your emotions over time.
//           </p>
//         </div>

//         {/* Mood Selection */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//             How are you feeling?
//           </h2>
//           <div className="grid grid-cols-6 gap-4 justify-center">
//             {moods.map((mood, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div
//                   onClick={() => handleMoodClick(mood)}
//                   className={`w-20 h-20 rounded-2xl cursor-pointer text-4xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${
//                     selectedMood === mood
//                       ? "scale-110 shadow-lg ring-2 ring-blue-400"
//                       : ""
//                   } ${mood.color}`}
//                 >
//                   <button className="hover:mb-4 hover:transition-all">
//                     {mood.emoji}
//                   </button>
//                 </div>
//                 <span className="mt-2 cursor-pointer text-sm font-medium text-gray-800 bg-white/80 px-3 py-1">
//                   {mood.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Media Input Options */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 mb-8 w-full">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//             Capture Your Mood with Media
//           </h2>
//           <div className="grid grid-cols-3 gap-6">
//             {mediaOptions.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => openModal(option.type)}
//                 // className="h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-lg font-medium bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 hover:bg-blue-200"
//                 className={`h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-lg font-medium bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 ${option.color}`}
//               >
//                 <span className="text-4xl">{option.icon}</span>
//                 <span className="text-sm">{option.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mood Insights Section */}
//       {/* {selectedMood && (
//         <div
//           ref={insightsRef}
//           className="transition-all h-[50vh] duration-500 ease-in-out max-w-5xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 text-center mx-auto"
//         >
//           <span className="text-6xl">{selectedMood.emoji}</span>
//           <p className="mt-2 text-xl font-semibold">{selectedMood.label}</p>
//           <p className="mt-2 text-gray-600 text-sm">{moodInsights[selectedMood.label]?.text}</p>
//           <p className="mt-4 text-gray-800 font-medium">{moodInsights[selectedMood.label]?.food}</p>
//         </div>
//       )} */}
//       {/* Mood Insights Section */}
//       {selectedMood && (
//         <div
//           ref={insightsRef}
//           className="transition-all overflow-scroll h-[50vh] duration-500 ease-in-out max-w-5xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-11 mx-auto"
//           style={{ backgroundColor: moodColor }}
//         >
//           <span className="text-6xl">{selectedMood.emoji}</span>
//           <p className="mt-2 text-xl font-semibold">{selectedMood.label}</p>
//           <p className="mt-2 text-gray-600 text-sm">
//             {moodInsights[selectedMood.label]?.text}
//           </p>
//           <p className="mt-4 text-gray-800 font-medium">
//             {moodInsights[selectedMood.label]?.food}
//           </p>

//           {/* Dropdown for reasons */}
//           <div className="mt-4">
//           <label htmlFor="moodReason" className="block text-sm font-medium text-gray-700">
//             Why do you feel this way?
//           </label>
//           <select
//             id="moodReason"
//             value={selectedReason}
//             onChange={(e) => {
//               setSelectedReason(e.target.value);
//               if (e.target.value !== "Other") {
//                 setCustomReason(""); // Clear the custom reason when an option is selected
//               }
//             }}
//             className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="">Select a reason</option>
//             {reasons.map((reason, index) => (
//               <option key={index} value={reason}>
//                 {reason}
//               </option>
//             ))}
//           </select>
//         </div>

//          {/* Custom reason input if 'Other' is selected */}
//          {selectedReason === "Other" && (
//           <div className="mt-4">
//             <label htmlFor="customReason" className="block text-sm font-medium text-gray-700">
//               Please specify the reason:
//             </label>
//             <input
//               type="text"
//               id="customReason"
//               value={customReason}
//               onChange={(e) => setCustomReason(e.target.value)}
//               className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Enter your reason"
//             />
//           </div>
//         )}

//         {/* <div className="mt-4">
//           <label htmlFor="moodReason" className="block text-sm font-medium text-gray-700">
//             Why do you feel this way?
//           </label>
//           <select
//             id="moodReason"
//             value={selectedReason}
//             onChange={(e) => setSelectedReason(e.target.value)}
//             className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="">Select a reason</option>
//             {reasons.map((reason, index) => (
//               <option key={index} value={reason}>
//                 {reason}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         {/* Display error message if the same mood and reason are selected */}
//         {errorMessage && <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>}

//           <div className="mt-6 flex justify-between p-10  gap-4">
//             <button className="w-36 py-3 px-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl text-gray-800 font-semibold hover:bg-white/80 hover:shadow-lg transition-all duration-200"
//              onClick={handleSaveMood}>
//               Save Mood
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Reusable Modal */}
//       <MoodInputModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         inputType={inputType}
//       />
//     </div>
//   );
// };

// export default MoodCapture;








// {
//   "happy": "#FFD700",
//   "sad": "#1E90FF",
//   "angry": "#FF6347",
//   "surprised": "#FF1493",
//   "neutral": "#B0C4DE",
//   "excited": "#32CD32",
//   "bored": "#D3D3D3",
//   "fearful": "#800080",
//   "worried": "#FFA500",
//   "crying": "#0000FF",
//   "know": "#8A2BE2"
// }







import React, { useState, useRef } from "react";
import MoodInputModal from "./MoodInputModal";
import emotionColors from "../emotionColors.json";
import { getAuth } from "firebase/auth";

const MoodCapture = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputType, setInputType] = useState(null);
  const insightsRef = useRef(null);
  const [previousMood, setPreviousMood] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const moodColor = emotionColors[selectedMood?.label.toLowerCase()] || "#FFFFFF";

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
    { emoji: "😔", label: "Sad", color: "bg-gray-300" },
    { emoji: "😠", label: "Angry", color: "bg-red-400" },
    { emoji: "🤩", label: "Excited", color: "bg-green-300" },
    { emoji: "😟", label: "Worried", color: "bg-purple-300" },
    { emoji: "😭", label: "Crying", color: "bg-blue-300" },
  ];

  const mediaOptions = [
    {
      type: "photo",
      icon: <img src="/images/camera.png" className="h-12 w-12 md:h-16 md:w-16" alt="Camera" />,
      label: "Picture Your Emotions",
      color: "hover:bg-blue-200",
    },
    {
      type: "audio",
      icon: <img src="/images/microphone.png" className="h-12 w-12 md:h-16 md:w-16" alt="Microphone" />,
      label: "Speak Up, Share Your Mood",
      color: "hover:bg-purple-200",
    },
    {
      type: "text",
      icon: <img src="/images/conversation.png" className="h-12 w-12 md:h-16 md:w-16" alt="Text" />,
      label: "Type to Express",
      color: "hover:bg-pink-200",
    },
  ];

  const moodInsights = {
    Happy: {
      text: "Stay positive! 😊 Share your happiness with a friend.",
      food: "Try a fresh fruit smoothie 🍓🥤",
    },
    Sad: {
      text: "It's okay to feel down. Take time to rest and recharge.",
      food: "Warm herbal tea ☕ can be comforting.",
    },
    Angry: {
      text: "Breathe deeply, and try some relaxation techniques.",
      food: "Dark chocolate 🍫 helps improve mood.",
    },
    Excited: {
      text: "Enjoy the energy boost! Channel it into something creative.",
      food: "A protein-packed snack 🥜 keeps you fueled.",
    },
    Worried: {
      text: "Break tasks into steps. You've got this!",
      food: "Green tea 🍵 may help with relaxation.",
    },
    Crying: {
      text: "Let it out. Talking to someone can help.",
      food: "Comfort food like soup 🍜 can be soothing.",
    },
  };

  const [reasons, setReasons] = useState([
    "Work Stress",
    "Relationship Issues",
    "Health Concerns",
    "Personal Achievement",
    "Unexpected Event",
    "Feeling Lonely",
    "Excited for the Future",
    "Nothing in Particular",
    "Other",
  ]);

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const openModal = (type) => {
    setInputType(type);
    setIsModalOpen(true);
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      insightsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const handleSaveMood = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const reasonToSave = selectedReason === "Other" ? customReason : selectedReason;

    if (
      previousMood?.mood === selectedMood.label &&
      previousMood?.reason === reasonToSave
    ) {
      setErrorMessage("You cannot save the same mood and reason again.");
      return;
    }

    if (selectedReason === "Other" && customReason && !reasons.includes(customReason)) {
      setReasons((prevReasons) => [...prevReasons, customReason]);
    }

    setPreviousMood({ mood: selectedMood.label, reason: reasonToSave });
    setErrorMessage("");

    const moodData = {
      mood: selectedMood.label,
      reason: reasonToSave,
    };

    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5001/api/users/store-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(moodData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save mood.');
      }

      setPreviousMood({ mood: selectedMood.label, reason: reasonToSave });
      setErrorMessage("");
      alert('Mood saved successfully!');
      setSelectedMood(null)
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-4 md:p-10 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Capture Your Mood
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light mt-2">
            Express how you feel and track your emotions over time.
          </p>
        </div>

        {/* Mood Selection */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-8 mb-6 md:mb-8 w-full">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">
            How are you feeling?
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 justify-center">
            {moods.map((mood, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  onClick={() => handleMoodClick(mood)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl cursor-pointer text-3xl md:text-4xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${
                    selectedMood === mood
                      ? "scale-110 shadow-lg ring-2 ring-blue-400"
                      : ""
                  } ${mood.color}`}
                >
                  <button className="hover:mb-4 hover:transition-all">
                    {mood.emoji}
                  </button>
                </div>
                <span className="mt-2 cursor-pointer text-xs md:text-sm font-medium text-gray-800 bg-white/80 px-2 md:px-3 py-1">
                  {mood.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Input Options */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-8 mb-6 md:mb-8 w-full">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">
            Capture Your Mood with Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {mediaOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => openModal(option.type)}
                className={`h-24 md:h-32 w-full flex flex-col items-center justify-center gap-2 rounded-2xl text-base md:text-lg font-medium bg-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 ${option.color}`}
              >
                <span className="text-3xl md:text-4xl">{option.icon}</span>
                <span className="text-xs md:text-sm px-2 text-center">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Insights Section */}
      {/* {selectedMood && (
        <div
          ref={insightsRef}
          className="transition-all overflow-y-auto h-[60vh] md:h-[50vh] duration-500 ease-in-out max-w-5xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-11 mx-auto"
          style={{ backgroundColor: moodColor }}
        >
          <span className="text-4xl md:text-6xl">{selectedMood.emoji}</span>
          <p className="mt-2 text-lg md:text-xl font-semibold">{selectedMood.label}</p>
          <p className="mt-2 text-xs md:text-sm text-gray-600">
            {moodInsights[selectedMood.label]?.text}
          </p>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-800 font-medium">
            {moodInsights[selectedMood.label]?.food}
          </p>

       
          <div className="mt-4">
            <label htmlFor="moodReason" className="block text-sm font-medium text-gray-700">
              Why do you feel this way?
            </label>
            <select
              id="moodReason"
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
                if (e.target.value !== "Other") {
                  setCustomReason("");
                }
              }}
              className="mt-2 block w-full px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Select a reason</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

        
          {selectedReason === "Other" && (
            <div className="mt-4">
              <label htmlFor="customReason" className="block text-sm font-medium text-gray-700">
                Please specify the reason:
              </label>
              <input
                type="text"
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2 block w-full px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Enter your reason"
              />
            </div>
          )}

          {errorMessage && <p className="mt-4 text-red-500 text-xs md:text-sm">{errorMessage}</p>}

          <div className="mt-6 flex justify-between p-4 md:p-10 gap-4">
            <button 
              className="w-full md:w-36 py-2 md:py-3 px-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl text-gray-800 font-semibold hover:bg-white/80 hover:shadow-lg transition-all duration-200"
              onClick={handleSaveMood}
            >
              Save Mood
            </button>
          </div>
        </div>
      )} */}


    
{/* Using this */}
      {/* Mood Insights Section */}
{selectedMood && (
  <div
    ref={insightsRef}
    className="transition-all overflow-y-auto h-[60vh] md:h-[50vh] duration-500 ease-in-out max-w-5xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-8 mx-auto"
    style={{ backgroundColor: moodColor }}
  >

    <div className="border-b border-gray-200/50 pb-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="bg-white/50 h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center shadow-md">
          <span className="text-4xl md:text-5xl">{selectedMood.emoji}</span>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Mood Analysis: {selectedMood.label}</h2>
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
    

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
          <h3 className="text-gray-800 font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Personalized Insight
          </h3>
          <p className="text-gray-700">
            {moodInsights[selectedMood.label]?.text}
          </p>
        </div>
        
      
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
          <h3 className="text-gray-800 font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Nutrition Recommendation
          </h3>
          <p className="text-gray-700">
            {moodInsights[selectedMood.label]?.food}
          </p>
        </div>
      </div>
      

      <div className="space-y-6">
    
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
          <h3 className="text-gray-800 font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mood Causation
          </h3>
          <label htmlFor="moodReason" className="block text-sm text-gray-600 mb-2">
            What factors contributed to this mood?
          </label>
          <select
            id="moodReason"
            value={selectedReason}
            onChange={(e) => {
              setSelectedReason(e.target.value);
              if (e.target.value !== "Other") {
                setCustomReason("");
              }
            }}
            className="block w-full px-3 py-2 bg-transparent border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            <option value="">Select a reason</option>
            {reasons.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {selectedReason === "Other" && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
            <h3 className="text-gray-800 font-medium mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Custom Reason
            </h3>
            <label htmlFor="customReason" className="block text-sm text-gray-600 mb-2">
              Please specify your reason:
            </label>
            <input
              type="text"
              id="customReason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              placeholder="Enter your reason"
            />
          </div>
        )}
      </div>
    </div>
    

    {errorMessage && (
      <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
        <p className="text-red-600 text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage}
        </p>
      </div>
    )}
    

    <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-end">
      <button 
        className="py-2 px-6 bg-white/90 backdrop-blur-lg rounded-md shadow-md text-gray-800 font-medium hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center"
        onClick={handleSaveMood}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Save Mood
      </button>
    </div>
  </div>
)}








      {/* Reusable Modal */}
      <MoodInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inputType={inputType}
      />
    </div>
  );
};

export default MoodCapture;