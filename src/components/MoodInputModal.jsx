// import React, { useState, useRef } from "react";

// const MoodInputModal = ({ isOpen, onClose, inputType }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioURL, setAudioURL] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunks = useRef([]);

//   if (!isOpen) return null;

//   // Start Recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunks.current.push(event.data);
//       };
//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
//         setAudioBlob(audioBlob); // ✅ Store the Blob for future use
//         setAudioURL(URL.createObjectURL(audioBlob)); // ✅ Create URL for playback
//         audioChunks.current = [];
//       };
//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   // Stop Recording
//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   // Reset Recording
//   const resetRecording = () => {
//     setAudioBlob(null);
//     setAudioURL(null);
//     setIsRecording(false);
//   };

//   // Define modal content dynamically
//   const getModalContent = () => {
//     switch (inputType) {
//       case "photo":
//         return (
//         //   <>
//         //     <p className="text-gray-600">Upload a photo that represents your mood.</p>
//         //     <input type="file" accept="image/*" className="mt-4 w-full border p-2 rounded-lg" />
//         //   </>
//         <div className="w-full flex flex-col items-center">
//                         <input
//                           type="file"
//                           accept="image/*"
//                         //   onChange={(e) => setInputData(e.target.files[0])}
//                           className="hidden"
//                           id="photoInput"
//                         />
//                         <label
//                           htmlFor="photoInput"
//                           className="flex flex-col items-center justify-center gap-2 w-full h-32 bg-blue-200 hover:bg-blue-300 rounded-2xl cursor-pointer shadow-md transition-all"
//                         >
//                           <img src="/images/camera.png" className="h-16 w-16" />
//                           <span className="text-sm">Choose a Photo</span>
//                         </label>
//                       </div>
//         );

//       case "audio":
//         return (
//           <div className="flex flex-col items-center gap-4">
//             {audioURL ? (
//               <>
//                 <audio controls src={audioURL} className="w-full"></audio>
//                 <button onClick={resetRecording} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                   Re-record
//                 </button>
//               </>
//             ) : isRecording ? (
//               <button onClick={stopRecording} className="px-4 py-2 bg-red-500 text-white rounded-lg">
//                 Stop Recording
//               </button>
//             ) : (
//               <button onClick={startRecording} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//                 Start Recording
//               </button>
//             )}
//           </div>
//         );

//       case "text":
//         return (
//         //   <>
//         //     <p className="text-gray-600">Write how you're feeling.</p>
//         //     <textarea className="mt-4 w-full border p-2 rounded-lg" rows="4" placeholder="Type your thoughts..." />
//         //   </>
//         <div className="w-full">
//                          <textarea
//                         //   onChange={(e) => setInputData(e.target.value)}
//                           className="w-full p-4 rounded-2xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           placeholder="Type your thoughts..."
//                           rows={4}
//                         />
//                       </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
//       <div className="bg-white p-6 rounded-3xl shadow-lg w-96 text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Capture Your Mood</h2>
//         {getModalContent()}
//         <div className="mt-6 flex justify-between">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
//             Cancel
//           </button>
//           <button onClick={() => console.log(audioBlob)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodInputModal;













// import React, { useState } from "react";

// const MoodInputModal = ({ isOpen, onClose, inputType }) => {
//   const [inputData, setInputData] = useState(null);

//   const handleClose = () => {
//     onClose();
//     setInputData(null); // Reset input data when modal closes
//   };

//   const handleSubmit = () => {
//     // Handle the submission of input data (for example, saving it or processing it)
//     console.log(inputData);
//     handleClose();
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="bg-black/50 absolute inset-0" onClick={handleClose}></div>

//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-md p-8 relative z-10">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Share Your Mood</h2>
//             <p className="text-lg text-gray-600 font-light">
//               {inputType === "photo" && "Upload a picture that represents how you feel."}
//               {inputType === "audio" && "Record your voice and share your mood."}
//               {inputType === "text" && "Type a message to express your emotions."}
//             </p>
//           </div>

//           <div className="flex flex-col items-center gap-4">
//             {inputType === "photo" && (
//               <div className="w-full flex flex-col items-center">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setInputData(e.target.files[0])}
//                   className="hidden"
//                   id="photoInput"
//                 />
//                 <label
//                   htmlFor="photoInput"
//                   className="flex flex-col items-center justify-center gap-2 w-full h-32 bg-blue-200 hover:bg-blue-300 rounded-2xl cursor-pointer shadow-md transition-all"
//                 >
//                   <img src="/images/camera.png" className="h-16 w-16" />
//                   <span className="text-sm">Choose a Photo</span>
//                 </label>
//               </div>
//             )}

//             {inputType === "audio" && (
//               <div className="w-full flex flex-col items-center">
//                 <button
//                   onClick={() => setInputData("Audio recording...")}
//                   className="flex flex-col items-center justify-center gap-2 w-full h-32 bg-purple-200 hover:bg-purple-300 rounded-2xl cursor-pointer shadow-md transition-all"
//                 >
//                   <img src="/images/microphone.png" className="h-16 w-16" />
//                   <span className="text-sm">Record Audio</span>
//                 </button>
//                 {inputData && <p className="mt-2 text-sm text-gray-700">{inputData}</p>}
//               </div>
//             )}

//             {inputType === "text" && (
//               <div className="w-full">
//                 <textarea
//                   onChange={(e) => setInputData(e.target.value)}
//                   className="w-full p-4 rounded-2xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Type your thoughts..."
//                   rows={4}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mt-8 flex justify-center gap-4">
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all"
//             >
//               Submit
//             </button>
//             <button
//               onClick={handleClose}
//               className="px-6 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   ); LUqQDGJYJ-WbhMBhp0sGmvnt8qpkRajh_u5N52bQhHLeB7CqaLG-1x7seRGV1c7RplE
// };

// export default MoodInputModal;









// Using this
import React, { useState, useRef } from "react";

const MoodInputModal = ({ isOpen, onClose, inputType }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  if (!isOpen) return null;

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(audioBlob); // ✅ Store the Blob for future use
        setAudioURL(URL.createObjectURL(audioBlob)); // ✅ Create URL for playback
        audioChunks.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Reset Recording
  const resetRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setIsRecording(false);
  };

  // Define modal content dynamically
  const getModalContent = () => {
    switch (inputType) {
      case "photo":
        return (
          <div className="w-full flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photoInput"
            />
            <label
              htmlFor="photoInput"
              className="flex flex-col items-center justify-center gap-2 w-full h-32 bg-blue-200 hover:bg-blue-300 rounded-2xl cursor-pointer shadow-md transition-all"
            >
              <img src="/images/camera.png" className="h-16 w-16" />
              <span className="text-sm">Choose a Photo</span>
            </label>
          </div>
        );

      case "audio":
        return (
          <div className="flex flex-col items-center gap-4">
            {audioURL ? (
              <>
                <audio controls src={audioURL} className="w-full"></audio>
                <button onClick={resetRecording} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Re-record
                </button>
              </>
            ) : isRecording ? (
              <button onClick={stopRecording} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Stop Recording
              </button>
            ) : (
              <button onClick={startRecording} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Start Recording
              </button>
            )}
          </div>
        );

      case "text":
        return (
          <div className="w-full">
            <textarea
              className="w-full p-4 rounded-2xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your thoughts..."
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Submit the audio data and analyze emotion
  const handleSubmit = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("title", "User Mood Test");
    formData.append("description", "Audio recording for mood analysis");
    formData.append("file", audioBlob, "audio.wav");
    formData.append("callback_url", "http://localhost:3001/audio-callback"); // Optional callback URL

    try {
      const response = await fetch("https://api.imentiv.ai/v1/audios", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "X-API-Key": "LUqQDGJYJ-WbhMBhp0sGmvnt8qpkRajh_u5N52bQhHLeB7CqaLG-1x7seRGV1c7RplE", // API Key
        },
        body: formData,
      });
      const result = await response.json();
      console.log("Emotion Analysis Result:", result);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Capture Your Mood</h2>
        {getModalContent()}
        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodInputModal;

















