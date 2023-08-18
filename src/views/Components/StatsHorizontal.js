/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  CardText,
  Progress,
} from "reactstrap";
import { Archive } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getElecteurByBv, getElecteurVotant } from "../../redux/store/Election";

const StatsHorizontal = ({ idbv, bv, lv, inscrit, votants }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taux = votants === 0 ? 0 : (Number(votants) * 100) / Number(inscrit);
  return (
    <>
      <div className="bg-white shadow rounded mb-1">
        <div>
          <div className=" ">
            <div>
              <div className="border">
                <Row className=" d-flex justify-content-between align-items-center">
                  <Col lg="6">
                    <div className="px-1">{lv}</div>
                  </Col>
                  <Col lg="4">
                    <div className="border" style={{ padding: "10px" }}>
                      Bv : {bv}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="d-flex align-items-center mt-1 px-1">
                <div className="my-auto">
                  <div className="d-flex align-items-center mb-2">
                    <div className="my-auto">
                      <h4 className="fw-bolder mb-0 text-info">{inscrit}</h4>
                      <CardText className="font-small-3 mb-0">
                        Inscrits
                      </CardText>
                    </div>
                    <div className="mx-3">
                      <h4 className="fw-bolder mb-0 text-success">{votants}</h4>
                      <CardText className="font-small-3 mb-0">
                        Votants
                      </CardText>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border">
                <Row className=" d-flex justify-content-between align-items-center">
                  <Col lg="8" sm="8">
                    <div className="px-1">
                      <span>
                        Taux de participations… <b className="text-danger">{parseInt(taux)}%</b>
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
                          dispatch(getElecteurByBv({ bv: idbv }));
                          navigate(`/vote/liste-votants/${idbv}`);
                        }}
                      >
                        Detail
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsHorizontal;
