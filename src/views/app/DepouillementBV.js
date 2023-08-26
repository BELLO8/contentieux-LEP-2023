/* eslint-disable */

import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import {
  Activity,
  Copy,
  Cpu,
  File,
  FileMinus,
  FileText,
  Server,
} from "react-feather";
import { Row, Col } from "reactstrap";
import Candidat from "../Components/Candidant";
import { useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidats,
  getResult,
  nombreVotantGlobal,
} from "../../redux/store/Election";
import { getNombreElecteur, getUserData } from "../../utility/Utils";

const DepouillementBV = () => {
  const result = useSelector((state) => state.election.resultat);
  const user = getUserData();
  const dispatch = useDispatch();
  const votant = useSelector((state) => state.election.nombreVotantGlobal);

  const candidatData = [];
  const candidat = [];

  const resultatData = [];
  result?.map((item) => {
    resultatData.push(item);
  });

  useEffect(() => {
    dispatch(nombreVotantGlobal());
    dispatch(
      getResult({
        id_circons: user?.id_circons,
        id_parti: user?.id_parti,
        type: user?.id_type_election,
      })
    );
  }, [dispatch]);
  return (
    <>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats={getNombreElecteur().nombre}
            statTitle="Nombre inscrits"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats={votant[0]?.total_votant}
            statTitle="Nombre votants"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats={
              parseFloat(
                (Number(votant[0]?.total_votant) * 100) /
                  Number(getNombreElecteur()?.nombre)
              ).toFixed(2) + " %"
            }
            statTitle="Taux de participation"
          />
        </Col>

        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<File size={21} />}
            color="success"
            stats={
              resultatData?.filter(function (param) {
                return param.id_candidat === "-1";
              })[0]?.total_voix
            }
            statTitle="Bulletins blancs"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats={
              resultatData?.filter(function (param) {
                return param.id_candidat === "-2";
              })[0]?.total_voix
            }
            statTitle="Bulletins nuls"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats={
              Number(votant[0]?.total_votant) -
              Number(
                resultatData?.filter(function (param) {
                  return param.id_candidat === "-2";
                })[0]?.total_voix
              ) -
              Number(
                resultatData?.filter(function (param) {
                  return param.id_candidat === "-1";
                })[0]?.total_voix
              )
            }
            statTitle="Suffrage exprimé"
          />
        </Col>
      </Row>
    </>
  );
};

export default DepouillementBV;
