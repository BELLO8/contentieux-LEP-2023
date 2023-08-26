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
import { useDispatch } from "react-redux";
import { getCandidats } from "../../redux/store/Election";

const DepouillementBV = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCandidats());
  }, [dispatch]);
  return (
    <>
      <Row>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<File size={21} />}
            color="success"
            stats="0"
            statTitle="Bulletin blanc"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats="0"
            statTitle="Bulletin null"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats=""
            statTitle="Suffrage exprime"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats="0"
            statTitle="Nombres inscrits"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats="0"
            statTitle="Nombres votants"
          />
        </Col>
        <Col lg="4" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats="0"
            statTitle="Taux de participation"
          />
        </Col>
      </Row>
    </>
  );
};

export default DepouillementBV;
