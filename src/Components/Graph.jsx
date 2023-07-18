import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData }) => {
  const { theme } = useTheme();
  return (
    <>
      <Line
        data={{
          labels: graphData.map((e) => e[0]),
          datasets: [
            {
              data: graphData.map((e) => e[1]),
              label: "WPM",
              borderWidth: 1,
              borderColor: theme.borderColor,
            },
          ],
        }}
      />
    </>
  );
};

export default Graph;
