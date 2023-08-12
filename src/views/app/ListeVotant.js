/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getElecteurByBv, getElecteurVotant } from "../../redux/store/Election";
import TableVote from "../Components/TableVote";
import DataTable from "react-data-table-component";
import { votants } from "../Components/columns";
import { ChevronDown } from "react-feather";

const ListeVotant = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getElecteurByBv({ bv: params.idbv }));
    dispatch(getElecteurVotant({ id_bv: params.idbv }));
  }, [dispatch]);

  const listeVotants = useSelector((state) => state.election.Listvotants);
  const electeurBv = useSelector((state) => state.election.electeurBv.data);
  const electeurData = [];
  const votantData = [];
  electeurBv?.map((electeur) => {
    electeurData.push(electeur);
  });

  listeVotants?.map((electeur) => {
    votantData.push(electeur);
  });

  let data = electeurData?.map((electeur) => {
    votantData.map((item) => {
      if (item.num_electeur === electeur.num_electeur) {
        electeur.statusVote = "voté";
      } else {
        Object.preventExtensions(electeur)
        Object.defineProperty(electeur, "statusVote", {
          value: "en attente",
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    });
    return electeur;
  });

  console.log(data);

  return (
    <>
      <div className="react-dataTable" id="electeur">
        Liste votant (à revoir)
        {/* <DataTable
          pagination
          responsive
          noDataComponent="aucune données pour le moment"
          columns={votants}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationPerPage={100}
          paginationRowsPerPageOptions={[6, 10, 25, 50, 75, 100]}
          data={data}
        /> */}
      </div>
    </>
  );
};

export default ListeVotant;
