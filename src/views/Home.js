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

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEtapeBv());
    dispatch(getNombreBvEtapeEnCours());
  }, [dispatch]);
  return (
    <div>
      <h2 className="mb-3">
        Tableau de bord 
      </h2><p>{getUserData().lib_type_election}</p>
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />
    </div>
  );
};

export default Home;
