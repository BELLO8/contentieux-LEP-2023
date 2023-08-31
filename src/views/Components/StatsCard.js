/* eslint-disable */
import classnames from "classnames";
import {
  TrendingUp,
  User,
  Box,
  DollarSign,
  UserPlus,
  Users,
  Percent,
  Archive,
  MapPin,
  Check,
  CheckCircle,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { nombreRepresentant } from "../../redux/store/Representant";
import {
  getNombreBV,
  getNombreElecteur,
  getNombreLV,
  getUserData,
} from "../../utility/Utils";
import {
  nombreBV,
  nombreElecteur,
  nombreLV,
  nombreVotant,
  nombreVotantGlobal,
} from "../../redux/store/Election";
import { isEmptyObject } from "jquery";

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
      title: !isEmptyObject(nbreLV) ? nbreLV : getNombreLV(),
      subtitle: "Lieux de vote",
      color: "light-primary",
      icon: <MapPin size={18} />,
    },
    {
      title: !isEmptyObject(nbreBV) ? nbreBV : getNombreBV(),
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
      title: inscrit?.nombre ? inscrit?.nombre : getNombreElecteur()?.nombre,
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
              inscrit?.nombre ? inscrit?.nombre : getNombreElecteur()?.nombre
            )
        ).toFixed(2) + " %",
      subtitle: "Taux de participations",
      color: "light-success",
      icon: <Percent size={18} />,
    },
  ];

  const renderData = () => {
    return data.map((item,index) => {
      return (
        <Col key={index} lg="4" className="">
          <Card className="shadow-none round" style={{ minWidth: "220px" }}>
            <CardBody>
              <div className="d-flex align-items-center">
                <Avatar color={item.color} icon={item.icon} className="me-2" />
                <div className="my-auto">
                  <h1 className="fw-bolder mb-0">{item.title}</h1>
                  <h6 className="fw-bolder mb-0">
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
