import React from "react";
import ReactECharts from "echarts-for-react";

const MoodPieChart = ({ moodData }) => {
  const emotionCounts = moodData.reduce((acc, { emotion }) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {});

  const option = {
    series: [
      {
        type: "pie",
        data: Object.keys(emotionCounts).map((key) => ({
          name: key,
          value: emotionCounts[key],
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 250 }} />;
};

export default MoodPieChart;
