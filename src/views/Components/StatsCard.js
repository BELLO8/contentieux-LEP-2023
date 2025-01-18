/* eslint-disable */
import {
  Archive,
  CheckCircle,
  MapPin,
  Percent,
  User,
  Users
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { nombreVotantGlobal } from "../../redux/store/Election";
import { nombreRepresentant } from "../../redux/store/Representant";
import {
  getNombreBV,
  getUserData
} from "../../utility/Utils";

const StatsCard = () => {
  const dispatch = useDispatch();
  const user = getUserData();
  const nbreRep = useSelector((state) => state.representant.nombreRepresentant);
  const nbreBV = useSelector((state) => state.election.nbrBv);
  const nbreLV = useSelector((state) => state.election.nbrLv);
  const votant = useSelector((state) => state.election.nombreVotantGlobal);
  const inscrit = useSelector((state) => state.election.nombreElecteur);

  useEffect(() => {
    dispatch(nombreRepresentant(user.id_candidat));
    dispatch(nombreVotantGlobal());
  }, [dispatch]);

  const data = [
    {
      title: getNombreBV()[0]?.valeur,
      subtitle: "Lieux de vote",
      color: "light-primary",
      icon: <MapPin size={18} />,
    },
    {
      title: getNombreBV()[1]?.valeur,
      subtitle: "Bureaux de vote",
      color: "light-info",
      icon: <Archive size={18} />,
    },
    {
      title: nbreRep,
      subtitle: "Représentants",
      color: "light-danger",
      icon: <Users size={18} />,
    },
    {
      title: getNombreBV()[2]?.valeur,
      subtitle: "Nombre d'inscrits",
      color: "light-success",
      icon: <User size={18} />,
    },
    {
      title: votant[0]?.total_votant ?? 0,
      subtitle: "Nombre de votants",
      color: "light-success",
      icon: <CheckCircle size={18} />,
    },
    {
      title:
        parseFloat(
          (Number(votant[0]?.total_votant ?? 0) * 100) /
          Number(
            getNombreBV()[2]?.valeur
          )
        ).toFixed(2) + " %",
      subtitle: "Taux de participations",
      color: "light-success",
      icon: <Percent size={18} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      return (
        <Col key={index} lg="2" className="">
          <Card className="shadow-none round">
            <CardBody>
              <div className="d-flex align-items-center">
                <Avatar color={item.color} icon={item.icon} className="me-2" />
                <div className="my-auto">
                  <h3 className="fw-bolder mb-0">{item.title}</h3>
                  <h6 className="fw-bolder mb-0" style={{ fontSize: 11 }}>
                    {item.subtitle}
                  </h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <h4 style={{ fontWeight: "bold" }} tag="h4">
        {" "}
        Données générales
      </h4>
      <Row>{renderData()}</Row>
    </>
  );
};

export default StatsCard;
