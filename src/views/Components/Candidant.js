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

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app", {
  transports: ["websocket"],
});

const Candidat = () => {
  const dispatch = useDispatch();
  const listCandidat = useSelector((state) => state.election.candidats);
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

  if(isEmptyObject(listCandidat)){
    getCandidats()?.map((item) => {
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
        <Col lg="3" sm="6">
          <Card className="shadow-none round">
            <CardBody>
              <div className="d-flex align-items-center flex-column">
                <Avatar
                  color="light-primary"
                  icon={<User size={14} />}
                  size="xl"
                />
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info mt-2">
                    <h5>{item.nom}</h5>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="ms-75">
                      <h2 className="mb-0">
                        {isEmptyObject(voix)
                          ? item.total_voix
                          : voix.id_candidat === item.id
                          ? voix.nombre_voix
                          : item.total_voix}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ));
  };

  return (
    <>
      <Row className="mt-5">
        <h5 className="mb-1">
          Les candidats à l'élection
          {/*  <Button className="btn-sm" color="primary" tag={Link} to="/resultat">Afficher les résultats</Button> */}
        </h5>
        {renderCandidatList()}
      </Row>
    </>
  );
};

export default Candidat;
