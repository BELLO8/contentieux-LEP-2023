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

  const dataTimeLine = [];
  timeLine.map((item) => {
    dataTimeLine.push({
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
        : item.lib_etape === "Ouverture bureau de vote"
        ? "Ouvert"
        : "Encours",
      comment: item.commentaire
        ? item.commentaire
        : "Aucun commentaire sur l'étape",
      // customContent: (
      //   <div className="d-flex align-items-center">
      //     {item.lib_etape === "Ouverture bureau de vote" ? (
      //       ""
      //     ) : (
      //       <Button className="btn-sm" color="primary" outline>
      //         Voir les details de l'étape
      //       </Button>
      //     )}
      //   </div>
      // ),
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          Chronologie des activités dans le bureau de vote
        </CardTitle>
      </CardHeader>
      <CardBody className="pt-1">
        {!isEmptyObject(dataTimeLine) ? (
          <Timeline data={dataTimeLine} className="ms-50" />
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
