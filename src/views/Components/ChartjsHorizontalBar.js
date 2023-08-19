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

  console.log(candidatData);
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
    indexAxis: "y",
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
          "#1058d2",
          "#cccccc",
          "#cccccc",
          "#cccccc",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#dddddd",
          "#000000",
        ],
        borderColor: "transparent",
        data: candidatData.sort((a, b) => b - a),
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
