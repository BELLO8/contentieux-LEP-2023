/* eslint-disable */

import React, { useEffect } from "react";
import StatsHorizontal from "../Components/StatsHorizontal";
import { Activity, AlertOctagon, Archive, Cpu, Percent, Server, Users } from "react-feather";
import { Col, Row } from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Reactstrap Imports
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getBureauVote,
  getLieuxVote,
  nombreElecteurBv,
  nombreVotant,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";

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
    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch]);


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
              }}
            />
          </div>
        </Col>
        {/* Stats With Icons Horizontal */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Users size={21} />}
            color="primary"
            stats="786"
            statTitle="Electeur inscrit"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Archive size={21} />}
            color="success"
            stats="12"
            statTitle="Votant"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Percent size={21} />}
            color="danger"
            stats="0.1%"
            statTitle="Taux de participation"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<AlertOctagon size={21} />}
            color="warning"
            stats="13"
            statTitle="Bulletins nuls"
          />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>
    </>
  );
}
