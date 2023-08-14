/*eslint-disable*/

import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../Components/Table";
import BVTimeline from "../Components/BVTimeline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeLineByBv,
  nombreElecteurByBvBYCircons,
} from "../../redux/store/Election";
import Breadcrumbs from "../../@core/components/breadcrumbs";

const DetailBv = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const bv = useSelector((state) => state.election.nombreElecteurByBv);

  let data = bv?.filter(function (id) {
    return id.id_bureau == params.idbv;
  });

  console.log(data);
  useEffect(() => {
    dispatch(getTimeLineByBv({ bv: params.idbv }));
    dispatch(nombreElecteurByBvBYCircons());
  }, [dispatch]);
  return (
    <>
      <Breadcrumbs
        title={data[0]?.lieu_vote}
        url="/bureau-vote"
        data={[{ title: "Bureau de vote " }, { title: `${data[0]?.bureau_vote}` }]}
      />
      <UsersList idbv={params.idbv} idlv={params.idlv} />
      <BVTimeline />
    </>
  );
};

export default DetailBv;
