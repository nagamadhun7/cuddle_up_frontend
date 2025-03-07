// import React from "react";
// import ReactECharts from "echarts-for-react";
// import * as echarts from "echarts";
// import "echarts-liquidfill";

// const MoodLiquidChart = ({ moodScore }) => {
//   // Convert mood score (0 to 100) into a fraction (0 to 1)
//   const moodPercentage = moodScore / 100;

//   const option = {
//     series: [
//       {
//         type: "liquidFill",
//         data: [moodPercentage, moodPercentage - 0.1], // Primary + secondary wave
//         radius: "80%",
//         label: {
//           fontSize: 24,
//           color: "#fff",
//           insideColor: "#000",
//           formatter: `${moodScore}%`,
//         },
//         outline: {
//           show: true,
//           borderDistance: 5,
//           itemStyle: {
//             borderColor: "#00BFFF",
//             borderWidth: 3,
//           },
//         },
//         backgroundStyle: {
//           color: "#E3F2FD",
//         },
//         waveAnimation: true,
//         color: moodPercentage > 0.6 ? ["#00BFFF"] : ["#FF4500"], // Blue for good, red for bad mood
//       },
//     ],
//   };

//   return <ReactECharts option={option} echarts={echarts} style={{ height: 250 }} />;
// };

// export default MoodLiquidChart;









import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-liquidfill";

const MoodLiquidChart = ({ moodScore, liquidColor = "#00BFFF" }) => {
  const moodPercentage = moodScore / 100;

  const option = {
    series: [
      {
        type: "liquidFill",
        data: [moodPercentage, moodPercentage - 0.1], // Two waves
        radius: "80%",
        label: {
          fontSize: 24,
          color: "#fff",
          insideColor: "#000",
          formatter: `${moodScore}%`,
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: liquidColor,
            borderWidth: 3,
          },
        },
        backgroundStyle: {
          color: "#E3F2FD",
        },
        waveAnimation: true,
        color: [liquidColor], // Dynamic color from Dashboard
      },
    ],
  };

  return <ReactECharts option={option} echarts={echarts} style={{ height: 250 }} />;
};

export default MoodLiquidChart;
