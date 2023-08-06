/* eslint-disable */

import Avatar from "@components/avatar";
import { useEffect } from "react";
import { Check } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
import { io } from "socket.io-client";
import { voice } from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { useState } from "react";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

const Candidat = () => {
  const dispatch = useDispatch();
  const listCandidat = useSelector((state) => state.election.candidats);
  const voix = useSelector((state) => state.election.voix);
  const lastVoice = [];
  const listCandidatData = [];

  listCandidat.map((item) => {
    listCandidatData.push(item);
  });
  
  useEffect(() => {
    socket.on("insertedvoix", (data) => {
      console.log(data);
      dispatch(voice(data));
    });
  }, [dispatch, socket]);

  const renderCandidatList = () => {
    return listCandidatData.map((item) => (
      <Col lg="3" sm="6">
        <Card>
          <CardBody>
            <div className="d-flex align-items-center flex-column">
              <Avatar
                color="light-primary"
                content={item.nom}
                initials
                size="xl"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info mt-2">
                  <h4>{item.nom}</h4>
                  <Badge color="primary">
                    {getUserData().lib_type_election}
                  </Badge>
                </div>
                <div className="d-flex align-items-start me-2 m-2">
                  <Badge color="light-primary" className="rounded p-75">
                    <Check className="font-medium-2" />
                  </Badge>

                  <div className="ms-75">
                    <h4 className="mb-0">
                      {voix.id_candidat === item.id ? voix.nombre_voix : ""}
                    </h4>
                    <small>Voix obtenue</small>
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
        <h3 className="mb-3">Comptage de voix</h3>
        {renderCandidatList()}
      </Row>
    </>
  );
};

export default Candidat;
