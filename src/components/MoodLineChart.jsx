import React from "react";
import ReactECharts from "echarts-for-react";

const MoodLineChart = ({ moodData }) => {
  const option = {
    xAxis: {
      type: "category",
      data: moodData.map((m) => m.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: moodData.map((m) => m.score),
        type: "line",
        smooth: true,
        color: "#00BFFF",
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 250 }} />;
};

export default MoodLineChart;
