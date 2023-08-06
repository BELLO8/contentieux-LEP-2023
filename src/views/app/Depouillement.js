/* eslint-disable */

import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { io } from "socket.io-client";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getBureauVote,
  getCandidats,
  getLieuxVote,
  nombreElecteurBv,
  nombreVotant,
  voice,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import Candidat from "../Components/Candidant";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

export default function Depouillement() {
  const dispatch = useDispatch();

  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const nbreElectBv = useSelector(
    (state) => state.election.nbreElectBv.population
  );
  const nbrevotant = useSelector((state) => state.election.nbrVotant.data);

  const lieuxVoteData = [];
  const bureauVoteData = [];

  lieuxVote.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  bureauVote.map((item) => {
    bureauVoteData.push({ value: item.cod_bv, label: item.lib_bv });
  });
  const user = getUserData();

  useEffect(() => {
    socket.on("insertedvoix", (data) => {
      console.log(data);
      dispatch(voice(data));
    });

    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch, socket]);

  return (
    <>
      <Row>
        <Col lg="6" sm="6">
          <div className="mb-1">
            <Label className="form-label" for="type-elec">
              Selectionner un lieu de vote
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id="type-election"
              className="react-select"
              classNamePrefix="select"
              options={lieuxVoteData}
              onChange={(event) => {
                setLieuxVote(event.value);
                dispatch(getBureauVote(event.value));
              }}
            />
          </div>
        </Col>
        <Col lg="6" sm="6">
          <div className="mb-1">
            <Label className="form-label" for="type-elec">
              Selectionner un bureau de vote
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id="type-election"
              className="react-select"
              classNamePrefix="select"
              options={bureauVoteData}
              onChange={(event) => {
                setBureauVote(event.value);
                dispatch(nombreElecteurBv(event.value));
                dispatch(
                  nombreVotant({
                    id_bv: event.value,
                    id_type: user.id_type_election,
                    id_parti: user.id_parti,
                  })
                );
                dispatch(
                  getCandidats({
                    bv: event.value,
                    type: user?.id_type_election,
                  })
                );
              }}
            />
          </div>
        </Col>
        <Candidat />
      </Row>
    </>
  );
}
