

import React, { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";

const MoodInputModal = ({
  isOpen,
  onClose,
  inputType,
  onMoodDetected,
  isGuest,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const [guestError, setGuestError] = useState(null);
  const [error, setError] = useState("");


  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [showSelectionButtons, setShowSelectionButtons] = useState(true);
const [showCamera, setShowCamera] = useState(false);


 // Add this logging to check the video ref at different points
useEffect(() => {
  // Log the initial state of videoRef when component mounts
  console.log("Initial videoRef state:", videoRef.current ? "Exists" : "Doesn't exist");
  
  if (showCamera) {
    console.log("Camera view active - starting camera");
    // Debug log before starting camera
    console.log("Before startCamera - videoRef:", videoRef.current ? "Exists" : "Doesn't exist");
    startCamera();
    // Debug log after starting camera
    setTimeout(() => {
      console.log("After startCamera - videoRef:", videoRef.current ? "Exists" : "Doesn't exist");
      console.log("Video srcObject:", videoRef.current?.srcObject ? "Exists" : "Doesn't exist");
    }, 500);
  } else {
    console.log("Camera view inactive - calling stopCamera function");
    // Debug log before stopping camera
    console.log("Before stopCamera - videoRef:", videoRef.current ? "Exists" : "Doesn't exist");
    console.log("Video srcObject:", videoRef.current?.srcObject ? "Exists" : "Doesn't exist");
    stopCamera();
  }
}, [showCamera]);

// Modify startCamera to retain a reference to the stream
const startCamera = async () => {
  try {
    console.log("Requesting camera access...");
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 } 
      } 
    });
    
    console.log("Camera access granted, setting up video");
    // Store the stream globally for easier access when stopping
    window.cameraStream = stream;
    
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        console.log("Video metadata loaded, playing video");
        videoRef.current.play()
          .then(() => console.log("Video playback started"))
          .catch(err => console.error("Error playing video:", err));
      };
    } else {
      console.error("Video reference is not available");
    }
  } catch (error) {
    console.error("Error accessing the camera:", error);
    alert("Camera access failed. Please make sure you've granted camera permissions and are using HTTPS.");
  }
};

// Modified stopCamera to use the global stream reference
const stopCamera = () => {
  console.log("Stopping camera - detailed process");
  
  try {
    // Try to stop via the global stream first
    if (window.cameraStream) {
      console.log("Global camera stream exists, stopping tracks");
      const tracks = window.cameraStream.getTracks();
      console.log(`Found ${tracks.length} tracks in global stream`);
      
      tracks.forEach((track, index) => {
        console.log(`Stopping track ${index} (${track.kind}) from global stream`);
        track.stop();
        console.log(`Track ${index} from global stream stopped`);
      });
      
      window.cameraStream = null;
      console.log("Global stream reference cleared");
    }
    
    // Also try the standard videoRef approach as backup
    if (videoRef.current) {
      console.log("Video reference exists");
      
      if (videoRef.current.srcObject) {
        console.log("Video source exists, getting tracks");
        
        const tracks = videoRef.current.srcObject.getTracks();
        console.log(`Found ${tracks.length} tracks in video source`);
        
        tracks.forEach((track, index) => {
          console.log(`Stopping track ${index} (${track.kind}) from video source`);
          track.stop();
          console.log(`Track ${index} from video source stopped`);
        });
        
        videoRef.current.srcObject = null;
        console.log("Video source cleared");
      } else {
        console.log("No video source to stop");
      }
      
      videoRef.current.pause();
      console.log("Video paused");
    } else {
      console.log("No video reference to stop");
    }
  } catch (error) {
    console.error("Error stopping camera:", error);
  }
  
  console.log("Camera stop process completed");
};
  
  

  // const takeSelfie = () => {
  //   const canvas = canvasRef.current;
  //   const video = videoRef.current;
  //   if (canvas && video) {
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     setCapturedImage(canvas.toDataURL("image/png"));
  //   }
  // };
  // const takeSelfie = () => {
  //   const canvas = canvasRef.current;
  //   const video = videoRef.current;
  //   if (canvas && video) {
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
  //     // Get the data URL directly from the canvas
  //     const dataUrl = canvas.toDataURL("image/png");
      
  //     // Use the data URL for both selected image and preview
  //     setSelectedImage(dataUrl);
  //     setImagePreview(dataUrl);
      
  //     // Stop the camera after taking a selfie
  //     stopCamera();
      
  //     // Hide the camera view
  //     setShowCamera(false);
  //   }
  // };
  // Helper function to convert a data URL to a Blob
const dataURLtoBlob = (dataURL) => {
  // Convert base64/URLEncoded data component to raw binary data
  let byteString;
  if (dataURL.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURL.split(',')[1]);
  } else {
    byteString = decodeURIComponent(dataURL.split(',')[1]);
  }

  // Separate out the mime component
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

  // Write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Create a blob with the ArrayBuffer and mime type
  return new Blob([ab], { type: mimeString });
};

// Modified takeSelfie function to create a Blob and set proper file-like object
const takeSelfie = () => {
  const canvas = canvasRef.current;
  const video = videoRef.current;
  if (canvas && video) {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get the data URL from the canvas
    const dataUrl = canvas.toDataURL("image/png");
    
    // Convert data URL to Blob
    const blob = dataURLtoBlob(dataUrl);
    
    // Create a File-like object for compatibility with your upload function
    const selfieFile = new File([blob], "selfie.png", { type: "image/png" });
    
    // Set the File object as selectedImage for processing
    setSelectedImage(selfieFile);
    
    // Use the data URL for preview
    setImagePreview(dataUrl);
    
    // Stop the camera after taking a selfie
    stopCamera();
    
    // Hide the camera view
    setShowCamera(false);
  }
};

  useEffect(() => {
    if (!audioURL) {
      setAudioBlob(null);  // Ensure audio is fully cleared
    }
  }, [audioURL]);
  useEffect(() => {
    if (!selectedImage) {
      setSelectedImage(null);
      setImagePreview(null)  // Ensure audio is fully cleared
    }
  }, [selectedImage]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Animation effect for recording
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAnimationFrame((prev) => (prev + 1) % 3);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  if (!isOpen) return null;

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
        setAudioBlob(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunks.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop Recording
  // const stopRecording = () => {
  //   mediaRecorderRef.current.stop();
  //   setIsRecording(false);
  // };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all tracks to turn off the mic
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  // Reset Recording
  const resetRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setIsRecording(false);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Define modal content dynamically
  const getModalContent = () => {
    switch (inputType) {
      // case "photo":
      //   return (
      //     <div className="w-full flex flex-col items-center gap-4">
      //       {imagePreview ? (
      //         <div className="w-full flex flex-col items-center gap-3">
      //           <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg border-2 border-blue-400">
      //             <img
      //               src={imagePreview}
      //               alt="Preview"
      //               className="w-full h-full object-cover"
      //             />
      //             <button
      //             disabled={isProcessing}
      //               onClick={() => {
      //                 setSelectedImage(null);
      //                 setImagePreview(null);
      //               }}
      //               className={`absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition ${isProcessing && 'cursor-not-allowed'}`}
      //             >
      //               <svg
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 className="h-5 w-5"
      //                 viewBox="0 0 20 20"
      //                 fill="currentColor"
      //               >
      //                 <path
      //                   fillRule="evenodd"
      //                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      //                   clipRule="evenodd"
      //                 />
      //               </svg>
      //             </button>
      //           </div>
      //           <p className="text-sm text-gray-600">{selectedImage?.name}</p>
      //         </div>
      //       ) : (
      //         <>
      //           <input
      //             type="file"
      //             accept="image/*"
      //             className="hidden"
      //             id="photoInput"
      //             onChange={handleImageChange}
      //           />
      //           <label
      //             htmlFor="photoInput"
      //             className="flex flex-col items-center justify-center gap-3 w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-2xl cursor-pointer shadow-md transition-all border-2 border-dashed border-blue-300"
      //           >
      //             <div className="bg-blue-500 p-3 rounded-full shadow-md">
      //               <svg
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 className="h-8 w-8 text-white"
      //                 fill="none"
      //                 viewBox="0 0 24 24"
      //                 stroke="currentColor"
      //               >
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth={2}
      //                   d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      //                 />
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth={2}
      //                   d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      //                 />
      //               </svg>
      //             </div>
      //             <div className="text-center">
      //               <span className="text-base font-medium text-blue-700">
      //                 Choose a Photo
      //               </span>
      //               <p className="text-xs text-blue-600 mt-1">
      //                 Click to browse your files
      //               </p>
      //             </div>
      //           </label>
      //              <div style={{ textAlign: "center", padding: "20px" }}>
      //      <h2>Live Camera</h2>
      //      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "500px" }} />
      //      <br />
      //      <button onClick={takeSelfie} style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}>
      //        📸 Take Selfie
      //      </button>
      //      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          
      //     {capturedImage && (
      //       <div>
      //         <h3>Your Selfie</h3>
      //         <img src={capturedImage} alt="Captured Selfie" style={{ width: "100%", maxWidth: "500px" }} />
      //       </div>
      //     )}
      //   </div>
      //           <div className="mt-2 text-sm text-gray-500">
      //             Supports: JPG, PNG, JPEG
      //           </div>
      //         </>
      //       )}
      //     </div>
      
      //   );
      case "photo":
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {imagePreview ? (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg border-2 border-blue-400">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              disabled={isProcessing}
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
                setShowSelectionButtons(true);
                setShowCamera(false);
              }}
              className={`absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition ${isProcessing && 'cursor-not-allowed'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600">{selectedImage?.name}</p>
          <button
            onClick={() => {
              setSelectedImage(null);
              setImagePreview(null);
              setShowSelectionButtons(true);
              setShowCamera(false);
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : showSelectionButtons ? (
        <div className="flex flex-col gap-4 w-full items-center">
          <button
            onClick={() => {
              setShowSelectionButtons(false);
              setShowCamera(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 w-64 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
            </svg>
            Choose from Device
          </button>
          <button
            onClick={() => {
              setShowSelectionButtons(false);
              setShowCamera(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 w-64 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Take Selfie
          </button>
        </div>
      ) : showCamera ? (
        <div className="w-full flex flex-col items-center gap-3">
          <h2 className="text-lg font-medium text-gray-700">Live Camera</h2>
          <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg border-2 border-green-400">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-64 bg-black" 
            />
          </div>
          <button 
            onClick={takeSelfie} 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
          >
            <span>📸</span> Take Selfie
          </button>
          <button
            // onClick={() => {
            //   setShowSelectionButtons(true);
            //   setShowCamera(false);
            // }}
            onClick={() => {
              // Stop camera when going back
              // if (videoRef.current && videoRef.current.srcObject) {
              //   const tracks = videoRef.current.srcObject.getTracks();
              //   tracks.forEach(track => track.stop());
              //   videoRef.current.srcObject = null;
              //   console.log("Camera stopped from back button");
              // }
              setShowSelectionButtons(true);
              setShowCamera(false);
            }}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photoInput"
            onChange={handleImageChange}
          />
          <label
            htmlFor="photoInput"
            className="flex flex-col items-center justify-center gap-3 w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-2xl cursor-pointer shadow-md transition-all border-2 border-dashed border-blue-300"
          >
            <div className="bg-blue-500 p-3 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-base font-medium text-blue-700">
                Choose a Photo
              </span>
              <p className="text-xs text-blue-600 mt-1">
                Click to browse your files
              </p>
            </div>
          </label>
          <div className="mt-2 text-sm text-gray-500">
            Supports: JPG, PNG, JPEG
          </div>
          <button
            onClick={() => {
              setShowSelectionButtons(true);
            }}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>
        </>
      )}
    </div>
  );

      case "audio":
        return (
          <div className="flex flex-col items-center gap-4 w-full">
            {audioURL ? (
              <div className="w-full space-y-4">
                <div className="w-full p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-md">
                  <audio controls src={audioURL} className="w-full"></audio>
                </div>
                <div className="flex items-center justify-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <button
                  onClick={resetRecording}
                  disabled={isProcessing}
                  className={` ${isProcessing && 'cursor-not-allowed'} px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md w-full flex items-center justify-center gap-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Record Again
                </button>
              </div>
            ) : isRecording ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-4 relative shadow-lg">
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-white opacity-${
                      animationFrame === 0
                        ? "30"
                        : animationFrame === 1
                        ? "60"
                        : "90"
                    } animate-ping`}
                  ></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div className="text-xl font-bold text-red-600 mb-4">
                  {formatTime(recordingTime)}
                </div>
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Stop Recording
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div
                  onClick={startRecording}
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mb-4 cursor-pointer hover:from-blue-500 hover:to-blue-700 transition shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <button
                  onClick={startRecording}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Start Recording
                </button>
              </div>
            )}
          </div>
        );

      case "text":
        return (
          <div className="w-full">
            <div className="relative">
              <textarea
                className="w-full p-4 rounded-2xl bg-white border-2 border-blue-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 min-h-[150px] transition"
                placeholder="Type your thoughts..."
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <div className="absolute right-3 bottom-3 text-gray-400 text-sm">
                {textInput.length} characters
              </div>
            </div>
            {/* {textInput && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      Your entry:
                    </div>
                    <div className="text-gray-700">
                      {textInput.length > 120
                        ? `${textInput.substring(0, 120)}...`
                        : textInput}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        );

      default:
        return null;
    }
  };

  
  // Submit the audio data and analyze emotion
  const handleSubmit = async () => {
    if (
      (inputType === "audio" && !audioBlob) ||
      (inputType === "photo" && !selectedImage) ||
      (inputType === "text" && !textInput.trim())
    ) {
      return;
    }
    setError("");
    setIsProcessing(true);

    try {
      let moodData;

      if (inputType === "audio") {
        moodData = await processAudioMood(audioBlob);
      } else if (inputType === "photo") {
        // Implement photo mood detection if needed
        if (selectedImage) {
          moodData = await processPhotoMood(selectedImage);
        }
      } else if (inputType === "text") {
        if (textInput.trim()) {
          moodData = await processTextMood(textInput);
        }
      }

      if (moodData) {
        if (isGuest) {
          moodData.isGuest = true;
          moodData.savable = false;
        }
        onMoodDetected(moodData);
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error(`Error processing ${inputType} mood:`, error);
      if (isGuest) {
        setGuestError("Unable to process your request. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Process audio mood
  const processAudioMood = async (blob) => {
  
    try{
    const formData = new FormData();
    formData.append("audio", blob, "audio.wav");

    let headers = {};
    let endpoint = 
    // "http://localhost:5001/api/multimodal/analyze-audio";

    "https://cuddle-up-backend.onrender.com/api/multimodal/analyze-audio";
    if (!isGuest) {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = await user.getIdToken(true);
      headers.Authorization = `Bearer ${token}`;
    } else {
      // Use guest endpoint if available
      endpoint = 
      // "http://localhost:5001/api/guest/multimodal/analyze-audio";

      "https://cuddle-up-backend.onrender.com/api/guest/multimodal/analyze-audio";
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });

    
    const result = await response.json();


    if (!response.ok || !result.dominantEmotion) {
      console.log(audioURL)
      setAudioURL('')
      throw new Error("Failed to analyze audio");
    }

  
    setAudioURL('')
    return {
      type: "audio",
      dominantEmotion: result.dominantEmotion,
      confidence: result.confidence,
      timestamp: new Date().toISOString(),
      mediaBlob: blob,
      mediaUrl: URL.createObjectURL(blob),
    };
  }
  catch(error){
    console.error("Error analyzing text:", error);
      setError("Please try again");
      return null;
  }
  };

  const processPhotoMood = async (file) => {
    try{
    const formData = new FormData();
    formData.append("file", file, file.name); // Append the image file

    const title = "User Image Mood Test"; // Replace with the title you want
    const description = "Facial expression analysis"; // Replace with the description you want

    // Append title, description, and callback URL to form data
    formData.append("title", title);
    formData.append("description", description);

    let headers = {};
    let endpoint = 
    // "http://localhost:5001/api/multimodal/analyze-image";
    "https://cuddle-up-backend.onrender.com/api/multimodal/analyze-image";
    if (!isGuest) {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = await user.getIdToken(true);
      headers.Authorization = `Bearer ${token}`;
    } else {
      // Use guest endpoint if available
      endpoint = 
      // "http://localhost:5001/api/guest/multimodal/analyze-image";

      "https://cuddle-up-backend.onrender.com/api/guest/multimodal/analyze-image";
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });

    const result = await response.json();


    if (!response.ok || !result.dominantEmotion) {
      setSelectedImage('')
      throw new Error("Failed to analyze image");
    }

    setSelectedImage('')

    // Return an object with the analyzed mood data
    return {
      type: "photo",
      dominantEmotion: result.dominantEmotion, // Assuming result contains dominantEmotion
      confidence: result.confidence, // Assuming result contains confidence
      timestamp: new Date().toISOString(),
      mediaBlob: file,
      mediaUrl: URL.createObjectURL(file),
    };
  }
  catch (error) {
    console.error("Error analyzing photo:", error);
    setError("Kindly upload a image with a visible face");
    return null;
  }
  };

  const processTextMood = async (text) => {
    try {
      // Validate the text input
      if (!text || typeof text !== "string" || text.trim() === "") {
        throw new Error("Text must be a non-empty string.");
      }

      let headers = {
        "Content-Type": "application/json",
      };
      let endpoint = 
      // "http://localhost:5001/api/multimodal/analyze-text";

      "https://cuddle-up-backend.onrender.com/api/multimodal/analyze-text";

      // If not guest, add authentication
      if (!isGuest) {
        const auth = getAuth();
        const user = auth.currentUser;
        const token = await user.getIdToken(true);
        headers.Authorization = `Bearer ${token}`;
      } else {
        // Use guest endpoint if available
        endpoint = 
        // "http://localhost:5001/api/guest/multimodal/analyze-text";

        "https://cuddle-up-backend.onrender.com/api/guest/multimodal/analyze-text";
      }

      const response = await axios.post(endpoint, { text }, { headers });

      const result = response.data;
      setTextInput("");
      return {
        type: "text",
        dominantEmotion: result.dominantEmotion || "Unknown", // Default to "Unknown" if not present
        confidence: result.confidence || 0, // Default confidence to 0 if not present
        timestamp: new Date().toISOString(),
        textContent: text,
      };
    } catch (error) {
      console.error("Error analyzing text:", error);
      setError("Please try again");
      return null;
    }
  };

  // Loading indicator SVG
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-96 max-w-md text-center transform transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {inputType === "photo"
              ? "Capture Your Expression"
              : inputType === "audio"
              ? "Record Your Voice"
              : "Share Your Thoughts"}
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className={`text-gray-400 ${isProcessing && 'cursor-not-allowed'} hover:text-gray-600 transition`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">{getModalContent()}</div>

        {isGuest && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold">Guest Mode:</p>
                <p>Your mood will be analyzed but not saved.</p>
                <div className="mt-1 flex justify-center gap-2">
                  <a href="/login" className="text-blue-600 hover:underline">
                    Login
                  </a>
                  or
                  <a href="/signUp" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                  <span>to save your moods.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {guestError && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-200">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{guestError}</span>
            </div>
          </div>
        )}

        {error && <p>{error}</p>}
        <div className="mt-6 flex justify-between">
          <button
          disabled={isProcessing}
            onClick={() => {onClose();setError('')}}
            className={`px-4 py-2 bg-gray-200 ${isProcessing && 'cursor-not-allowed' } text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg transition shadow-md flex items-center justify-center gap-2 ${
              (inputType === "audio" && !audioBlob) ||
              (inputType === "photo" && !selectedImage) ||
              (inputType === "text" && !textInput.trim()) ||
              isProcessing
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            disabled={
              (inputType === "audio" && !audioBlob && !audioURL) ||
              (inputType === "photo" && !selectedImage) ||
              (inputType === "text" && !textInput.trim()) ||
              isProcessing
            }
          >
            {isProcessing ? (
              <>
                <LoadingSpinner />
                <span>Processing...</span>
              </>
            ) : (
              "Analyze Mood"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodInputModal;








