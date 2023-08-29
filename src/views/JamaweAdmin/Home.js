/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypeElection } from "../../redux/store/TypeElection";
import ListCandidats from "../Components/LvCard";
import { getCirconscription } from "../../redux/store/Circonscription";
import { getUserData } from "../../utility/Utils";
import { useNavigate } from "react-router-dom";
import { getlistCandidatByType, idTypeElection } from "../../redux/store/Election";

const Parti = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (getUserData().role === "candidat") {
        navigate("/home");
      }
    dispatch(getTypeElection());
    dispatch(getlistCandidatByType(2));
    dispatch(idTypeElection("2"))
  }, [dispatch]);
  return (
    <>
      <h2 className="mb-3">Liste des candidats</h2>
      <ListCandidats />
    </>
  );
};

export default Parti;
