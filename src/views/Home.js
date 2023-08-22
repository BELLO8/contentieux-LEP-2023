/* eslint-disable */
import StatsCard from "./Components/StatsCard";
import ChartjsHorizontalBarChart from "./Components/ChartjsHorizontalBar";
import Candidat from "./Components/Candidant";
import { useDispatch } from "react-redux";
import {
  getAllEtapeBv, getNombreBvEtapeEnCours
} from "../redux/store/Election";
import { useEffect } from "react";
import BasicTimeline from "./Components/BasicTimeline";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllEtapeBv());
    dispatch(getNombreBvEtapeEnCours());
  }, [dispatch]);
  return (
    <div>
      
      <h1 style={{ fontWeight: "bold" }} className="mb-3">
        Tableau de bord 
      </h1>
      {/* <p>{getUserData().lib_type_election } ( {getUserData().lib_circons} )</p> */}
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />
    </div>
  );
};

export default Home;
