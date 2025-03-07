import React from "react";
import ReactECharts from "echarts-for-react";

const MoodRadarChart = ({ moodData }) => {
  const emotionTypes = ["Happy", "Neutral", "Sad", "Angry", "Surprised"];
  const emotionCounts = emotionTypes.map(
    (type) => moodData.filter((m) => m.emotion === type).length
  );

  const option = {
    radar: {
      indicator: emotionTypes.map((name) => ({ name, max: 5 })),
    },
    series: [
      {
        type: "radar",
        data: [{ value: emotionCounts }],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 250 }} />;
};

export default MoodRadarChart;
