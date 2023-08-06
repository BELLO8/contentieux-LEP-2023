/* eslint-disable */

import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { useState } from "react";
import StatsHorizontal from "../Components/StatsHorizontal";
import {
  AlertOctagon,
  Archive,
  ChevronDown,
  Percent,
  Users,
} from "react-feather";
import { CardHeader, Col, Row, CardTitle, Button } from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBureauVote,
  getLieuxVote,
  nombreElecteurBv,
  nombreVotant,
  tauxParticipation,
  vote,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { votants } from "../Components/columns";
import { Link } from "react-router-dom";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

export default function Vote() {
  const dispatch = useDispatch();
  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const taux = useSelector((state) => state.election.taux);
  const data = useSelector((state) => state.election.votants);
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
    socket.on("insertedvote", (data) => {
      console.log(JSON.parse(data));
      dispatch(vote(JSON.parse(data)));
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
                    id_type: user?.id_type_election,
                    id_parti: user?.id_parti,
                  })
                );

                dispatch(
                  tauxParticipation({
                    id_bv: event.value,
                    id_type: user?.id_type_election,
                    id_parti: user?.id_parti,
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
            stats={nbreElectBv}
            statTitle="Electeur inscrit"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Archive size={21} />}
            color="success"
            stats={nbrevotant}
            statTitle="Votant"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Percent size={21} />}
            color="danger"
            stats={taux + "%"}
            statTitle="Taux de participation"
          />
        </Col>
      </Row>

      <Card className="overflow-hidden mt-2">
        <CardHeader>
          <CardTitle>Vote en temps réel <Button color="primary" className="btn-sm" tag={Link} to='/vote/Liste-votants'>Voir la liste des votants</Button></CardTitle>
        </CardHeader>
        <div className="react-dataTable" id="electeur">
          <DataTable
            pagination
            responsive
            noDataComponent="aucune données pour le moment"
            columns={votants}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100]}
            data={data}
          />
        </div>
      </Card>
    </>
  );
}
