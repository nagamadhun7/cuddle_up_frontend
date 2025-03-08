import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-liquidfill";
import { getAuth } from "firebase/auth";
import axios from "axios";
import emotionColor from "../emotionColors.json";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [emotionStats, setEmotionStats] = useState({});
  const [reasonStats, setReasonStats] = useState({});
  const [timeOfDayStats, setTimeOfDayStats] = useState({});

  // Emotion colors matching the emotions from your backend data
  // const emotionColors = {
  //   happy: "#FFD700",
  //   sad: "#B0C4DE",
  //   angry: "#FF6347",
  //   excited: "#32CD32",
  //   worried: "#FFA500",
  //   crying: "#0000FF",
  // };

  // Time of day labels and order
  const timeOfDayOrder = [
    "earlyMorning",
    "lateMorning",
    "earlyAfternoon",
    "lateAfternoon",
    "earlyEvening",
    "lateEvening",
    "night",
    "lateNight",
  ];

  const timeOfDayLabels = {
    earlyMorning: "5 AM - 8 AM",
    lateMorning: "8 AM - 12 PM",
    earlyAfternoon: "12 PM - 2 PM",
    lateAfternoon: "2 PM - 5 PM",
    earlyEvening: "5 PM - 6:30 PM",
    lateEvening: "6:30 PM - 8 PM",
    night: "8 PM - 12 AM",
    lateNight: "12 AM - 5 AM",
  };

  // Time filter options
  const timeFilterOptions = [
    { value: "week", label: "Last 7 Days" },
    { value: "month", label: "Last 30 Days" },
    { value: "quarter", label: "Last 3 Months" },
    { value: "year", label: "Last Year" },
    { value: "all", label: "All Time" },
  ];

  // Helper function to parse timestamp correctly
  const parseTimestamp = (timestamp) => {
    // Check if timestamp is a string (from the new format)
    if (typeof timestamp === "string") {
      return new Date(timestamp);
    }
    // Check if timestamp has _seconds (Firestore format)
    else if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000);
    }
    // Fallback to current date if format is unknown
    return new Date();
  };

  // Function to refresh data (re-fetch from backend)
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setIsLoading(false);
        return; // Exit if user is not logged in
      }

      const token = await user.getIdToken(true);
      const response = await axios.get(
        "https://cuddle-up-backend.onrender.com/api/mood/getMoods",
        // "http://localhost:5001/api/mood/getMoods",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Format the response data
      const formattedData = response.data.map((item) => ({
        id: item.id,
        mood: item.mood,
        reason: item.reason,
        timestamp: parseTimestamp(item.createdAt),
        timeOfDay: item.timeOfDay,
      }));

      // Sort by date (most recent first)
      formattedData.sort((a, b) => b.timestamp - a.timestamp);

      setMoodData(formattedData);
      processStats(formattedData);
    } catch (error) {
      console.error("Error refreshing moods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setIsLoading(false);
          return; // Exit if user is not logged in
        }

        const token = await user.getIdToken(true); // Get auth token
        const response = await axios.get(
          // "http://localhost:5001/api/mood/getMoods",
          "https://cuddle-up-backend.onrender.com/api/mood/getMoods",

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Format the response data and update state
        const formattedData = response.data.map((item) => ({
          id: item.id,
          mood: item.mood,
          reason: item.reason,
          timestamp: parseTimestamp(item.createdAt),
          timeOfDay: item.timeOfDay,
        }));

        // Sort by date (most recent first)
        formattedData.sort((a, b) => b.timestamp - a.timestamp);

        setMoodData(formattedData);
        processStats(formattedData);
      } catch (error) {
        console.error("Error fetching or processing moods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoods();
  }, [timeFilter]);

  const processStats = (data) => {
    // Filter data based on time selection
    let filteredData = data;
    const now = new Date();

    if (timeFilter === "week") {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filteredData = data.filter((item) => item.timestamp >= weekAgo);
    } else if (timeFilter === "month") {
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      filteredData = data.filter((item) => item.timestamp >= monthAgo);
    } else if (timeFilter === "quarter") {
      const quarterAgo = new Date(now);
      quarterAgo.setDate(quarterAgo.getDate() - 90);
      filteredData = data.filter((item) => item.timestamp >= quarterAgo);
    } else if (timeFilter === "year") {
      const yearAgo = new Date(now);
      yearAgo.setDate(yearAgo.getDate() - 365);
      filteredData = data.filter((item) => item.timestamp >= yearAgo);
    }

    // Handle empty data
    if (filteredData.length === 0) {
      setEmotionStats({
        counts: {},
        percentages: {},
        dominant: null,
      });
      setReasonStats({});
      setTimeOfDayStats({});
      return;
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
      acc[item.timeOfDay][item.mood] =
        (acc[item.timeOfDay][item.mood] || 0) + 1;
      return acc;
    }, {});

    // Calculate most frequent mood
    let dominantMood =
      Object.keys(moodCounts).length > 0
        ? Object.keys(moodCounts).reduce((a, b) =>
            moodCounts[a] > moodCounts[b] ? a : b
          )
        : "Excited";

    // Calculate mood percentages
    const totalMoods = filteredData.length;
    const moodPercentages = {};

    for (const mood in moodCounts) {
      moodPercentages[mood] = (moodCounts[mood] / totalMoods) * 100;
    }

    setEmotionStats({
      counts: moodCounts,
      percentages: moodPercentages,
      dominant: dominantMood,
    });

    setReasonStats(reasonCounts);
    setTimeOfDayStats(timeOfDayData);
  };

  // Get dominant mood color for the liquid fill
  const getDominantMoodColor = () => {
    if (!emotionStats.dominant) return "#B0C4DE"; // Default color
    return emotionColor[emotionStats.dominant.toLowerCase()] || "#B0C4DE";
  };

  // Prepare data for charts
  const getLiquidFillOption = () => {
    const dominantMood = emotionStats.dominant || "Loading...";
    const dominantPercentage = emotionStats.percentages?.[dominantMood] || 0;
    const value = dominantPercentage / 100;

    return {
      series: [
        {
          type: "liquidFill",
          data: [value, value - 0.1 > 0 ? value - 0.1 : 0],
          radius: "90%",
          color: [getDominantMoodColor(), getDominantMoodColor()],
          backgroundStyle: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          itemStyle: {
            opacity: 0.8,
          },
          label: {
            fontSize: 20,
            color: "#666",
            insideColor: "#fff",
            formatter: function () {
              return `${dominantMood}\n${dominantPercentage.toFixed(1)}%`;
            },
          },
          outline: {
            show: false,
          },
        },
      ],
    };
  };

  const getMoodPieOption = () => {
    const data = Object.keys(emotionStats.counts || {}).map((mood) => ({
      name: mood,
      value: emotionStats.counts[mood],
      itemStyle: {
        color: emotionColor[mood.toLowerCase()] || "#B0C4DE",
      },
    }));

    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: Object.keys(emotionStats.counts || {}),
      },
      series: [
        {
          name: "Mood Distribution",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
  };

  const getMoodBubbleChartOption = () => {
    if (!moodData || moodData.length === 0) return {};

    // Get date range based on timeFilter
    const endDate = new Date();
    let startDate = new Date();
    switch (timeFilter) {
      case "week":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "quarter":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "year":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "all":
        startDate = new Date(0); // Earliest possible date
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }

    // Filter moodData within the selected time range
    const filteredData = moodData.filter(
      (item) => new Date(item.timestamp) >= startDate
    );

    // Group data by date and mood
    const moodCounts = filteredData.reduce((acc, item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      if (!acc[date]) acc[date] = {};
      acc[date][item.mood] = (acc[date][item.mood] || 0) + 1;
      return acc;
    }, {});

    // Prepare unique moods and date labels
    const uniqueMoods = [...new Set(moodData.map((item) => item.mood))];
    const dateLabels = Object.keys(moodCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Prepare bubble data
    const bubbleData = [];
    dateLabels.forEach((date, xIndex) => {
      uniqueMoods.forEach((mood, yIndex) => {
        if (moodCounts[date][mood]) {
          bubbleData.push([xIndex, yIndex, moodCounts[date][mood] * 10]); // Bubble size = mood count * 10
        }
      });
    });

    // Use emotionColors to assign colors to moods - FIXED: no toLowerCase()
    // const emotionColors = {
    //   Happy: "#FFD700",
    //   Sad: "#B0C4DE",
    //   Angry: "#FF6347",
    //   Excited: "#32CD32",
    //   Worried: "#FFA500",
    //   Crying: "#0000FF",
    // };

    // Prepare series data with different color for each mood
    const series = uniqueMoods.map((mood, index) => {
  
      const moodData = bubbleData.filter((item) => item[1] === index);
      return {
        name: mood,
        type: "scatter",
        symbolSize: (data) => data[2], // Bubble size depends on frequency
        itemStyle: {
          color: emotionColor[mood.toLowerCase()] || "#B0C4DE", // Default to light gray if mood is not found
        },
        data: moodData,
      };
    });

    return {
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          const [x, y, value] = params.data;
          return `${params.seriesName} on ${dateLabels[x]}: ${
            value / 10
          } times`;
        },
      },
      legend: {
        data: uniqueMoods,
        orient: "horizontal",
        top: 20,
      },
      xAxis: {
        type: "category",
        data: dateLabels,
        name: "Date",
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: "category",
        data: uniqueMoods,
        name: "Mood Type",
      },
      series: series,
    };
  };

  const getReasonBarOption = () => {
    // Sort reasons by frequency
    const sortedReasons = Object.entries(reasonStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5 reasons

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sortedReasons.map((item) => item[0]),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Frequency",
          type: "bar",
          data: sortedReasons.map((item) => ({
            value: item[1],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          })),
        },
      ],
    };
  };

  // New chart: Mood by Time of Day
  const getMoodByTimeOfDayOption = () => {
    // Get unique moods
    const uniqueMoods = [...new Set(moodData.map((item) => item.mood))];

    // Create series for each mood
    const series = uniqueMoods.map((mood) => {
      // Create data array with one entry per time of day
      const data = timeOfDayOrder.map((tod) => {
        // Get count for this mood at this time of day or default to 0
        return timeOfDayStats[tod] && timeOfDayStats[tod][mood]
          ? timeOfDayStats[tod][mood]
          : 0;
      });

      return {
        name: mood,
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: emotionColor[mood.toLowerCase()] || "#B0C4DE",
        },
        data: data,
      };
    });

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: uniqueMoods,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: timeOfDayOrder.map((tod) => timeOfDayLabels[tod]),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
      },
      series: series,
    };
  };

  // Function to get mood emoji
  const getMoodEmoji = (mood) => {
    // const emojiMap = {
    //   Happy: "😊",
    //   Sad: "😔",
    //   Angry: "😠",
    //   Excited: "🤩",
    //   Worried: "😟",
    //   Crying: "😭",
    // };
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
    

    return emojiMap[mood] || "😐";
  };

  // Get time of day label
  const getTimeOfDayLabel = (timeOfDay) => {
    // return timeOfDayLabels[timeOfDay] || timeOfDay;
    console.log(timeOfDay)
    const timeOfDayMap = {
      earlyMorning: "🌅 Early Morning",
      morning: "🌞 Morning",
      lateMorning: "🌄 Late Morning",
      afternoon: "🌻 Afternoon",
      lateAfternoon: "🌇 Late Afternoon",
      earlyEvening: "🌆 Early Evening",
      evening: "🌙 Evening",
      lateEvening: "🌜 Late Evening",
      night: "🌙 Night",
      lateNight: "🌚 Late Night",
    };
    return timeOfDayMap[timeOfDay];
  };

  const renderEmptyState = () => {
    return (
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 md:p-12 w-full flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Welcome to Your Mood Dashboard!
          </h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            You haven't logged any moods yet. Start tracking to see patterns and insights about your emotional wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Track Patterns</h4>
              <p className="text-gray-600 text-center">Discover trends in your emotional wellbeing over time</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Gain Insights</h4>
              <p className="text-gray-600 text-center">Understand what influences your moods and emotions</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Improve Wellbeing</h4>
              <p className="text-gray-600 text-center">Use insights to make positive changes to your daily routine</p>
            </div>
          </div>
        </div>
        
        <Link 
          to="/mood-capture" // Assuming you have a route for logging moods
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Log Your First Mood
        </Link>
        
        <div className="mt-8 text-gray-500">
          <p>Your dashboard will automatically update as you log your moods</p>
        </div>
      </div>
    );
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
                onClick={refreshData}
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
           ) : moodData.length === 0 ? (
            // Empty state UI when no moods are logged
            renderEmptyState()
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
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Mood Trends (Bubble Chart)
                </h3>

                <div className="h-72 md:h-80">
                  <ReactECharts
                    option={getMoodBubbleChartOption()}
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
                    <h3 className="text-gray-600 text-sm">
                      Total Mood Entries
                    </h3>
                    <p className="text-3xl font-semibold">{moodData.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
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
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Unique Moods Tracked */}
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm">
                      Unique Moods Tracked
                    </h3>
                    <p className="text-3xl font-semibold">
                      {Object.keys(emotionStats.counts || {}).length}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-4 md:p-6 md:col-span-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Recent Mood Entries
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="p-3 text-sm font-medium text-gray-500">
                          Mood
                        </th>
                        <th className="p-3 text-sm font-medium text-gray-500">
                          Reason
                        </th>
                        <th className="p-3 text-sm font-medium text-gray-500">
                          Time of Day
                        </th>
                        <th className="p-3 text-sm font-medium text-gray-500">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {moodData.slice(0, 5).map((entry) => (
                        <tr
                          key={entry.id}
                          style={{
                            borderColor: emotionColor[entry.mood.toLowerCase()],
                          }}
                          className="border-b opacity-90"
                        >
                          <td className="p-3 text-sm">
                            <span
                              style={{
                                backgroundColor:
                                  emotionColor[entry.mood.toLowerCase()],
                              }}
                              className="flex opacity-90 p-2 rounded-md items-center"
                            >
                              <span className="mr-2 text-lg">
                                {getMoodEmoji(entry.mood)}
                              </span>
                              {entry.mood}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-700">
                            {entry.reason}
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {getTimeOfDayLabel(entry.timeOfDay)}
                            {/* {entry.timeOfDay} */}
                          </td>
                          <td className="p-3 text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;







// {
//   "short_name": "React App",
//   "name": "Create React App Sample",
//   "icons": [
//     {
//       "src": "favicon.ico",
//       "sizes": "64x64 32x32 24x24 16x16",
//       "type": "image/x-icon"
//     }
//   ],
//   "start_url": ".",
//   "display": "standalone",
//   "theme_color": "#000000",
//   "background_color": "#ffffff"
// }