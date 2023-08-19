/* eslint-disable*/
import Timeline from "@components/timeline";
import { isEmptyObject } from "jquery";
import { useSelector } from "react-redux";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Badge,
} from "reactstrap";

const BVTimeline = () => {
  const timeLine = useSelector((state) => state.election.timeLine);
  const bvConform = useSelector((state) => state.election.listBvConforme);

  const verifData = [];
  const dataTimeLine = [];

  bvConform.map((item) => {
    verifData.push({
      id: item.id_bureau_vote,
      materiels: item.materiels,
    });
  });

  timeLine.map((item) => {
    dataTimeLine.push({
      id: item.id_bureau_vote,
      title: item.lib_etape,
      content:
        "Date et heure de debut le : " +
        new Date(item.started_at).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      status: item.end_at
        ? "Date et heure de fin le " +
          new Date(item.started_at).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : item.lib_etape === "Ouverture du bureau de vote"
        ? "Ouvert"
        : "Encours",
      comment: item.commentaire
        ? item.commentaire
        : "Aucun commentaire sur l'étape",
    });
  });

  let dataLine = dataTimeLine.map((item) => {
    let materiels = verifData.find((materiels) => materiels.id == item.id);
    if (item.title === "Vérification du matériel électoral") {
      return { ...item, ...materiels };
    } else {
      return { ...item };
    }
  });

  console.log(dataLine);
  return (
    <Card className="shadow-none round">
      <CardHeader>
        <CardTitle tag="h4">
          Etapes du scrutin
        </CardTitle>
      </CardHeader>
      <CardBody className="pt-1">
        {!isEmptyObject(dataLine) ? (
          <Timeline data={dataLine} className="ms-50" />
        ) : (
          <h6>
            <Badge color="danger">Pas encore debuté</Badge>
          </h6>
        )}
      </CardBody>
    </Card>
  );
};

export default BVTimeline;
