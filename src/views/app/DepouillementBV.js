/* eslint-disable */

import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Activity, Copy, Cpu, File, FileMinus, FileText, Server } from "react-feather";
import { Row, Col } from "reactstrap";
import Candidat from "../Components/Candidant";
import { useEffect, React } from "react";
import { useDispatch } from "react-redux";
import { getCandidats } from "../../redux/store/Election";

const DepouillementBV = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCandidats())
  }, [dispatch]);
  return (
    <>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<FileText size={21} />}
            color="primary"
            stats="0"
            statTitle="Bulletin valide"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<File size={21} />}
            color="success"
            stats="0"
            statTitle="Bulletin blanc"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats="0"
            statTitle="Bulletin nul"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<FileMinus size={21} />}
            color="danger"
            stats=""
            statTitle="Suffrage exprime"
          />
        </Col>
      </Row>

      <Row>
        <Candidat />
      </Row>
    </>
  );
};

export default DepouillementBV;
