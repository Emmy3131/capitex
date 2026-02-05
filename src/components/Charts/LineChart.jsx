import Chart from "react-apexcharts";

const LineChart = ({ categories = [], series = [] }) => {
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height="100%"
    />
  );
};

export default LineChart;
