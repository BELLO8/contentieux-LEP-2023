/* eslint-disable */

import {
  Badge,
  Button,
  Card, CardText,
  Col,
  Progress,
  Row
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTimeLineByBv
} from "../../redux/store/Election";
import ModalForm from "./ModalForm";

const BureauVote = ({
  idbv,
  bv,
  lv,
  idlv,
  etape,
  nbrRep,
  inscrit,
  votants,
  route
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taux = votants === 0 ? 0 : (Number(votants) * 100) / Number(inscrit);

  return (
    <Card className="rounded mb-1">
      <div>
        <div className=" ">
          <div>
            <div className="border">
              <Row className=" d-flex justify-content-between align-items-center">
                <Col lg="8">
                  <div style={{ minWidth: "310px", marginLeft: "8px" }}>
                    <b style={{ minWidth: "10px", color: "#000000" }}>{lv}</b>
                  </div>
                  <Badge
                    style={{ marginLeft: "8px" }}
                    color={etape != "Pas debuté" ? "success" : "dark"}
                  >
                    Etape : {etape}
                  </Badge>
                </Col>
                <Col lg="4">
                  <div
                    className="border"
                    style={{
                      fontWeight: "bold",
                      color: "#000000",
                      padding: "10px",
                    }}
                  >
                    {bv}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="d-flex align-items-center mt-1">
              <div className="mx-1">
                <ModalForm idbv={idbv} idlv={idlv} rep={nbrRep} />
              </div>
              <div className="my-auto">
                <h4
                  className="mb-0"
                  style={{ fontWeight: "bold", color: "#183f98" }}
                >
                  {inscrit}
                </h4>
                <CardText
                  className="font-small-3 mb-0"
                  style={{ fontWeight: "bold", color: "#183f98" }}
                >
                  Inscrits
                </CardText>
              </div>
              <div className="mx-3">
                <h4 className="fw-bolder mb-0 text-success">{votants}</h4>
                <CardText
                  className="font-small-3 text-success mb-0"
                  style={{ fontWeight: "bold" }}
                >
                  Votants
                </CardText>
              </div>
            </div>
            <div className="border">
              <Row className=" d-flex justify-content-between align-items-center">
                <Col lg="8" sm="8">
                  <div className="px-1">
                    <span>
                      Taux de participations{" "}
                      <b className="text-danger">
                        {parseFloat(taux).toFixed(2)}%
                      </b>
                    </span>
                    <Progress
                      animated
                      className="progress-bar-info"
                      value={taux}
                    />
                  </div>
                </Col>
                <Col lg="4" sm="4">
                  <div className="border" style={{ padding: "10px" }}>
                    <Button
                      color="flat-secondary"
                      size="sm"
                      onClick={() => {
                        dispatch(getTimeLineByBv({ bv: idbv }));
                        navigate(route);
                      }}
                    >
                      <b style={{ color: "#183f98" }}>Détails</b>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BureauVote;
