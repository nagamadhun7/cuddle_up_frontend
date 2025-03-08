import React, { useState, useRef, useEffect } from "react";
import MoodInputModal from "./MoodInputModal";
import emotionColors from "../emotionColors.json";
import { getAuth } from "firebase/auth";
import axios from "axios";

const MoodCapture = ({ user, isGuest }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputType, setInputType] = useState(null);
  const insightsRef = useRef(null);
  const [previousMood, setPreviousMood] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [reasons, setReasons] = useState([]);

  const [isCustomReasonSubmitted, setIsCustomReasonSubmitted] = useState(false);

  // const moodColor = emotionColors[selectedMood?.label.toLowerCase()] || "#FFFFFF";
  const moodColor =
    emotionColors[selectedMood?.label?.toLowerCase()] ?? "#FFFFFF";

  // const auth = getAuth();
  // const user = auth.currentUser
  // const token = user.getIdToken();

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        // Ensure token is fetched asynchronously
        if (user) {
          const token = await user.getIdToken(true); // Force refresh the token if expired

          const response = await fetch(
            "https://cuddle-up-backend.onrender.com/api/reasons/getReasons",

            // 'http://localhost:5001/api/reasons/getReasons',
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Attach Firebase token
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setReasons(data); // Update state with fetched reasons
          } else {
            console.error("Failed to fetch reasons:", response.status);
          }
        } else {
          console.error("No user found");
        }
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchReasons();
  }, [isCustomReasonSubmitted]);

  // const moods = [
  //   { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
  //   { emoji: "😔", label: "Sad", color: "bg-gray-300" },
  //   { emoji: "😠", label: "Angry", color: "bg-red-400" },
  //   { emoji: "🤩", label: "Excited", color: "bg-green-300" },
  //   { emoji: "😟", label: "Worried", color: "bg-purple-300" },
  //   { emoji: "😭", label: "Crying", color: "bg-blue-300" },
  // ];
  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
    { emoji: "😔", label: "Sad", color: "bg-gray-300" },
    { emoji: "😠", label: "Angry", color: "bg-red-400" },
    { emoji: "😟", label: "Worried", color: "bg-purple-300" },
    { emoji: "😭", label: "Crying", color: "bg-blue-300" },
    { emoji: "🤩", label: "Excited", color: "bg-green-300" },
    { emoji: "😡", label: "Anger", color: "bg-red-400" },
    { emoji: "😔", label: "Sadness", color: "bg-gray-300" },
    { emoji: "😆", label: "Excitement", color: "bg-green-300" },
    { emoji: "😲", label: "Surprise", color: "bg-orange-300" },
    { emoji: "🤢", label: "Disgust", color: "bg-green-500" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
    { emoji: "😨", label: "Fear", color: "bg-indigo-400" },
    { emoji: "🤗", label: "Caring", color: "bg-pink-300" },
    { emoji: "😤", label: "Annoyance", color: "bg-red-500" },
    { emoji: "😞", label: "Disappointment", color: "bg-gray-500" },
    { emoji: "😬", label: "Nervousness", color: "bg-yellow-500" },
    { emoji: "👍", label: "Approval", color: "bg-green-500" },
    { emoji: "🤤", label: "Desire", color: "bg-red-300" },
    { emoji: "🤔", label: "Curiosity", color: "bg-blue-400" },
    { emoji: "😌", label: "Pride", color: "bg-purple-500" },
    { emoji: "😕", label: "Confusion", color: "bg-gray-600" },
    { emoji: "🙏", label: "Gratitude", color: "bg-yellow-400" },
    { emoji: "❤️", label: "Love", color: "bg-red-400" },
    { emoji: "😂", label: "Amusement", color: "bg-teal-300" },
    { emoji: "😢", label: "Grief", color: "bg-blue-500" },
    { emoji: "😄", label: "Joy", color: "bg-yellow-500" },
    { emoji: "👏", label: "Admiration", color: "bg-green-400" },
    { emoji: "😳", label: "Embarrassment", color: "bg-pink-400" },
    { emoji: "👎", label: "Disapproval", color: "bg-red-600" },
    { emoji: "😌", label: "Relief", color: "bg-blue-300" },
    { emoji: "😞", label: "Remorse", color: "bg-gray-500" },
    { emoji: "💡", label: "Realization", color: "bg-yellow-300" },
    { emoji: "🌟", label: "Optimism", color: "bg-green-200" },
    { emoji: "😴", label: "Boredom", color: "bg-gray-400" },
  ];

  const mediaOptions = [
    {
      type: "photo",
      icon: (
        <img
          src="/images/camera.png"
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Camera"
        />
      ),
      label: "Picture Your Emotions",
      color: "hover:bg-blue-200",
    },
    {
      type: "audio",
      icon: (
        <img
          src="/images/microphone.png"
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Microphone"
        />
      ),
      label: "Speak Up, Share Your Mood",
      color: "hover:bg-purple-200",
    },
    {
      type: "text",
      icon: (
        <img
          src="/images/conversation.png"
          className="h-12 w-12 md:h-16 md:w-16"
          alt="Text"
        />
      ),
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

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState("");

  const filteredReasons = selectedMood
    ? reasons.filter((r) => r.emotion === selectedMood.label)
    : [];

  const openModal = (type) => {
    setInputType(type);
    setIsModalOpen(true);
  };

  const handleMoodClick = (mood) => {
    if (typeof mood !== "object") {
      const matchedMood = moods.find(
        (item) => item.label.toLowerCase() === mood.toLowerCase()
      );
      if (matchedMood) {
        mood = matchedMood; // Set the mood to the matched object with emoji and color
      }
    }
    console.log(mood);
    setSelectedMood(mood);
    setTimeout(() => {
      insightsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const handleCustomReason = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!customReason.trim()) {
      setError("Custom reason cannot be empty");
      return;
    }

    try {
      if (user) {
        const token = await user.getIdToken(true); // Force refresh token

        // Send the custom reason to the backend to store
        const response = await fetch(
          "https://cuddle-up-backend.onrender.com/api/reasons/addReason",

          // 'http://localhost:5001/api/reasons/addReason',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              reason: customReason,
              emotion: selectedMood.label,
            }),
          }
        );
        console.log(response);
        if (response.ok) {
          const newReason = await response.json();
          setReasons((prevReasons) => [...prevReasons, newReason]);
          setIsCustomReasonSubmitted(true);
          setSelectedReason(customReason);
        } else {
          if (response.status == 401) {
            setSelectedReason("");
            setError("You have reached the limit of reasons for this emotion.");
            alert(
              "You have reached the limit of reasons for this emotion. Upgrade to Premium"
            );
          } else {
            console.error("Failed to add custom reason:", response.status);
            setError("Failed to add custom reason");
          }
        }
      }
    } catch (error) {
      console.error("Error adding custom reason:", error);
      setError("Error adding custom reason");
    }
  };

  const handleSaveMood = async () => {
    if (isGuest || !user) return;

    // const auth = getAuth();
    // const user = auth.currentUser;

    if (
      previousMood?.mood === selectedMood.label &&
      previousMood?.reason === selectedReason
    ) {
      setErrorMessage("You cannot save the same mood and reason again.");
      return;
    }

    setPreviousMood({ mood: selectedMood.label, reason: selectedReason });
    setErrorMessage("");

    const moodData = {
      mood: selectedMood.label,
      reason: selectedReason,
    };

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        "https://cuddle-up-backend.onrender.com/api/users/store-mood",

        // "http://localhost:5001/api/users/store-mood",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(moodData),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save mood.");
      }

      setPreviousMood({ mood: selectedMood.label, reason: selectedReason });
      setErrorMessage("");
      setSelectedMood(null);
      setSelectedReason("");
      alert("Mood saved successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const [detectedMood, setDetectedMood] = useState(null);
  const handleMoodDetected = (moodData) => {
    setDetectedMood(moodData);
    handleMoodClick(moodData.dominantEmotion);
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
            {moods.slice(0, 6).map((mood, index) => (
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
                <span className="text-xs md:text-sm px-2 text-center">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Insights Section */}
      {selectedMood && (
        <div
          ref={insightsRef}
          className="transition-all overflow-y-auto h-[60vh] md:h-[50vh] duration-500 ease-in-out max-w-5xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-8 mx-auto"
          style={{ backgroundColor: moodColor.replace(/rgba?\(([^)]+)\)/, "rgba($1, 0.5)") }}
        >
          <div className="border-b border-gray-200/50 pb-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/50 h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center shadow-md">
                <span className="text-4xl md:text-5xl">
                  {selectedMood.emoji}
                </span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Mood Analysis: {selectedMood.label}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
                <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Personalized Insight
                </h3>
                <p className="text-gray-400">
                {/* text-gray-700 */}
                  {/* {moodInsights[selectedMood.label]?.text} */}
                  Available for premium only
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
                <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Nutrition Recommendation
                </h3>
                <p className="text-gray-400">
                  {/* {moodInsights[selectedMood.label]?.food} */}
                  Available for premium only
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
                <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Mood Causation
                </h3>
                <label
                  htmlFor="moodReason"
                  className="block text-sm text-gray-600 mb-2"
                >
                  What factors contributed to this mood?
                </label>
                <select
                  id="moodReason"
                  value={selectedReason}
                  onChange={(e) => {
                    setSelectedReason(e.target.value);
                    // if (e.target.value !== "Other") {
                    //   setCustomReason("");
                    // }
                  }}
                  className="block w-full px-3 py-2 bg-transparent border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <option value="">Select a reason</option>
                  {filteredReasons.map((reason, index) => (
                    <option key={index} value={reason.reason}>
                      {reason.reason}
                    </option>
                  ))}
                </select>
              </div>

              {selectedReason === "Other" && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 shadow-md">
                  <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Custom Reason
                  </h3>
                  <label
                    htmlFor="customReason"
                    className="block text-sm text-gray-600 mb-2"
                  >
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
                  <button
                    className="mt-3 w-full py-2 px-4 bg-pink-400 text-white rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition duration-200"
                    onClick={handleCustomReason}
                  >
                    Add Reason
                  </button>
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-red-600 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errorMessage}
              </p>
            </div>
          )}

          {!isGuest && user && (
            <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-end">
              <button
                className="py-2 px-6 bg-white/90 backdrop-blur-lg rounded-md shadow-md text-gray-800 font-medium hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center"
                onClick={handleSaveMood}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Save Mood
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reusable Modal */}
      <MoodInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inputType={inputType}
        isGuest={isGuest}
        onMoodDetected={handleMoodDetected}
      />
    </div>
  );
};

export default MoodCapture;