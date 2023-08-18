/* eslint-disable */

import React from "react";
import ChartjsHorizontalBarChart from "../Components/ChartjsHorizontalBar";
import "chart.js/auto";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { useEffect } from "react";
import { getUserData } from "../../utility/Utils";
import { useNavigate } from "react-router-dom";

export default function Resultat() {
  
  const navigate = useNavigate()
  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
  },[])
  return (
    <div>
      <BreadCrumbs title="Résultat élection" url="/" data={[]} />
      <ChartjsHorizontalBarChart />
    </div>
  );
}
