/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from "reactstrap";
import { User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { isEmptyObject } from "jquery";
import CandidatVoice from "./CardTransactions";

const Bv = ({ idbv, bv, lv }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCandidat = useSelector((state) => state.election.candidats);
  const candidatVoice = useSelector((state) => state.election.CandidatsVoice);

  let data = candidatVoice.filter(function (params) {
    return params.id_bv === idbv;
  });

  if (isEmptyObject(data)) {
    data = listCandidat;
  } else {
    data = data.sort((a, b) => b.nombre_voix - a.nombre_voix);
  }

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
              <div className="my-auto">
                <CandidatVoice data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bv;
