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

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidats());
    dispatch(getAllEtapeBv());
    dispatch(getNombreBvEtapeEnCours());
  }, [dispatch]);
  return (
    <div>
      <h2 className="mb-3">Tableau de bord</h2>
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />
    </div>
  );
};

export default Home;
