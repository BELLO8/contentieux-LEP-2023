/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypeElection } from "../../redux/store/TypeElection";
import LvCard from "../Components/LvCard";
import { getCirconscription } from "../../redux/store/Circonscription";
import { getUserData } from "../../utility/Utils";
import { useNavigate } from "react-router-dom";

const Parti = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (getUserData().role === "candidat") {
        navigate("/home");
      }
    dispatch(getTypeElection());
    dispatch(getCirconscription(2));
  }, [dispatch]);
  return (
    <>
      <h2 className="mb-3">Vue du parti</h2>
      <LvCard />
    </>
  );
};

export default Parti;
