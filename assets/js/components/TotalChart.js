import React from "react";
import Chart from "react-apexcharts";

export default function TotalChart() {
  const [state, setState] = React.useState({
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        offsetX: 300
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      yaxis: {
        title: {
          text: "Nariai"
        }
      },
      fill: {
        opacity: 1
      }
    },
    series: [
      {
        name: "Nauji nariai",
        data: [2, 5, 15, 10, 0, 0, 1, 2, 5, 10, 0, 10]
      },
      {
        name: "Aktyvus nariai",
        data: [32, 35, 38, 36, 35, 34, 31, 33, 38, 45, 47, 42]
      },
      {
        name: "Neaktyvus nariai",
        data: [0, 0, 3, 6, 3, 10, 5, 4, 3, 0, 0, 3]
      }
    ]
  });

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height="350"
      />
    </div>
  );
}
