
// // import React, { useState, useEffect } from 'react';
// // import { Clock, Settings, Play, Pause, RotateCcw, Check } from 'lucide-react';

// // const PomodoroTimer = () => {
// //   const [mode, setMode] = useState('pomodoro');
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState(25 * 60);
// //   const [cycles, setCycles] = useState(0);
// //   const [showSettings, setShowSettings] = useState(false);
// //   const [settings, setSettings] = useState({
// //     pomodoro: 25,
// //     shortBreak: 5,
// //     longBreak: 15,
// //     longBreakInterval: 4
// //   });

// //   // Initialize timer based on mode
// //   useEffect(() => {
// //     setTimeLeft(settings[mode] * 60);
// //   }, [mode, settings]);

// //   // Timer logic
// //   useEffect(() => {
// //     let interval;
    
// //     if (isRunning && timeLeft > 0) {
// //       interval = setInterval(() => {
// //         setTimeLeft(prevTime => prevTime - 1);
// //       }, 1000);
// //     } else if (isRunning && timeLeft === 0) {
// //       // Handle timer completion
// //       const nextMode = getNextMode();
// //       setMode(nextMode);
      
// //       // Update cycles if completing a pomodoro
// //       if (mode === 'pomodoro') {
// //         setCycles(prev => prev + 1);
// //       }
      
// //       // Play notification sound
// //       const audio = new Audio('/notification.mp3');
// //       audio.play().catch(e => console.log('Audio play failed:', e));
// //     }
    
// //     return () => clearInterval(interval);
// //   }, [isRunning, timeLeft, mode, settings]);

// //   const getNextMode = () => {
// //     if (mode === 'pomodoro') {
// //       // After pomodoro, check if we need a long break
// //       return (cycles + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
// //     } else {
// //       // After any break, go back to pomodoro
// //       return 'pomodoro';
// //     }
// //   };

// //   const switchMode = (newMode) => {
// //     setMode(newMode);
// //     setTimeLeft(settings[newMode] * 60);
// //     setIsRunning(false);
// //   };

// //   const resetTimer = () => {
// //     setTimeLeft(settings[mode] * 60);
// //     setIsRunning(false);
// //   };

// //   const updateSetting = (key, value) => {
// //     const numValue = parseInt(value, 10);
// //     if (!isNaN(numValue) && numValue > 0) {
// //       setSettings(prev => ({ ...prev, [key]: numValue }));
// //     }
// //   };

// //   const saveSettings = () => {
// //     // In a real app, you might store settings in localStorage here
// //     setTimeLeft(settings[mode] * 60);
// //     setShowSettings(false);
// //   };

// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   const getProgressPercentage = () => {
// //     const totalTime = settings[mode] * 60;
// //     return ((totalTime - timeLeft) / totalTime) * 100;
// //   };

// //   const getModeColor = () => {
// //     switch (mode) {
// //       case 'pomodoro':
// //         return 'blue-500 purple-500';
// //       case 'shortBreak':
// //         return 'green-400 teal-500';
// //       case 'longBreak':
// //         return 'indigo-400 purple-600';
// //       default:
// //         return 'blue-500 purple-500';
// //     }
// //   };

// //   return (
// //     <div className="mt-20 h-full flex items-center justify-center p-4 bg-gradient-to-br from
// // -slate-100 to-slate-200">
// //      <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           <div className="absolute top-1/4 left-1/4 w-full h-full bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //           <div className="absolute bottom-1/4 right-1/4 w-full h-full bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //           <div className="absolute top-1/3 right-1/3 w-full h-full bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //         </div>
// //       {/* Main container with responsive width */}
// //       <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-8 relative overflow-hidden">
// //         {/* Decorative background blobs */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //           <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //           <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
// //         </div>
        
// //         {/* Settings button - positioned absolute for cleaner layout */}
// //         <div className="absolute top-4 right-4 z-10">
// //           <button 
// //             className="text-gray-400 hover:text-gray-600 transition-colors p-2"
// //             onClick={() => setShowSettings(!showSettings)}
// //             aria-label="Settings"
// //           >
// //             <Settings size={16} />
// //           </button>
// //         </div>
        
// //         {/* Title */}
// //         <div className="text-center mb-4 md:mb-6 z-10">
// //           <h3 className="font-semibold text-gray-800 text-sm md:text-base flex items-center justify-center">
// //             <Clock className="mr-2 text-pink-500" size={16} />
// //             Pomodoro Timer
// //           </h3>
// //         </div>
        
// //         {/* Mode Selector - responsive sizing */}
// //         <div className="bg-gray-100/80 rounded-full p-1 flex z-10 w-full mx-auto max-w-xs mb-4 md:mb-6">
// //           <button 
// //             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'pomodoro' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
// //             onClick={() => switchMode('pomodoro')}
// //           >
// //             Work
// //           </button>
// //           <button 
// //             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'shortBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
// //             onClick={() => switchMode('shortBreak')}
// //           >
// //             Short
// //           </button>
// //           <button 
// //             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'longBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
// //             onClick={() => switchMode('longBreak')}
// //           >
// //             Long
// //           </button>
// //         </div>
        
// //         {/* Timer Display - responsive sizing */}
// //         <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-inner mb-4 md:mb-6">
// //           <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
// //             <circle 
// //               cx="50" 
// //               cy="50" 
// //               r="45" 
// //               fill="none" 
// //               stroke="#f3f4f6" 
// //               strokeWidth="5"
// //             />
// //             <circle 
// //               cx="50" 
// //               cy="50" 
// //               r="45" 
// //               fill="none" 
// //               stroke={`url(#gradient-${mode})`} 
// //               strokeWidth="5"
// //               strokeDasharray="282.7"
// //               strokeDashoffset={282.7 - ((getProgressPercentage() / 100) * 282.7)}
// //               strokeLinecap="round"
// //               transform="rotate(-90 50 50)"
// //             />
// //             <defs>
// //               <linearGradient id={`gradient-pomodoro`} x1="0%" y1="0%" x2="100%" y2="100%">
// //                 <stop offset="0%" stopColor="#3b82f6" />
// //                 <stop offset="100%" stopColor="#8b5cf6" />
// //               </linearGradient>
// //               <linearGradient id={`gradient-shortBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
// //                 <stop offset="0%" stopColor="#34d399" />
// //                 <stop offset="100%" stopColor="#14b8a6" />
// //               </linearGradient>
// //               <linearGradient id={`gradient-longBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
// //                 <stop offset="0%" stopColor="#818cf8" />
// //                 <stop offset="100%" stopColor="#7c3aed" />
// //               </linearGradient>
// //             </defs>
// //           </svg>
// //           <div className="text-center z-10">
// //             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</h2>
// //             <p className="text-xs md:text-sm text-gray-500 mt-1 capitalize">{mode.replace(/([A-Z])/g, ' $1').trim()}</p>
// //           </div>
// //         </div>
        
// //         {/* Controls - responsive sizing */}
// //         <div className="flex justify-center items-center gap-3 sm:gap-4 z-10">
// //           <button 
// //             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center shadow hover:opacity-90 transition-opacity"
// //             onClick={() => setIsRunning(!isRunning)}
// //             aria-label={isRunning ? "Pause" : "Play"}
// //           >
// //             {isRunning ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
// //           </button>
// //           <button 
// //             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
// //             onClick={resetTimer}
// //             aria-label="Reset Timer"
// //           >
// //             <RotateCcw size={14} />
// //           </button>
// //         </div>
        
// //         {/* Stats */}
// //         <div className="mt-4 md:mt-6 text-center z-10">
// //           <p className="text-xs md:text-sm text-gray-500">
// //             <span className="font-medium text-gray-700">{cycles}</span> cycles •
// //             <span className="font-medium text-gray-700"> {Math.floor(cycles * settings.pomodoro / 60)}h {(cycles * settings.pomodoro) % 60}m</span> focus
// //           </p>
// //         </div>
// //       </div>
      
// //       {/* Settings Modal - full screen on mobile, centered dialog on larger screens */}
// //       {showSettings && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 shadow-xl">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="font-semibold text-gray-800">Timer Settings</h3>
// //               <button 
// //                 className="text-gray-400 hover:text-gray-600 text-xl" 
// //                 onClick={() => setShowSettings(false)}
// //                 aria-label="Close Settings"
// //               >
// //                 &times;
// //               </button>
// //             </div>
            
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm text-gray-600 mb-1" htmlFor="pomodoro-time">Pomodoro (minutes)</label>
// //                 <input 
// //                   id="pomodoro-time"
// //                   type="number" 
// //                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
// //                   value={settings.pomodoro}
// //                   onChange={(e) => updateSetting('pomodoro', e.target.value)}
// //                   min="1"
// //                   max="60"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm text-gray-600 mb-1" htmlFor="short-break-time">Short Break (minutes)</label>
// //                 <input 
// //                   id="short-break-time"
// //                   type="number" 
// //                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
// //                   value={settings.shortBreak}
// //                   onChange={(e) => updateSetting('shortBreak', e.target.value)}
// //                   min="1"
// //                   max="30"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-time">Long Break (minutes)</label>
// //                 <input 
// //                   id="long-break-time"
// //                   type="number" 
// //                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
// //                   value={settings.longBreak}
// //                   onChange={(e) => updateSetting('longBreak', e.target.value)}
// //                   min="1"
// //                   max="60"
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-interval">Long Break Interval (cycles)</label>
// //                 <input 
// //                   id="long-break-interval"
// //                   type="number" 
// //                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
// //                   value={settings.longBreakInterval}
// //                   onChange={(e) => updateSetting('longBreakInterval', e.target.value)}
// //                   min="1"
// //                   max="10"
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="mt-6 flex justify-end">
// //               <button 
// //                 className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg flex items-center"
// //                 onClick={saveSettings}
// //               >
// //                 <Check className="mr-2" size={16} />
// //                 Save Settings
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PomodoroTimer;

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Settings, Play, Pause, RotateCcw, Check, Volume2, VolumeX, Bell } from 'lucide-react';



const PomodoroTimer = () => {
  const [mode, setMode] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSound, setCurrentSound] = useState('bell');
  
  // Sound references
  const tickingRef = useRef(null);
  const alarmRef = useRef(null);
  const buttonClickRef = useRef(null);
  
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    tickingSound: true
  });

  // Available sounds for completion
  const alarmSounds = {
    bell: '/sounds/bell.mp3',
    chime: '/sounds/chime.mp3',
    digital: '/sounds/digital-alarm.mp3',
    zen: '/sounds/zen-bowl.mp3',
    forest: '/sounds/forest-birds.mp3'
  };

  // Initialize timer based on mode
  useEffect(() => {
    setTimeLeft(settings[mode] * 60);
  }, [mode, settings]);

  // Sound initialization
  useEffect(() => {
    // Preload sounds
    tickingRef.current = new Audio('/sounds/ticking-clock.mp3');
    tickingRef.current.loop = true;
    tickingRef.current.volume = 0.2;
    
    alarmRef.current = new Audio(alarmSounds[currentSound]);
    alarmRef.current.volume = 0.7;
    
    buttonClickRef.current = new Audio('/sounds/button-click.mp3');
    buttonClickRef.current.volume = 0.3;
    
    return () => {
      // Cleanup
      if (tickingRef.current) {
        tickingRef.current.pause();
        tickingRef.current = null;
      }
      
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current = null;
      }
      
      if (buttonClickRef.current) {
        buttonClickRef.current.pause();
        buttonClickRef.current = null;
      }
    };
  }, [currentSound]);

  // Timer logic
  useEffect(() => {
    let interval;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      
      // Play ticking sound when timer is running
      if (soundEnabled && settings.tickingSound && tickingRef.current) {
        tickingRef.current.play().catch(e => console.log('Ticking sound play failed:', e));
      }
    } else if (!isRunning && tickingRef.current) {
      // Pause ticking sound when timer is paused
      tickingRef.current.pause();
    } else if (isRunning && timeLeft === 0) {
      // Handle timer completion
      const nextMode = getNextMode();
      setMode(nextMode);
      
      // Update cycles if completing a pomodoro
      if (mode === 'pomodoro') {
        setCycles(prev => prev + 1);
      }
      
      // Play notification sound
      if (soundEnabled && alarmRef.current) {
        // Make sure we have the current sound loaded
        alarmRef.current.src = alarmSounds[currentSound];
        alarmRef.current.play().catch(e => console.log('Alarm sound play failed:', e));
      }
      
      // Stop ticking sound
      if (tickingRef.current) {
        tickingRef.current.pause();
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, settings, soundEnabled, currentSound]);

  const getNextMode = () => {
    if (mode === 'pomodoro') {
      // After pomodoro, check if we need a long break
      return (cycles + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    } else {
      // After any break, go back to pomodoro
      return 'pomodoro';
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(settings[newMode] * 60);
    setIsRunning(false);
    
    // Play button click sound
    playButtonSound();
  };

  const resetTimer = () => {
    setTimeLeft(settings[mode] * 60);
    setIsRunning(false);
    
    // Play button click sound
    playButtonSound();
    
    // Stop ticking sound
    if (tickingRef.current) {
      tickingRef.current.pause();
    }
  };

  const updateSetting = (key, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setSettings(prev => ({ ...prev, [key]: numValue }));
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    playButtonSound();
    
    // Stop ticking if muting
    if (soundEnabled && tickingRef.current) {
      tickingRef.current.pause();
    }
  };

  const changeAlarmSound = (sound) => {
    setCurrentSound(sound);
    
    // Preview the sound
    if (soundEnabled) {
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
        alarmRef.current.src = alarmSounds[sound];
        alarmRef.current.play().catch(e => console.log('Sound preview failed:', e));
      }
    }
  };

  const toggleTickingSound = () => {
    setSettings(prev => ({ ...prev, tickingSound: !prev.tickingSound }));
    
    // Stop ticking if turning off
    if (settings.tickingSound && tickingRef.current) {
      tickingRef.current.pause();
    }
  };

  const playButtonSound = () => {
    if (soundEnabled && buttonClickRef.current) {
      buttonClickRef.current.currentTime = 0;
      buttonClickRef.current.play().catch(e => console.log('Button sound play failed:', e));
    }
  };

  const saveSettings = () => {
    // In a real app, you might store settings in localStorage here
    setTimeLeft(settings[mode] * 60);
    setShowSettings(false);
    playButtonSound();
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    playButtonSound();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = settings[mode] * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'blue-500 purple-500';
      case 'shortBreak':
        return 'green-400 teal-500';
      case 'longBreak':
        return 'indigo-400 purple-600';
      default:
        return 'blue-500 purple-500';
    }
  };

  return (
    <div className="mt-20 h-full flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-full h-full bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-full h-full bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
        <div className="absolute top-1/3 right-1/3 w-full h-full bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
      </div>
      {/* Main container with responsive width */}
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-8 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
          <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
        </div>
        
        {/* Top Controls - Settings and Sound Toggle */}
        <div className="flex justify-between items-center mb-4 z-10">
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base flex items-center justify-center">
            <Clock className="mr-2 text-pink-500" size={16} />
            Pomodoro Timer
          </h3>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
          >
            <Settings size={16} />
          </button>
        </div>

        {soundEnabled && (
          <div className="text-center mb-2">
            <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full inline-flex items-center">
              <Volume2 size={10} className="mr-1" />
              Sound On
            </span>
          </div>
        )}
        
        {/* Mode Selector - responsive sizing */}
        <div className="bg-gray-100/80 rounded-full p-1 flex z-10 w-full mx-auto max-w-xs mb-4 md:mb-6">
          <button 
            className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'pomodoro' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => switchMode('pomodoro')}
          >
            Work
          </button>
          <button 
            className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'shortBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => switchMode('shortBreak')}
          >
            Short
          </button>
          <button 
            className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'longBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => switchMode('longBreak')}
          >
            Long
          </button>
        </div>
        
        {/* Timer Display - responsive sizing */}
        <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-inner mb-4 md:mb-6">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#f3f4f6" 
              strokeWidth="5"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={`url(#gradient-${mode})`} 
              strokeWidth="5"
              strokeDasharray="282.7"
              strokeDashoffset={282.7 - ((getProgressPercentage() / 100) * 282.7)}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id={`gradient-pomodoro`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id={`gradient-shortBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
              <linearGradient id={`gradient-longBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 capitalize">{mode.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        </div>
        
        {/* Controls - responsive sizing */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 z-10">
          <button 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center shadow hover:opacity-90 transition-opacity"
            onClick={handlePlayPause}
            aria-label={isRunning ? "Pause" : "Play"}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
          <button 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
            onClick={resetTimer}
            aria-label="Reset Timer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        
        {/* Stats */}
        <div className="mt-4 md:mt-6 text-center z-10">
          <p className="text-xs md:text-sm text-gray-500">
            <span className="font-medium text-gray-700">{cycles}</span> cycles •
            <span className="font-medium text-gray-700"> {Math.floor(cycles * settings.pomodoro / 60)}h {(cycles * settings.pomodoro) % 60}m</span> focus
          </p>
          {soundEnabled && (
            <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
              <Bell size={12} className="mr-1 text-purple-400" />
              <span>Sound: {currentSound.charAt(0).toUpperCase() + currentSound.slice(1)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Settings Modal - full screen on mobile, centered dialog on larger screens */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Timer Settings</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-xl" 
                onClick={() => setShowSettings(false)}
                aria-label="Close Settings"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="pomodoro-time">Pomodoro (minutes)</label>
                <input 
                  id="pomodoro-time"
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
                  value={settings.pomodoro}
                  onChange={(e) => updateSetting('pomodoro', e.target.value)}
                  min="1"
                  max="60"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="short-break-time">Short Break (minutes)</label>
                <input 
                  id="short-break-time"
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
                  value={settings.shortBreak}
                  onChange={(e) => updateSetting('shortBreak', e.target.value)}
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-time">Long Break (minutes)</label>
                <input 
                  id="long-break-time"
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
                  value={settings.longBreak}
                  onChange={(e) => updateSetting('longBreak', e.target.value)}
                  min="1"
                  max="60"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-interval">Long Break Interval (cycles)</label>
                <input 
                  id="long-break-interval"
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
                  value={settings.longBreakInterval}
                  onChange={(e) => updateSetting('longBreakInterval', e.target.value)}
                  min="1"
                  max="10"
                />
              </div>
              
              {/* Sound Settings */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Sound Settings</h4>
                
                {/* <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-gray-600" htmlFor="ticking-sound">Ticking Sound</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      id="ticking-sound" 
                      type="checkbox" 
                      checked={settings.tickingSound}
                      onChange={toggleTickingSound}
                      className="sr-only"
                    />
                    <div className={`block h-6 rounded-full w-10 ${settings.tickingSound ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.tickingSound ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </div> */}
                
                <p className="text-xs text-gray-500 mb-3">Choose Completion Sound:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(alarmSounds).map(sound => (
                    <button
                      key={sound}
                      className={`py-2 px-3 text-xs rounded-lg transition-colors ${currentSound === sound 
                        ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => changeAlarmSound(sound)}
                    >
                      {sound.charAt(0).toUpperCase() + sound.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg flex items-center"
                onClick={saveSettings}
              >
                <Check className="mr-2" size={16} />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden audio elements for browsers that need them */}
      <audio id="ticking-sound" src="/sounds/ticking-clock.mp3" loop preload="auto"></audio>
      <audio id="alarm-sound" src={alarmSounds[currentSound]} preload="auto"></audio>
      <audio id="button-click" src="/sounds/button-click.mp3" preload="auto"></audio>
    </div>
  );
};

export default PomodoroTimer;






// import React, { useState, useEffect, useRef } from 'react';
// import { Clock, Settings, Play, Pause, RotateCcw, Check, Volume2, VolumeX, Bell } from 'lucide-react';

// // Base64 encoded short audio files (small enough for embedding)
// const SOUND_SOURCES = {
//   bell: "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAGngCFhYWFhYWFhYWFhYWFhYWFhYWFvb29vb29vb29vb29vb29vb29vb3p6enp6enp6enp6enp6enp6enp6f////////////////////////////////8AAAA8TEFNRTMuOTlyAm4AAAAALgkAABSAJAZWTQAAgAAABp5Iqze6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjk5LjNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxBYDwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",
//   click: "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAD+ADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuOTlyAqUAAAAALh0AABQgJAfDTgAARgAAAL8G0G5EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjk5LjNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxBQDwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=",
//   ticking: "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAJrQB9fX19fX19fX19fX19fX19fX19fX2wsLCwsLCwsLCwsLCwsLCwsLCwsLC9vb29vb29vb29vb29vb29vb29vb3///////////////////////////////////////////8AAAA5TEFNRTMuOTlyAqUAAAAALhsAABQgJAeETgAARgAAAONIvbt3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjk5LjNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxBYDwAABpAAAACAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU="
// };

// const PomodoroTimer = () => {
//   const [mode, setMode] = useState('pomodoro');
//   const [isRunning, setIsRunning] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [cycles, setCycles] = useState(0);
//   const [showSettings, setShowSettings] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [currentSound, setCurrentSound] = useState('bell');
  
//   // Sound references (Using inline base64 audio to ensure sounds are available)
//   const tickingRef = useRef(null);
//   const alarmRef = useRef(null);
//   const buttonClickRef = useRef(null);
  
//   const [settings, setSettings] = useState({
//     pomodoro: 25,
//     shortBreak: 5,
//     longBreak: 15,
//     longBreakInterval: 4,
//     tickingSound: true
//   });

//   // Initialize sounds and ensure they're loaded
//   useEffect(() => {
//     // Create audio elements
//     if (!tickingRef.current) {
//       tickingRef.current = new Audio(SOUND_SOURCES.ticking);
//       tickingRef.current.loop = true;
//       tickingRef.current.volume = 0.2;
//     }
    
//     if (!alarmRef.current) {
//       alarmRef.current = new Audio(SOUND_SOURCES.bell);
//       alarmRef.current.volume = 0.7;
//     }
    
//     if (!buttonClickRef.current) {
//       buttonClickRef.current = new Audio(SOUND_SOURCES.click);
//       buttonClickRef.current.volume = 0.3;
//     }
    
//     // Force a user interaction to unlock audio
//     const unlockAudio = () => {
//       // Try to play a silent sound to unlock audio
//       const silentSound = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v///////////////////////////////////////////wAAADRMYXZjNTguMTM0AAAAAAAAAAAAAADqEgZqAAAAAAAAASAAAMBOJqm5AAAAAAAAAAAAAAAAAAAAAAAA");
//       silentSound.play().catch(() => {});
//       document.removeEventListener('click', unlockAudio);
//     };
    
//     document.addEventListener('click', unlockAudio);
    
//     return () => {
//       document.removeEventListener('click', unlockAudio);
//       // Cleanup
//       if (tickingRef.current) {
//         tickingRef.current.pause();
//       }
//       if (alarmRef.current) {
//         alarmRef.current.pause();
//       }
//       if (buttonClickRef.current) {
//         buttonClickRef.current.pause();
//       }
//     };
//   }, []);

//   // Initialize timer based on mode
//   useEffect(() => {
//     setTimeLeft(settings[mode] * 60);
//   }, [mode, settings]);

//   // Timer logic
//   useEffect(() => {
//     let interval;
    
//     if (isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(prevTime => prevTime - 1);
//       }, 1000);
      
//       // Play ticking sound when timer is running
//       if (soundEnabled && settings.tickingSound && tickingRef.current) {
//         tickingRef.current.play().catch(e => {
//           console.log('Ticking sound play failed:', e);
//           // Try again after a user interaction
//           const retryPlayback = () => {
//             tickingRef.current.play().catch(() => {});
//             document.removeEventListener('click', retryPlayback);
//           };
//           document.addEventListener('click', retryPlayback);
//         });
//       }
//     } else if (!isRunning && tickingRef.current) {
//       // Pause ticking sound when timer is paused
//       tickingRef.current.pause();
//     } else if (isRunning && timeLeft === 0) {
//       // Handle timer completion
//       const nextMode = getNextMode();
//       setMode(nextMode);
      
//       // Update cycles if completing a pomodoro
//       if (mode === 'pomodoro') {
//         setCycles(prev => prev + 1);
//       }
      
//       // Play notification sound
//       if (soundEnabled && alarmRef.current) {
//         alarmRef.current.play().catch(e => {
//           console.log('Alarm sound play failed:', e);
//           // Try again after a user interaction
//           const retryPlayback = () => {
//             alarmRef.current.play().catch(() => {});
//             document.removeEventListener('click', retryPlayback);
//           };
//           document.addEventListener('click', retryPlayback);
//         });
//       }
      
//       // Stop ticking sound
//       if (tickingRef.current) {
//         tickingRef.current.pause();
//       }
//     }
    
//     return () => clearInterval(interval);
//   }, [isRunning, timeLeft, mode, settings, soundEnabled, currentSound]);

//   const getNextMode = () => {
//     if (mode === 'pomodoro') {
//       // After pomodoro, check if we need a long break
//       return (cycles + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
//     } else {
//       // After any break, go back to pomodoro
//       return 'pomodoro';
//     }
//   };

//   const switchMode = (newMode) => {
//     setMode(newMode);
//     setTimeLeft(settings[newMode] * 60);
//     setIsRunning(false);
    
//     // Play button click sound
//     playButtonSound();
//   };

//   const resetTimer = () => {
//     setTimeLeft(settings[mode] * 60);
//     setIsRunning(false);
    
//     // Play button click sound
//     playButtonSound();
    
//     // Stop ticking sound
//     if (tickingRef.current) {
//       tickingRef.current.pause();
//     }
//   };

//   const updateSetting = (key, value) => {
//     const numValue = parseInt(value, 10);
//     if (!isNaN(numValue) && numValue > 0) {
//       setSettings(prev => ({ ...prev, [key]: numValue }));
//     }
//   };

//   const toggleSound = () => {
//     setSoundEnabled(!soundEnabled);
    
//     if (soundEnabled && tickingRef.current) {
//       tickingRef.current.pause();
//     }
    
//     playButtonSound();
//   };

//   const toggleTickingSound = () => {
//     setSettings(prev => ({ ...prev, tickingSound: !prev.tickingSound }));
    
//     // Stop ticking if turning off
//     if (settings.tickingSound && tickingRef.current) {
//       tickingRef.current.pause();
//     }
//   };

//   const playButtonSound = () => {
//     if (soundEnabled && buttonClickRef.current) {
//       buttonClickRef.current.currentTime = 0;
//       buttonClickRef.current.play().catch(e => {
//         console.log('Button sound play failed:', e);
//       });
//     }
//   };

//   const handlePlayPause = () => {
//     const wasRunning = isRunning;
//     setIsRunning(!isRunning);
    
//     // Force audio context to start (this helps with browser autoplay policies)
//     if (!wasRunning) {
//       // Force a user interaction with audio
//       if (buttonClickRef.current) {
//         buttonClickRef.current.play().catch(e => {
//           console.log("Audio context couldn't start:", e);
//         });
//       }
//     }
//   };

//   const saveSettings = () => {
//     setTimeLeft(settings[mode] * 60);
//     setShowSettings(false);
//     playButtonSound();
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getProgressPercentage = () => {
//     const totalTime = settings[mode] * 60;
//     return ((totalTime - timeLeft) / totalTime) * 100;
//   };

//   return (
//     <div className="mt-20 h-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-full h-full bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-full h-full bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//         <div className="absolute top-1/3 right-1/3 w-full h-full bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//       </div>
//       {/* Main container with responsive width */}
//       <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-8 relative overflow-hidden">
//         {/* Decorative background blobs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//           <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
//         </div>
        
//         {/* Top Controls - Settings and Sound Toggle */}
//         <div className="flex justify-between items-center mb-4 z-10">
//           <button 
//             className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//             onClick={toggleSound}
//             aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
//           >
//             {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
//           </button>
//           <h3 className="font-semibold text-gray-800 text-sm md:text-base flex items-center justify-center">
//             <Clock className="mr-2 text-pink-500" size={16} />
//             Pomodoro Timer
//           </h3>
//           <button 
//             className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//             onClick={() => setShowSettings(!showSettings)}
//             aria-label="Settings"
//           >
//             <Settings size={16} />
//           </button>
//         </div>
        
//         {/* Sound Status Indicator */}
//         {soundEnabled && (
//           <div className="text-center mb-2">
//             <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full inline-flex items-center">
//               <Volume2 size={10} className="mr-1" />
//               Sound On
//             </span>
//           </div>
//         )}
        
//         {/* Mode Selector - responsive sizing */}
//         <div className="bg-gray-100/80 rounded-full p-1 flex z-10 w-full mx-auto max-w-xs mb-4 md:mb-6">
//           <button 
//             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'pomodoro' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
//             onClick={() => switchMode('pomodoro')}
//           >
//             Work
//           </button>
//           <button 
//             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'shortBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
//             onClick={() => switchMode('shortBreak')}
//           >
//             Short
//           </button>
//           <button 
//             className={`flex-1 py-1 text-xs md:text-sm rounded-full transition-colors ${mode === 'longBreak' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
//             onClick={() => switchMode('longBreak')}
//           >
//             Long
//           </button>
//         </div>
        
//         {/* Timer Display - responsive sizing */}
//         <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-inner mb-4 md:mb-6">
//           <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
//             <circle 
//               cx="50" 
//               cy="50" 
//               r="45" 
//               fill="none" 
//               stroke="#f3f4f6" 
//               strokeWidth="5"
//             />
//             <circle 
//               cx="50" 
//               cy="50" 
//               r="45" 
//               fill="none" 
//               stroke={`url(#gradient-${mode})`} 
//               strokeWidth="5"
//               strokeDasharray="282.7"
//               strokeDashoffset={282.7 - ((getProgressPercentage() / 100) * 282.7)}
//               strokeLinecap="round"
//               transform="rotate(-90 50 50)"
//             />
//             <defs>
//               <linearGradient id={`gradient-pomodoro`} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#3b82f6" />
//                 <stop offset="100%" stopColor="#8b5cf6" />
//               </linearGradient>
//               <linearGradient id={`gradient-shortBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#34d399" />
//                 <stop offset="100%" stopColor="#14b8a6" />
//               </linearGradient>
//               <linearGradient id={`gradient-longBreak`} x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#818cf8" />
//                 <stop offset="100%" stopColor="#7c3aed" />
//               </linearGradient>
//             </defs>
//           </svg>
//           <div className="text-center z-10">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">{formatTime(timeLeft)}</h2>
//             <p className="text-xs md:text-sm text-gray-500 mt-1 capitalize">{mode.replace(/([A-Z])/g, ' $1').trim()}</p>
//           </div>
//         </div>
        
//         {/* Controls - responsive sizing */}
//         <div className="flex justify-center items-center gap-3 sm:gap-4 z-10">
//           <button 
//             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center shadow hover:opacity-90 transition-opacity"
//             onClick={handlePlayPause}
//             aria-label={isRunning ? "Pause" : "Play"}
//           >
//             {isRunning ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
//           </button>
//           <button 
//             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
//             onClick={resetTimer}
//             aria-label="Reset Timer"
//           >
//             <RotateCcw size={14} />
//           </button>
//         </div>
        
//         {/* Stats */}
//         <div className="mt-4 md:mt-6 text-center z-10">
//           <p className="text-xs md:text-sm text-gray-500">
//             <span className="font-medium text-gray-700">{cycles}</span> cycles •
//             <span className="font-medium text-gray-700"> {Math.floor(cycles * settings.pomodoro / 60)}h {(cycles * settings.pomodoro) % 60}m</span> focus
//           </p>
//         </div>
        
//         {/* Test Sound Button */}
//         <div className="mt-4 text-center">
//           <button 
//             className="text-xs bg-purple-100 text-purple-700 py-1 px-3 rounded-full"
//             onClick={() => {
//               if (buttonClickRef.current) {
//                 buttonClickRef.current.currentTime = 0;
//                 buttonClickRef.current.play().catch(e => console.log('Test sound failed:', e));
//               }
//             }}
//           >
//             Test Sound
//           </button>
//         </div>
//       </div>
      
//       {/* Settings Modal - full screen on mobile, centered dialog on larger screens */}
//       {showSettings && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 shadow-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-semibold text-gray-800">Timer Settings</h3>
//               <button 
//                 className="text-gray-400 hover:text-gray-600 text-xl" 
//                 onClick={() => setShowSettings(false)}
//                 aria-label="Close Settings"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1" htmlFor="pomodoro-time">Pomodoro (minutes)</label>
//                 <input 
//                   id="pomodoro-time"
//                   type="number" 
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
//                   value={settings.pomodoro}
//                   onChange={(e) => updateSetting('pomodoro', e.target.value)}
//                   min="1"
//                   max="60"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1" htmlFor="short-break-time">Short Break (minutes)</label>
//                 <input 
//                   id="short-break-time"
//                   type="number" 
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
//                   value={settings.shortBreak}
//                   onChange={(e) => updateSetting('shortBreak', e.target.value)}
//                   min="1"
//                   max="30"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-time">Long Break (minutes)</label>
//                 <input 
//                   id="long-break-time"
//                   type="number" 
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
//                   value={settings.longBreak}
//                   onChange={(e) => updateSetting('longBreak', e.target.value)}
//                   min="1"
//                   max="60"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1" htmlFor="long-break-interval">Long Break Interval (cycles)</label>
//                 <input 
//                   id="long-break-interval"
//                   type="number" 
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 outline-none"
//                   value={settings.longBreakInterval}
//                   onChange={(e) => updateSetting('longBreakInterval', e.target.value)}
//                   min="1"
//                   max="10"
//                 />
//               </div>
              
//               {/* Sound Settings */}
//               <div className="border-t pt-4">
//                 <h4 className="font-medium text-gray-700 mb-2">Sound Settings</h4>
                
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="text-sm text-gray-600" htmlFor="ticking-sound">Ticking Sound</label>
//                   <div className="relative inline-block w-10 mr-2 align-middle select-none">
//                     <input 
//                       id="ticking-sound" 
//                       type="checkbox" 
//                       checked={settings.tickingSound}
//                       onChange={toggleTickingSound}
//                       className="sr-only"
//                     />
//                     <div className={`block h-6 rounded-full w-10 ${settings.tickingSound ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
//                     <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.tickingSound ? 'transform translate-x-4' : ''}`}></div>
//                   </div>
//                 </div>
                
//                 {/* Test Sound Button */}
//                 <button 
//                   className="w-full py-2 mt-2 bg-purple-100 text-purple-700 rounded-lg text-sm"
//                   onClick={() => {
//                     if (alarmRef.current) {
//                       alarmRef.current.currentTime = 0;
//                       alarmRef.current.play().catch(e => console.log('Alarm test sound failed:', e));
//                     }
//                   }}
//                 >
//                   Test Completion Sound
//                 </button>
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end">
//               <button 
//                 className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg flex items-center"
//                 onClick={saveSettings}
//               >
//                 <Check className="mr-2" size={16} />
//                 Save Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PomodoroTimer;