/* eslint-disable */

import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { ChevronDown } from "react-feather";
import { CardText, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getElecteurVotant, vote } from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { columns, votants, votantsElect } from "./columns";
import { useState } from "react";
import { isEmptyObject } from "jquery";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app", {
  transports: ["websocket"],
});

export default function RealTimeVoteList() {
  const dispatch = useDispatch();
  const user = getUserData();
  const listeVotants = useSelector((state) => state.election.votants);
  // const [pending, setPending] = useState(true);

  useEffect(() => {
    socket.on(`insertedvote-${user.id_candidat}`, (data) => {
      console.log(data);
      dispatch(vote(JSON.parse(data)));
    });
  }, [dispatch, socket]);

  const paginationComponentOptions = {
    rowsPerPageText: "Résultat par page",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  return (
    <>
      <Card className="overflow-hidden round mt-2 shadow-none">
        <CardText className="m-2">
          <h4>liste des votants en temps réel</h4>
        </CardText>
        <div className="mb-2 react-dataTable" id="electeur">
          <DataTable
            pagination
            paginationComponentOptions={paginationComponentOptions}
            responsive
            progressComponent={<Spinner color="primary" size="sm" />}
            noDataComponent={
              !isEmptyObject(listeVotants)
                ? "Veuillez patienter"
                : "Aucune données pour le moment"
            }
            columns={votants}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6, 10, 25, 50, 75, 100]}
            data={listeVotants}
          />
        </div>
      </Card>
    </>
  );
}
