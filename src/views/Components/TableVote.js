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
import { CardHeader, Col, Row, CardTitle } from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBureauVote,
  getElecteurVotant,
  getLieuxVote,
  nombreElecteurBv,
  nombreVotant,
  tauxParticipation,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { votants } from "../Components/columns";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

export default function TableVote() {
  const dispatch = useDispatch();
  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const data = useSelector((state) => state.election.votants);

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
                dispatch(
                  getElecteurVotant({
                    id_bv: event.value,
                    id_type: user?.id_type_election,
                    parti: user?.id_parti
                  })
                );
              }}
            />
          </div>
        </Col>
      </Row>

      <Card className="overflow-hidden mt-2">
        <div className="react-dataTable" id="electeur">
          <DataTable
            pagination
            responsive
            noDataComponent="aucune données pour le moment"
            columns={votants}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6]}
            data={data}
          />
        </div>
      </Card>
    </>
  );
}
