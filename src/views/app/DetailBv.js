/*eslint-disable*/

import React from "react";
import { useParams } from "react-router-dom";
import ModalForm from "../Components/ModalForm";
import UsersList from "../Components/Table";
import BVTimeline from "../Components/BVTimeline";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTimeLineByBv } from "../../redux/store/Election";

const DetailBv = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeLineByBv({ bv: params.idbv }));
  }, [dispatch]);
  return (
    <>
      <ModalForm idbv={params.idbv} idlv={params.idlv} />
      <UsersList idbv={params.idbv} idlv={params.idlv} />
      <BVTimeline />
    </>
  );
};

export default DetailBv;
