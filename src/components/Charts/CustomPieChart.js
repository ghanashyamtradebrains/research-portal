import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Pie } from "react-chartjs-2";
function CustomPieChart({ data, options, plugins = null, height = 300 }) {
  return (
    <div style={{ height: "300px" }}>
      <Pie data={data} options={options} plugins={plugins} height={height} />
    </div>
  );
}

export default CustomPieChart;
