/* eslint-disable */

import Avatar from "@components/avatar";
import { useEffect } from "react";
import { Check, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
import { voice } from "../../redux/store/Election";
import { isEmptyObject } from "jquery";
import { getCandidats, getUserData } from "../../utility/Utils";
import { io } from "socket.io-client";
import img1 from "@src/assets/images/portrait/small/1.png";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app", {
  transports: ["websocket"],
});

const Candidat = () => {
  const dispatch = useDispatch();
  const listCandidat = !isEmptyObject(
    useSelector((state) => state.election.candidats)
  )
    ? useSelector((state) => state.election.candidats)
    : getCandidats();
  const voix = useSelector((state) => state.election.voix);
  const resultat = useSelector((state) => state.election.resultat);

  const listCandidatData = [];
  const user = getUserData();
  resultat.map((item) => {
    listCandidatData.push(item);
  });

  if (isEmptyObject(resultat)) {
    listCandidat.map((item) => {
      listCandidatData.push(item);
    });
  }

  useEffect(() => {
    socket.on(`insertedvoix-${user.id_parti + user.id_circons}`, (data) => {
      console.log(data);
      dispatch(voice(data));
    });
  }, [dispatch, socket]);

  const renderCandidatList = () => {
    return listCandidatData
      .sort((a, b) => Number(b.total_voix) - Number(a.total_voix))
      .map((item) => (
        <Col lg="2" sm="6">
          <Card
            className="shadow-none"
            style={{ width: "200px", minHeight: "285px" }}
          >
            <img
              className="img-fluid m-1"
              src={img1}
              style={{ height: "160px" }}
              alt="Card cap"
            />
            {/* <CardImg top src={img1} alt='Card cap' /> */}
            <div
              className="d-flex flex-column align-items-center text-center"
              style={{ minHeight: "52px" }}
            >
              <p>
                <b>{item.nom}</b>
              </p>
            </div>
            <div style={{ height: "12px" }}></div>
            <div className=" d-flex align-items-center flex-column text-white bg-danger">
              <b>{item.lib_parti}</b>
            </div>
            <div className="d-flex align-items-center flex-column">
              <h2 className="mt-1 mb-1">
                {isEmptyObject(voix)
                  ? item.total_voix
                  : voix.id_candidat === item.id
                  ? voix.nombre_voix
                  : item.total_voix}
              </h2>
            </div>
          </Card>
        </Col>
      ));
  };

  return (
    <>
      <Row className="mt-5">
        <h5 className="mb-1">
          Candidats
          {/*  <Button className="btn-sm" color="primary" tag={Link} to="/resultat">Afficher les résultats</Button> */}
        </h5>
        {renderCandidatList()}
      </Row>
    </>
  );
};

export default Candidat;
