/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getElecteurByBv, getElecteurVotant, nombreElecteurByBvBYCircons } from "../../redux/store/Election";
import DataTable from "react-data-table-component";
import { votants } from "../Components/columns";
import { ChevronDown } from "react-feather";
import Breadcrumbs from "@components/breadcrumbs";
import { getUserData } from "../../utility/Utils";

const ListeVotant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const bv = useSelector((state) => state.election.nombreElecteurByBv);
  const navigate = useNavigate();

  let bvData = bv?.filter(function (id) {
    return id.id_bureau == params.idbv;
  });

  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
    dispatch(getElecteurByBv({ bv: params.idbv }));
    dispatch(getElecteurVotant({ id_bv: params.idbv }));
    dispatch(nombreElecteurByBvBYCircons());
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


  return (
    <>
      <Breadcrumbs
        title={bvData[0]?.lieu_vote}
        url="/vote"
        data={[{ title: "vote " }, { title: `Bureau de vote | ${bvData[0]?.bureau_vote}` }]}
      />

      <div className="react-dataTable mt-3 mb-2" id="electeur">
        <h6>Liste votant</h6>
        <DataTable
          pagination
          responsive
          noDataComponent="Aucune données pour le moment"
          columns={votants}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationPerPage={100}
          paginationRowsPerPageOptions={[6, 10, 25, 50, 75, 100]}
          data={votantData}
        />
      </div>
    </>
  );
};

export default ListeVotant;
