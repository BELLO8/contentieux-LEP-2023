/*eslint-disable*/

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersList from "../Components/Table";
import BVTimeline from "../Components/BVTimeline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBvConforme,
  getTimeLineByBv,
  nombreElecteurByBvBYCircons,
} from "../../redux/store/Election";
import Breadcrumbs from "../../@core/components/breadcrumbs";
import { getElecteurByBvBYCircons, getUserData } from "../../utility/Utils";
import { isEmptyObject } from "jquery";

const DetailBv = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const bv = isEmptyObject(
    useSelector((state) => state.election.nombreElecteurByBv)
  )
    ? useSelector((state) => state.election.nombreElecteurByBv)
    : getElecteurByBvBYCircons();

  let data = bv?.filter(function (id) {
    return id.id_bureau == params.idbv;
  });

  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
    dispatch(getTimeLineByBv({ bv: params.idbv }));
    dispatch(getListBvConforme());
  }, [dispatch]);
  return (
    <>
      <Breadcrumbs
        title={data[0]?.lieu_vote}
        url="/bureau-vote"
        data={[
          { title: "Bureau de vote " },
          { title: `${data[0]?.bureau_vote}` },
        ]}
      />
      <UsersList idbv={params.idbv} idlv={params.idlv} />
      <BVTimeline />
    </>
  );
};

export default DetailBv;
