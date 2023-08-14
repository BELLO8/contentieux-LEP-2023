/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Progress,
  Row,
} from "reactstrap";
import { Archive, Plus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getElecteurByBv,
  getElecteurVotant,
  getTimeLineByBv,
} from "../../redux/store/Election";
import ModalForm from "./ModalForm";

const BureauVote = ({ idbv, bv, lv, idlv, etape, nbrRep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
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
                    {bv}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="d-flex align-items-center mt-1 px-1">
              <div className="my-auto">
                <p>
                  <ModalForm idbv={idbv} idlv={idlv} rep={nbrRep} />
                </p>
              </div>
            </div>
            <div className="border">
              <Row className=" d-flex justify-content-between align-items-center">
                <Col lg="8" sm="8">
                  <div className="px-1">
                    <Badge
                      color={
                        etape != "Pas encore debuté" ? "success" : "secondary"
                      }
                    >
                      Etape : {etape}
                    </Badge>{" "}
                  </div>
                </Col>
                <Col lg="4" sm="4">
                  <div className="border" style={{ padding: "10px" }}>
                    <Button
                      color="flat-secondary"
                      size="sm"
                      onClick={() => {
                        dispatch(getTimeLineByBv({ bv: idbv }));
                        navigate(`/bureau-vote/deroulement/${idlv}/${idbv}`);
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
  );
};

export default BureauVote;
