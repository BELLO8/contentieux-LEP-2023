/* eslint-disable */
import { Row } from "reactstrap";
import StatsCard from "./Components/StatsCard";
import ChartjsHorizontalBarChart from "./Components/ChartjsHorizontalBar";
import Candidat from "./Components/Candidant";
import { useDispatch } from "react-redux";
import {
  getAllEtapeBv,
  getCandidats,
  getNombreBvEtapeEnCours,
} from "../redux/store/Election";
import { useEffect } from "react";
import BasicTimeline from "./Components/BasicTimeline";
import { getUserData } from "../utility/Utils";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
    dispatch(getAllEtapeBv());
    dispatch(getNombreBvEtapeEnCours());
  }, [dispatch]);
  return (
    <div>
      <h2 className="mb-3">
        Tableau de bord 
      </h2>
      <p>{getUserData().lib_type_election } ( {getUserData().lib_circons} )</p>
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />
    </div>
  );
};

export default Home;
