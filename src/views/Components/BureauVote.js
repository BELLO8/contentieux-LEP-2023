/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText, Progress } from "reactstrap";
import { Archive } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getElecteurByBv,
  getElecteurVotant,
  getTimeLineByBv,
} from "../../redux/store/Election";

const BureauVote = ({ idbv, bv, lv, idlv }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card className="">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>
              {lv} {bv}
            </h6>
            <div className="d-flex align-items-center mt-3 mb-2">
              <Avatar
                color="light-primary"
                icon={<Archive size={14} />}
                className="me-2"
              />
              <div className="my-auto">
                <h4 className="fw-bolder mb-0">0</h4>
                <CardText className="font-small-3 mb-0">
                  Répresentant(s)
                </CardText>
              </div>
              {/* <div className="mx-3">
                <h4 className="fw-bolder mb-0">0</h4>
                <CardText className="font-small-3 mb-0">Bulletin(s) blanc(s)</CardText>
              </div> */}
            </div>

            {/* <Badge color="primary"><h5 className="fw-bolder text-white mb-0">55,125%</h5></Badge> */}
          </div>

          <Button
            className="mx-3"
            color="primary"
            size="sm"
            outline
            onClick={() => {
              dispatch(getTimeLineByBv({ bv: idbv }));
              navigate(`/bureau-vote/deroulement/${idlv}/${idbv}`);
            }}
          >
            Voir plus
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BureauVote;
