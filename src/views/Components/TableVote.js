/* eslint-disable */

import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { ChevronDown } from "react-feather";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getElecteurVotant, getLieuxVote } from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { votants, votantsElect } from "../Components/columns";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

export default function TableVote({ idbv }) {
  const dispatch = useDispatch();
  const user = getUserData();
  const listeVotants = useSelector((state) => state.election.Listvotants);

  useEffect(() => {
    dispatch(getElecteurVotant({ id_bv: idbv }));
  }, [dispatch]);

  return (
    <>
      <Card className="overflow-hidden mt-2">
        <div className="react-dataTable" id="electeur">
          <DataTable
            pagination
            responsive
            progressComponent={<Spinner color="primary" size="sm" />}
            noDataComponent="aucune données pour le moment"
            columns={votantsElect}
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
