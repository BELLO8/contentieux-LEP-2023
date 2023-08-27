/* eslint-disable */
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody } from "reactstrap";
import { getUserData } from "../../utility/Utils";
import "chartjs-plugin-datalabels";

const HorizontalBarChart = ({ candidat, candidatData }) => {
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: { top: -4 },
    },
    scales: {
      y: {
        min: 0,
        grid: {
          drawTicks: false,
          borderColor: "transparent",
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "white",
      },
    },
  };

  // ** Chart Data
  const data = {
    labels: candidat,
    datasets: [
      {
        label: 'VAINQUEUR '+getUserData()?.lib_type_election,
        backgroundColor: [
          "#1058d2",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#dddddd",
        ],
        borderColor: "transparent",
        data: candidatData,
      },
    ],
  };

  return (
    <Card className="shadow-none round">
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        {/* <div>
          <CardSubtitle className="text-muted mb-25">Balance</CardSubtitle>
          <CardTitle tag="h4">$74,123</CardTitle>
        </div> */}
      </CardHeader>
      <CardBody>
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};

export default HorizontalBarChart;
