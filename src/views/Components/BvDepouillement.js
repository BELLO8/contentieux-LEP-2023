/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText, Progress } from "reactstrap";
import { Archive } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getElecteurByBv, getElecteurVotant } from "../../redux/store/Election";

const Bv = ({ idbv, bv }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card className=''>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>
              {bv}
            </h6>
            <div className="d-flex align-items-center mt-3 mb-2">
              <Avatar
                color="light-primary"
                icon={<Archive size={14} />}
                className="me-2"
              />
              <div className="my-auto">
                <h4 className="fw-bolder mb-0">0</h4>
                <CardText className="font-small-3 mb-0">Bulletin(s) valide(s)</CardText>
              </div>
              <div className="mx-3">
                <h4 className="fw-bolder mb-0">0</h4>
                <CardText className="font-small-3 mb-0">Bulletin(s) blanc(s)</CardText>
              </div>
              {/* <div>
                <span>
                  Taux de participation… <b> </b>
                </span>
                <Progress animated className="progress-bar-info" value={taux} />
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
                  // dispatch(getElecteurByBv({ bv: idbv }));
                  navigate(`/depouillement/depouillement-par-bv/${idbv}`);
                  
                }}
              >
                Details
              </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Bv;
