/*eslint-disable */

import Timeline from "@components/timeline";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Timeline Data
import CustomTimeline from "./Customtimeline";
import { useSelector } from "react-redux";

const BasicTimeline = () => {
  const etape = useSelector((state) => state.election.etape);
  const statusEtape = useSelector(
    (state) => state.election.NombreEtapeEnCoursEtTermineByCircons
  );

  const nbreBV = useSelector((state) => state.election.nbrBv);
  const statusData = [];
  const color = [
    {
      id: "1",
      color: "danger",
    },
    {
      id: "2",
      color: "primary",
    },
    {
      id: "3",
      color: "info",
    },
    {
      id: "5",
      color: "warning",
    },
    {
      id: "6",
      color: "success",
    },
  ];
  statusEtape.map((item) => {
    statusData.push({
      id: item.id_etape_election,
      nombre_en_cours: item.nombre_bv_en_cours,
      nombre_bv_termine: item.nombre_bv_termine,
    });
  });

  let data = etape
    .map((item) => {
      let nombre = statusData.find((nbr) => nbr.id === item.id);
      let couleurs = color.find((couleur) => couleur.id === item.id);
      return { ...item, ...nombre, ...couleurs };
    })
    .sort((a, b) => a.id - b.id)
    .filter(function (param) {
      return (
        param.id == 1 ||
        param.id == 2 ||
        param.id == 3 ||
        param.id == 5 ||
        param.id == 6
      );
    });

  //console.log(data);

  return (
    <Card className="p-1 shadow-none round">
      <h5 className="mb-3" style={{ fontWeight: "bold" }}>
        Chronologie globale du déroulement de l'élection
      </h5>
      <CustomTimeline data={data} />
    </Card>
  );
};

export default BasicTimeline;
