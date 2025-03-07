// import React from "react";
// import MoodLiquidChart from "./MoodLiquidChart";

// const Dashboard = ({ moodData = [] }) => {
//   // Use dummy data if moodData is not provided
//   const dummyMoodData = [
//     { date: "2025-02-18", score: 80 },
//     { date: "2025-02-17", score: 65 },
//     { date: "2025-02-16", score: 75 },
//   ];

//   // Use actual moodData if available, otherwise, fallback to dummy data
//   const dataToUse = moodData.length ? moodData : dummyMoodData;

//   // Compute average mood score
//   const averageMood =
//     dataToUse.reduce((acc, mood) => acc + mood.score, 0) / dataToUse.length;

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold text-gray-700">Your Mood Level</h2>
//       <MoodLiquidChart moodScore={Math.round(averageMood)} />
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from "react";
// import MoodLiquidChart from "./MoodLiquidChart";

// const emotions = {
//   Happy: { color: "#00BFFF", emoji: "😊" },
//   Neutral: { color: "#808080", emoji: "😐" },
//   Sad: { color: "#FF4500", emoji: "☹️" },
//   Angry: { color: "#FF0000", emoji: "😡" },
//   Surprised: { color: "#FFD700", emoji: "😲" },
// };

// const Dashboard = ({ moodData = [] }) => {
//   // Dummy data if no mood data is passed
//   const dummyMoodData = [
//     { date: "2025-02-18", score: 80 },
//     { date: "2025-02-17", score: 65 },
//     { date: "2025-02-16", score: 75 },
//   ];

//   const dataToUse = moodData.length ? moodData : dummyMoodData;

//   // Calculate average mood score
//   const averageMood =
//     dataToUse.reduce((acc, mood) => acc + mood.score, 0) / dataToUse.length;

//   // State for selected emotion
//   const [selectedEmotion, setSelectedEmotion] = useState("Happy");

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
//         Your Mood Level
//       </h2>

//       {/* Liquid Chart */}
//       <MoodLiquidChart
//         moodScore={Math.round(averageMood)}
//         liquidColor={emotions[selectedEmotion].color}
//       />

//       {/* Emotion Buttons */}
//       <div className="flex justify-center gap-3 mt-4">
//         {Object.keys(emotions).map((emotion) => (
//           <button
//             key={emotion}
//             className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
//               selectedEmotion === emotion ? "bg-blue-600" : "bg-gray-400"
//             }`}
//             onClick={() => setSelectedEmotion(emotion)}
//           >
//             {emotions[emotion].emoji} {emotion}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







// import React, { useState } from "react";
// import MoodLiquidChart from "./MoodLiquidChart";
// import MoodLineChart from "./MoodLineChart";
// import MoodPieChart from "./MoodPieChart";
// import MoodBarChart from "./MoodBarChart";
// import MoodRadarChart from "./MoodRadarChart";

// const Dashboard = ({ moodData = [] }) => {
//   // Dummy data for testing
//   const dummyMoodData = [
//     { date: "2025-02-18", score: 80, emotion: "Happy", morning: 75, night: 85 },
//     { date: "2025-02-17", score: 65, emotion: "Neutral", morning: 60, night: 70 },
//     { date: "2025-02-16", score: 75, emotion: "Sad", morning: 80, night: 70 },
//     { date: "2025-02-15", score: 50, emotion: "Angry", morning: 55, night: 45 },
//     { date: "2025-02-14", score: 90, emotion: "Happy", morning: 88, night: 92 },
//   ];

//   const dataToUse = moodData.length ? moodData : dummyMoodData;

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md w-full mx-auto space-y-6">
//       <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Your Mood Dashboard</h2>

//       {/* Liquid Fill Chart - Current Mood */}
//       <div className="bg-gray-100 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold text-gray-600 mb-2">Current Mood</h3>
//         <MoodLiquidChart moodScore={dataToUse[0].score} />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {/* Line Chart - Mood Trends */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-600 mb-2">Mood Trends (Last 5 Days)</h3>
//           <MoodLineChart moodData={dataToUse} />
//         </div>

//         {/* Pie Chart - Emotion Breakdown */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-600 mb-2">Emotion Breakdown</h3>
//           <MoodPieChart moodData={dataToUse} />
//         </div>

//         {/* Bar Chart - Morning vs. Night Mood */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-600 mb-2">Morning vs. Night Mood</h3>
//           <MoodBarChart moodData={dataToUse} />
//         </div>

//         {/* Radar Chart - Emotional Balance */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-gray-600 mb-2">Emotional Balance</h3>
//           <MoodRadarChart moodData={dataToUse} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;












// // Love this
// import React, { useState, useEffect } from "react";
// import ReactECharts from "echarts-for-react";
// import * as echarts from "echarts";
// import "echarts-liquidfill";

// const Dashboard = () => {
//   const [moodData, setMoodData] = useState([]);
//   const [timeFilter, setTimeFilter] = useState("week");
//   const [isLoading, setIsLoading] = useState(true);
//   const [emotionStats, setEmotionStats] = useState({});
//   const [reasonStats, setReasonStats] = useState({});

//   // Emotion colors matching the MoodCapture component
//   const emotionColors = {
//     "happy": "#FFD700",
//     "sad": "#B0C4DE",
//     "angry": "#FF6347",
//     "excited": "#32CD32",
//     "worried": "#FFA500",
//     "crying": "#0000FF",
//   };

//   // Time filter options
//   const timeFilterOptions = [
//     { value: "week", label: "Last 7 Days" },
//     { value: "month", label: "Last 30 Days" },
//     { value: "quarter", label: "Last 3 Months" },
//     { value: "year", label: "Last Year" },
//     { value: "all", label: "All Time" }
//   ];

//   // Sample data for demonstration
//   const generateSampleData = () => {
//     const moods = ["Happy", "Sad", "Angry", "Excited", "Worried", "Crying"];
//     const reasons = [
//       "Work Stress", 
//       "Relationship Issues", 
//       "Health Concerns", 
//       "Personal Achievement", 
//       "Unexpected Event", 
//       "Feeling Lonely", 
//       "Excited for the Future", 
//       "Nothing in Particular"
//     ];
    
//     const result = [];
//     const now = new Date();
    
//     // Generate data for the last 30 days
//     for (let i = 30; i >= 0; i--) {
//       const date = new Date(now);
//       date.setDate(date.getDate() - i);
      
//       // Add 1-3 entries per day
//       const entriesPerDay = Math.floor(Math.random() * 3) + 1;
      
//       for (let j = 0; j < entriesPerDay; j++) {
//         const mood = moods[Math.floor(Math.random() * moods.length)];
//         const reason = reasons[Math.floor(Math.random() * reasons.length)];
        
//         // Bias the data slightly for better visualization
//         let biasedMood = mood;
//         if (i < 10) {
//           // Recent days more happy/excited
//           biasedMood = Math.random() > 0.6 ? ["Happy", "Excited"][Math.floor(Math.random() * 2)] : mood;
//         } else if (i >= 20) {
//           // Earlier days more worried/sad
//           biasedMood = Math.random() > 0.6 ? ["Worried", "Sad"][Math.floor(Math.random() * 2)] : mood;
//         }
        
//         result.push({
//           mood: biasedMood,
//           reason: reason,
//           timestamp: date.toISOString(),
//           id: `mood-${i}-${j}`
//         });
//       }
//     }
    
//     return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//   };

//   useEffect(() => {
//     // Set up with sample data
//     const data = generateSampleData();
//     setMoodData(data);
//     processStats(data);
//     setIsLoading(false);
//   }, [timeFilter]);

//   const processStats = (data) => {
//     // Filter data based on time selection
//     let filteredData = data;
//     const now = new Date();
    
//     if (timeFilter === "week") {
//       const weekAgo = new Date(now);
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       filteredData = data.filter(item => new Date(item.timestamp) >= weekAgo);
//     } else if (timeFilter === "month") {
//       const monthAgo = new Date(now);
//       monthAgo.setDate(monthAgo.getDate() - 30);
//       filteredData = data.filter(item => new Date(item.timestamp) >= monthAgo);
//     } else if (timeFilter === "quarter") {
//       const quarterAgo = new Date(now);
//       quarterAgo.setDate(quarterAgo.getDate() - 90);
//       filteredData = data.filter(item => new Date(item.timestamp) >= quarterAgo);
//     } else if (timeFilter === "year") {
//       const yearAgo = new Date(now);
//       yearAgo.setDate(yearAgo.getDate() - 365);
//       filteredData = data.filter(item => new Date(item.timestamp) >= yearAgo);
//     }
    
//     // Get mood frequencies
//     const moodCounts = filteredData.reduce((acc, item) => {
//       acc[item.mood] = (acc[item.mood] || 0) + 1;
//       return acc;
//     }, {});

//     // Get reason frequencies
//     const reasonCounts = filteredData.reduce((acc, item) => {
//       acc[item.reason] = (acc[item.reason] || 0) + 1;
//       return acc;
//     }, {});

//     // Calculate most frequent mood
//     let dominantMood = Object.keys(moodCounts).length > 0 ? 
//       Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b) : "Happy";
    
//     // Calculate mood percentages
//     const totalMoods = filteredData.length;
//     const moodPercentages = {};
    
//     for (const mood in moodCounts) {
//       moodPercentages[mood] = (moodCounts[mood] / totalMoods) * 100;
//     }

//     setEmotionStats({
//       counts: moodCounts,
//       percentages: moodPercentages,
//       dominant: dominantMood
//     });
    
//     setReasonStats(reasonCounts);
//   };

//   // Get dominant mood color for the liquid fill
//   const getDominantMoodColor = () => {
//     if (!emotionStats.dominant) return "#B0C4DE"; // Default color
//     return emotionColors[emotionStats.dominant.toLowerCase()] || "#B0C4DE";
//   };

//   // Prepare data for charts
//   const getLiquidFillOption = () => {
//     const dominantMood = emotionStats.dominant || "Loading...";
//     const dominantPercentage = emotionStats.percentages?.[dominantMood] || 0;
//     const value = dominantPercentage / 100;

//     return {
//       series: [{
//         type: 'liquidFill',
//         data: [value, value - 0.1 > 0 ? value - 0.1 : 0],
//         radius: '90%',
//         color: [getDominantMoodColor(), getDominantMoodColor()],
//         backgroundStyle: {
//           color: 'rgba(255, 255, 255, 0.1)'
//         },
//         itemStyle: {
//           opacity: 0.8
//         },
//         label: {
//           fontSize: 20,
//           color: '#666',
//           insideColor: '#fff',
//           formatter: function() {
//             return `${dominantMood}\n${dominantPercentage.toFixed(1)}%`;
//           }
//         },
//         outline: {
//           show: false
//         }
//       }]
//     };
//   };

//   const getMoodPieOption = () => {
//     const data = Object.keys(emotionStats.counts || {}).map(mood => ({
//       name: mood,
//       value: emotionStats.counts[mood],
//       itemStyle: {
//         color: emotionColors[mood.toLowerCase()] || "#B0C4DE"
//       }
//     }));

//     return {
//       tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b}: {c} ({d}%)'
//       },
//       legend: {
//         orient: 'vertical',
//         left: 10,
//         data: Object.keys(emotionStats.counts || {})
//       },
//       series: [
//         {
//           name: 'Mood Distribution',
//           type: 'pie',
//           radius: ['50%', '70%'],
//           avoidLabelOverlap: false,
//           label: {
//             show: false,
//             position: 'center'
//           },
//           emphasis: {
//             label: {
//               show: true,
//               fontSize: 16,
//               fontWeight: 'bold'
//             }
//           },
//           labelLine: {
//             show: false
//           },
//           data: data
//         }
//       ]
//     };
//   };

//   const getMoodTimelineOption = () => {
//     // Group data by date
//     const dateGroups = moodData.reduce((acc, item) => {
//       const date = new Date(item.timestamp).toLocaleDateString();
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(item);
//       return acc;
//     }, {});

//     // Get unique moods
//     const uniqueMoods = [...new Set(moodData.map(item => item.mood))];
    
//     // Create series data
//     const seriesData = uniqueMoods.map(mood => {
//       const data = Object.keys(dateGroups).map(date => {
//         const count = dateGroups[date].filter(item => item.mood === mood).length;
//         return [date, count];
//       }).sort((a, b) => new Date(a[0]) - new Date(b[0]));
      
//       return {
//         name: mood,
//         type: 'line',
//         stack: 'Total',
//         areaStyle: {},
//         emphasis: {
//           focus: 'series'
//         },
//         itemStyle: {
//           color: emotionColors[mood.toLowerCase()] || "#B0C4DE"
//         },
//         data: data
//       };
//     });

//     return {
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'cross',
//           label: {
//             backgroundColor: '#6a7985'
//           }
//         }
//       },
//       legend: {
//         data: uniqueMoods
//       },
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//       },
//       xAxis: [
//         {
//           type: 'time',
//           boundaryGap: false
//         }
//       ],
//       yAxis: [
//         {
//           type: 'value',
//           name: 'Count'
//         }
//       ],
//       series: seriesData
//     };
//   };

//   const getReasonBarOption = () => {
//     // Sort reasons by frequency
//     const sortedReasons = Object.entries(reasonStats)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5); // Top 5 reasons
    
//     return {
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'shadow'
//         }
//       },
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//       },
//       xAxis: {
//         type: 'category',
//         data: sortedReasons.map(item => item[0]),
//         axisLabel: {
//           interval: 0,
//           rotate: 30
//         }
//       },
//       yAxis: {
//         type: 'value'
//       },
//       series: [
//         {
//           name: 'Frequency',
//           type: 'bar',
//           data: sortedReasons.map(item => ({
//             value: item[1],
//             itemStyle: {
//               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                 { offset: 0, color: '#83bff6' },
//                 { offset: 0.5, color: '#188df0' },
//                 { offset: 1, color: '#188df0' }
//               ])
//             }
//           }))
//         }
//       ]
//     };
//   };

//   // Function to get mood emoji
//   const getMoodEmoji = (mood) => {
//     const emojiMap = {
//       "Happy": "😊",
//       "Sad": "😔",
//       "Angry": "😠",
//       "Excited": "🤩",
//       "Worried": "😟",
//       "Crying": "😭"
//     };
    
//     return emojiMap[mood] || "😐";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-4 md:p-10 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-6xl">
//         <div className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Mood Dashboard
//           </h1>
//           <p className="text-base md:text-lg text-gray-600 font-light mt-2">
//             Visualize your emotional patterns and gain insights
//           </p>
//         </div>

//         {/* Filter Selection */}
//         <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 mb-6 md:mb-8 w-full">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-0">
//               Mood Analytics
//             </h2>
//             <div className="flex items-center space-x-2">
//               <label htmlFor="timeFilter" className="text-sm text-gray-600">
//                 Time Period:
//               </label>
//               <select
//                 id="timeFilter"
//                 value={timeFilter}
//                 onChange={(e) => setTimeFilter(e.target.value)}
//                 className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
//               >
//                 {timeFilterOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               <button 
//                 onClick={() => {
//                   setIsLoading(true);
//                   setTimeout(() => {
//                     const data = generateSampleData();
//                     setMoodData(data);
//                     processStats(data);
//                     setIsLoading(false);
//                   }, 500);
//                 }} 
//                 className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-sm transition-all duration-200"
//               >
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-10 mb-8 w-full flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <>
//             {/* Top Row - Dominant Mood and Pie Chart */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Dominant Mood Liquid Fill */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
//                   Dominant Mood
//                 </h3>
//                 <div className="h-64 md:h-72">
//                   <ReactECharts
//                     option={getLiquidFillOption()}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//               </div>

//               {/* Mood Distribution Pie */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
//                   Mood Distribution
//                 </h3>
//                 <div className="h-64 md:h-72">
//                   <ReactECharts
//                     option={getMoodPieOption()}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Row - Timeline and Reasons */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Mood Timeline */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-2">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
//                   Mood Timeline
//                 </h3>
//                 <div className="h-72 md:h-80">
//                   <ReactECharts
//                     option={getMoodTimelineOption()}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//               </div>

//               {/* Top Reasons Bar Chart */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-2">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
//                   Top Reasons for Your Moods
//                 </h3>
//                 <div className="h-72 md:h-80">
//                   <ReactECharts
//                     option={getReasonBarOption()}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               {/* Total Entries Card */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-gray-600 text-sm">Total Mood Entries</h3>
//                     <p className="text-3xl font-semibold">{moodData.length}</p>
//                   </div>
//                   <div className="bg-blue-100 p-3 rounded-full">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Most Recent Mood */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-gray-600 text-sm">Most Recent Mood</h3>
//                     <p className="text-3xl font-semibold flex items-center">
//                       {moodData.length > 0 ? (
//                         <>
//                           {getMoodEmoji(moodData[0].mood)}
//                           <span className="ml-2">{moodData[0].mood}</span>
//                         </>
//                       ) : "N/A"}
//                     </p>
//                   </div>
//                   <div className="bg-green-100 p-3 rounded-full">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Mood Consistency */}
//               <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-gray-600 text-sm">Unique Moods Tracked</h3>
//                     <p className="text-3xl font-semibold">
//                       {Object.keys(emotionStats.counts || {}).length}
//                     </p>
//                   </div>
//                   <div className="bg-purple-100 p-3 rounded-full">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Mood Entries */}
//             <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4">
//                 Recent Mood Entries
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-50 text-left">
//                       <th className="p-3 text-sm font-medium text-gray-500">Mood</th>
//                       <th className="p-3 text-sm font-medium text-gray-500">Reason</th>
//                       <th className="p-3 text-sm font-medium text-gray-500">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {moodData.slice(0, 5).map((entry) => (
//                       <tr key={entry.id} className="border-b border-gray-100">
//                         <td className="p-3 text-sm">
//                           <span className="flex items-center">
//                             <span className="mr-2 text-lg">{getMoodEmoji(entry.mood)}</span>
//                             {entry.mood}
//                           </span>
//                         </td>
//                         <td className="p-3 text-sm text-gray-700">{entry.reason}</td>
//                         <td className="p-3 text-sm text-gray-500">
//                           {new Date(entry.timestamp).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



















import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-liquidfill";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [emotionStats, setEmotionStats] = useState({});
  const [reasonStats, setReasonStats] = useState({});
  const [timeOfDayStats, setTimeOfDayStats] = useState({});

  // Emotion colors matching the MoodCapture component
  const emotionColors = {
    "happy": "#FFD700",
    "sad": "#B0C4DE",
    "angry": "#FF6347",
    "excited": "#32CD32",
    "worried": "#FFA500",
    "crying": "#0000FF",
  };

  // Time of day labels and order
  const timeOfDayOrder = [
    'earlyMorning', 
    'lateMorning', 
    'earlyAfternoon', 
    'lateAfternoon', 
    'earlyEvening', 
    'lateEvening', 
    'night', 
    'lateNight'
  ];

  const timeOfDayLabels = {
    'earlyMorning': '5-8 AM',
    'lateMorning': '8-12 PM',
    'earlyAfternoon': '12-2 PM',
    'lateAfternoon': '2-5 PM',
    'earlyEvening': '5-6:30 PM',
    'lateEvening': '6:30-8 PM',
    'night': '8-12 AM',
    'lateNight': '12-5 AM'
  };

  // Time filter options
  const timeFilterOptions = [
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
    { value: "quarter", label: "Last 3 Months" },
    { value: "year", label: "Last Year" },
    { value: "all", label: "All Time" }
  ];

  // Helper function to get time of day
  const getTimeOfDay = (timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours() + (date.getMinutes() / 60);

    if (hour >= 5 && hour < 8) {
      return 'earlyMorning';
    } else if (hour >= 8 && hour < 12) {
      return 'lateMorning';
    } else if (hour >= 12 && hour < 14) {
      return 'earlyAfternoon';
    } else if (hour >= 14 && hour < 17) {
      return 'lateAfternoon';
    } else if (hour >= 17 && hour < 18.5) {
      return 'earlyEvening';
    } else if (hour >= 18.5 && hour < 20) {
      return 'lateEvening';
    } else if (hour >= 20 && hour < 24) {
      return 'night';
    } else if (hour >= 0 && hour < 5) {
      return 'lateNight';
    }
    return 'unknown';
  };

  // Sample data for demonstration
  const generateSampleData = () => {
    const moods = ["Happy", "Sad", "Angry", "Excited", "Worried", "Crying"];
    const reasons = [
      "Work Stress", 
      "Relationship Issues", 
      "Health Concerns", 
      "Personal Achievement", 
      "Unexpected Event", 
      "Feeling Lonely", 
      "Excited for the Future", 
      "Nothing in Particular"
    ];
    
    const result = [];
    const now = new Date();
    
    // Generate data for the last 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Add 1-3 entries per day
      const entriesPerDay = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < entriesPerDay; j++) {
        // Set a random time of day for this entry
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        date.setHours(hours, minutes);
        
        const mood = moods[Math.floor(Math.random() * moods.length)];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        
        // Bias the data slightly for better visualization
        let biasedMood = mood;
        if (i < 10) {
          // Recent days more happy/excited
          biasedMood = Math.random() > 0.6 ? ["Happy", "Excited"][Math.floor(Math.random() * 2)] : mood;
        } else if (i >= 20) {
          // Earlier days more worried/sad
          biasedMood = Math.random() > 0.6 ? ["Worried", "Sad"][Math.floor(Math.random() * 2)] : mood;
        }
        
        // Time of day biases
        // Early mornings tend to be more calm (sad/worried)
        // Afternoons tend to be more productive (happy/excited)
        // Nights tend to be more emotional (all emotions)
        const timeOfDay = getTimeOfDay(date);
        if (timeOfDay === 'earlyMorning' && Math.random() > 0.7) {
          biasedMood = Math.random() > 0.5 ? "Worried" : "Sad";
        } else if ((timeOfDay === 'earlyAfternoon' || timeOfDay === 'lateAfternoon') && Math.random() > 0.7) {
          biasedMood = Math.random() > 0.5 ? "Happy" : "Excited";
        }
        
        result.push({
          mood: biasedMood,
          reason: reason,
          timestamp: date.toISOString(),
          timeOfDay: timeOfDay,
          id: `mood-${i}-${j}`
        });
      }
    }
    
    return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  useEffect(() => {
    // Set up with sample data
    const data = generateSampleData();
    setMoodData(data);
    processStats(data);
    setIsLoading(false);
  }, [timeFilter]);

  const processStats = (data) => {
    // Filter data based on time selection
    let filteredData = data;
    const now = new Date();
    
    if (timeFilter === "week") {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filteredData = data.filter(item => new Date(item.timestamp) >= weekAgo);
    } else if (timeFilter === "month") {
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      filteredData = data.filter(item => new Date(item.timestamp) >= monthAgo);
    } else if (timeFilter === "quarter") {
      const quarterAgo = new Date(now);
      quarterAgo.setDate(quarterAgo.getDate() - 90);
      filteredData = data.filter(item => new Date(item.timestamp) >= quarterAgo);
    } else if (timeFilter === "year") {
      const yearAgo = new Date(now);
      yearAgo.setDate(yearAgo.getDate() - 365);
      filteredData = data.filter(item => new Date(item.timestamp) >= yearAgo);
    }
    
    // Get mood frequencies
    const moodCounts = filteredData.reduce((acc, item) => {
      acc[item.mood] = (acc[item.mood] || 0) + 1;
      return acc;
    }, {});

    // Get reason frequencies
    const reasonCounts = filteredData.reduce((acc, item) => {
      acc[item.reason] = (acc[item.reason] || 0) + 1;
      return acc;
    }, {});

    // Get mood by time of day
    const timeOfDayData = filteredData.reduce((acc, item) => {
      if (!acc[item.timeOfDay]) {
        acc[item.timeOfDay] = {};
      }
      acc[item.timeOfDay][item.mood] = (acc[item.timeOfDay][item.mood] || 0) + 1;
      return acc;
    }, {});

    // Calculate most frequent mood
    let dominantMood = Object.keys(moodCounts).length > 0 ? 
      Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b) : "Happy";
    
    // Calculate mood percentages
    const totalMoods = filteredData.length;
    const moodPercentages = {};
    
    for (const mood in moodCounts) {
      moodPercentages[mood] = (moodCounts[mood] / totalMoods) * 100;
    }

    setEmotionStats({
      counts: moodCounts,
      percentages: moodPercentages,
      dominant: dominantMood
    });
    
    setReasonStats(reasonCounts);
    setTimeOfDayStats(timeOfDayData);
  };

  // Get dominant mood color for the liquid fill
  const getDominantMoodColor = () => {
    if (!emotionStats.dominant) return "#B0C4DE"; // Default color
    return emotionColors[emotionStats.dominant.toLowerCase()] || "#B0C4DE";
  };

  // Prepare data for charts
  const getLiquidFillOption = () => {
    const dominantMood = emotionStats.dominant || "Loading...";
    const dominantPercentage = emotionStats.percentages?.[dominantMood] || 0;
    const value = dominantPercentage / 100;

    return {
      series: [{
        type: 'liquidFill',
        data: [value, value - 0.1 > 0 ? value - 0.1 : 0],
        radius: '90%',
        color: [getDominantMoodColor(), getDominantMoodColor()],
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        itemStyle: {
          opacity: 0.8
        },
        label: {
          fontSize: 20,
          color: '#666',
          insideColor: '#fff',
          formatter: function() {
            return `${dominantMood}\n${dominantPercentage.toFixed(1)}%`;
          }
        },
        outline: {
          show: false
        }
      }]
    };
  };

  const getMoodPieOption = () => {
    const data = Object.keys(emotionStats.counts || {}).map(mood => ({
      name: mood,
      value: emotionStats.counts[mood],
      itemStyle: {
        color: emotionColors[mood.toLowerCase()] || "#B0C4DE"
      }
    }));

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: Object.keys(emotionStats.counts || {})
      },
      series: [
        {
          name: 'Mood Distribution',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };
  };

  const getMoodTimelineOption = () => {
    // Group data by date
    const dateGroups = moodData.reduce((acc, item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Get unique moods
    const uniqueMoods = [...new Set(moodData.map(item => item.mood))];
    
    // Create series data
    const seriesData = uniqueMoods.map(mood => {
      const data = Object.keys(dateGroups).map(date => {
        const count = dateGroups[date].filter(item => item.mood === mood).length;
        return [date, count];
      }).sort((a, b) => new Date(a[0]) - new Date(b[0]));
      
      return {
        name: mood,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: emotionColors[mood.toLowerCase()] || "#B0C4DE"
        },
        data: data
      };
    });

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: uniqueMoods
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'time',
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Count'
        }
      ],
      series: seriesData
    };
  };

  const getReasonBarOption = () => {
    // Sort reasons by frequency
    const sortedReasons = Object.entries(reasonStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5 reasons
    
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: sortedReasons.map(item => item[0]),
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Frequency',
          type: 'bar',
          data: sortedReasons.map(item => ({
            value: item[1],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            }
          }))
        }
      ]
    };
  };

  // New chart: Mood by Time of Day
  const getMoodByTimeOfDayOption = () => {
    // Get unique moods
    const uniqueMoods = [...new Set(moodData.map(item => item.mood))];
    
    // Create series for each mood
    const series = uniqueMoods.map(mood => {
      // Create data array with one entry per time of day
      const data = timeOfDayOrder.map(tod => {
        // Get count for this mood at this time of day or default to 0
        return timeOfDayStats[tod] && timeOfDayStats[tod][mood] 
          ? timeOfDayStats[tod][mood] 
          : 0;
      });
      
      return {
        name: mood,
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: emotionColors[mood.toLowerCase()] || "#B0C4DE"
        },
        data: data
      };
    });

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: uniqueMoods
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: timeOfDayOrder.map(tod => timeOfDayLabels[tod]),
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
  };

  // Function to get mood emoji
  const getMoodEmoji = (mood) => {
    const emojiMap = {
      "Happy": "😊",
      "Sad": "😔",
      "Angry": "😠",
      "Excited": "🤩",
      "Worried": "😟",
      "Crying": "😭"
    };
    
    return emojiMap[mood] || "😐";
  };

  // Get time of day label
  const getTimeOfDayLabel = (timeOfDay) => {
    return timeOfDayLabels[timeOfDay] || timeOfDay;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start p-4 md:p-10 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Mood Dashboard
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light mt-2">
            Visualize your emotional patterns and gain insights
          </p>
        </div>

        {/* Filter Selection */}
        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 mb-6 md:mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-0">
              Mood Analytics
            </h2>
            <div className="flex items-center space-x-2">
              <label htmlFor="timeFilter" className="text-sm text-gray-600">
                Time Period:
              </label>
              <select
                id="timeFilter"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                {timeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button 
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    const data = generateSampleData();
                    setMoodData(data);
                    processStats(data);
                    setIsLoading(false);
                  }, 500);
                }} 
                className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-sm transition-all duration-200"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-10 mb-8 w-full flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Top Row - Dominant Mood and Pie Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Dominant Mood Liquid Fill */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Dominant Mood
                </h3>
                <div className="h-64 md:h-72">
                  <ReactECharts
                    option={getLiquidFillOption()}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>

              {/* Mood Distribution Pie */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Mood Distribution
                </h3>
                <div className="h-64 md:h-72">
                  <ReactECharts
                    option={getMoodPieOption()}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* New Chart: Mood by Time of Day */}
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Mood Distribution by Time of Day
              </h3>
              <div className="h-72 md:h-80">
                <ReactECharts
                  option={getMoodByTimeOfDayOption()}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>

            {/* Bottom Row - Timeline and Reasons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Mood Timeline */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Mood Timeline
                </h3>
                <div className="h-72 md:h-80">
                  <ReactECharts
                    option={getMoodTimelineOption()}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>

              {/* Top Reasons Bar Chart */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Top Reasons for Your Moods
                </h3>
                <div className="h-72 md:h-80">
                  <ReactECharts
                    option={getReasonBarOption()}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Total Entries Card */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm">Total Mood Entries</h3>
                    <p className="text-3xl font-semibold">{moodData.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Most Recent Mood */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm">Most Recent Mood</h3>
                    <p className="text-3xl font-semibold flex items-center">
                      {moodData.length > 0 ? (
                        <>
                          {getMoodEmoji(moodData[0].mood)}
                          <span className="ml-2">{moodData[0].mood}</span>
                        </>
                      ) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mood Consistency */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm">Unique Moods Tracked</h3>
                    <p className="text-3xl font-semibold">
                      {Object.keys(emotionStats.counts || {}).length}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Mood Entries */}
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Recent Mood Entries
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 text-sm font-medium text-gray-500">Mood</th>
                      <th className="p-3 text-sm font-medium text-gray-500">Reason</th>
                      <th className="p-3 text-sm font-medium text-gray-500">Time of Day</th>
                      <th className="p-3 text-sm font-medium text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moodData.slice(0, 5).map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-100">
                        <td className="p-3 text-sm">
                          <span className="flex items-center">
                            <span className="mr-2 text-lg">{getMoodEmoji(entry.mood)}</span>
                            {entry.mood}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-700">{entry.reason}</td>
                        <td className="p-3 text-sm text-gray-600">{getTimeOfDayLabel(entry.timeOfDay)}</td>
                        <td className="p-3 text-sm text-gray-500">
                          {new Date(entry.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
               </div>
     </div>
  );
};

export default Dashboard;
  