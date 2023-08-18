/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypeElection } from "../../redux/store/TypeElection";
import LvCard from "../Components/LvCard";
import { getCirconscription } from "../../redux/store/Circonscription";

const Parti = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
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
