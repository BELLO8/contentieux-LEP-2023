/* eslint-disable */
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../utility/Utils";
import { getResult } from "../../redux/store/Election";
import { useEffect } from "react";

const ChartjsHorizontalBarChart = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.election.resultat);
  const user = getUserData();

  const candidatData = [];
  const candidat = [];

  result.map((item) => {
    candidatData.push(item.total_voix);
    candidat.push(item.nom);
  });

  useEffect(() => {
    dispatch(
      getResult({
        id_circons: user?.id_circons,
        id_parti: user?.id_parti,
        type: user?.id_type_election,
      })
    );
  }, [dispatch]);

  const options = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: { top: -4 },
    },
    scales: {
      x: {
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
      legend: {
        display: false,
      },
    },
  };

  // ** Chart Data
  const data = {
    labels: candidat,
    datasets: [
      {
        label: user?.lib_type_election,
        backgroundColor: [
          "rgba(255, 99, 132,0.7)",
          "rgba(255, 159, 64,0.7)",
          "rgba(255, 205, 86,0.7)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
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

export default ChartjsHorizontalBarChart;
