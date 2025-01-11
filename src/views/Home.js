/* eslint-disable */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllEtapeBv,
  getNombreBvEtapeEnCours,
} from "../redux/store/Election";
import BasicTimeline from "./Components/BasicTimeline";
import Candidat from "./Components/Candidant";
import ChartjsHorizontalBarChart from "./Components/ChartjsHorizontalBar";
import StatsCard from "./Components/StatsCard";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const etape = useSelector((state) => state.election.etape);

  useEffect(() => {
    dispatch(getAllEtapeBv());
    dispatch(getNombreBvEtapeEnCours());
  }, [dispatch]);
  return (
    <div>

      {/* <p>{getUserData().lib_type_election } ( {getUserData().lib_circons} )</p> */}
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3 style={{ fontWeight: "bold" }}>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />
    </div>
  );
};

export default Home;
