/* eslint-disable */
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import StatsCard from "./Components/StatsCard";
import TableBasic from "./Components/TableBasic";
import CandidatVoice from "./Components/CardTransactions";
import TableVote from "./Components/TableVote";
import ChartjsHorizontalBarChart from "./Components/ChartjsHorizontalBar";
import Candidat from "./Components/Candidant";
import { useDispatch } from "react-redux";
import { getCandidats } from "../redux/store/Election";
import { useEffect } from "react";
import BasicTimeline from "./Components/BasicTimeline";

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getCandidats())

  },[dispatch])
  return (
    <div>
      <h2 className="mb-3">Tableau de bord</h2>
      <StatsCard />
      <BasicTimeline />
      <Candidat />
      <h3>Résultat de l'élection</h3>
      <ChartjsHorizontalBarChart />

      <Row>
      </Row>
    </div>
  );
};

export default Home;
