import React from "react";
import ReactECharts from "echarts-for-react";

const MoodBarChart = ({ moodData }) => {
  const option = {
    xAxis: { type: "category", data: moodData.map((m) => m.date) },
    yAxis: { type: "value" },
    series: [
      {
        name: "Morning Mood",
        type: "bar",
        data: moodData.map((m) => m.morning),
        color: "#00BFFF",
      },
      {
        name: "Night Mood",
        type: "bar",
        data: moodData.map((m) => m.night),
        color: "#FF4500",
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 250 }} />;
};

export default MoodBarChart;
