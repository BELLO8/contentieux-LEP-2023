/* eslint-disable */

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Invoice List Sidebar

// ** Table Columns

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Label,
    Row
} from "reactstrap";

// ** Utils

// ** Context
import {
    Activity, BarChart2
} from 'react-feather';
  
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
    EvolutionCirconsByDep,
    EvolutionLVByDep,
    EvolutionPopulationByDep, EvolutionPopulationBylieuVote, NbrCirconsDep,
    NbrCirconsDep20,
    NbrLieuVotebyCircons20,
    NbrLieuVotebyCircons23,
    NbrPopulationByDep20,
    NbrPopulationByDep23,
    NbrPopulationByLieuVote20,
    NbrPopulationByLieuVote23,
    clearStore, getDepartement, getLieuxVote
} from "../redux/store/Election";
import { getUserData } from "../utility/Utils";
import StatsHorizontal from "./StatsHorizontal";

const Synthese = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  const userData = getUserData();
  const departement = useSelector((state) => state.election.departement);
  const lieux = useSelector((state) => state.election.lieuxVote);
  const nbrCirconsDep23 = useSelector((state) => state.election.synthese.nombre_circonscription) 
  const nbrCirconsDep20 = useSelector((state) => state.election.synthese20.nombre_circonscription) 
  const evolution = useSelector((state) => state.election.evolution.data)
  const evolutionCirconsByDep = useSelector((state) => state.election.evolutionCirconsByDep.data)
  const nbrPopulationByDep23 = useSelector((state) => state.election.nbrPopulationByDep23.population)
  const nbrPopulationByDep20 = useSelector((state) => state.election.nbrPopulationByDep20.population)
  const nbrLieuVotebyCircons20 = useSelector((state) =>  state.election.nbrLieuVotebyCircons20.nombre_lieuVote)
  const nbrLieuVotebyCircons23 = useSelector((state) =>  state.election.nbrLieuVotebyCircons23.nombre_lieuVote)
  const evolutionPopulationBylieuVote = useSelector((state) => state.election.evolutionPopulationBylieuVote.data) 
  const nbrPopulationByLieuVote23 = useSelector((state) => state.election.nbrPopulationByLieuVote23.population)
  const nbrPopulationByLieuVote20 = useSelector((state) => state.election.nbrPopulationByLieuVote20.population)
  const evolutionLVByDep = useSelector((state) => state.election.evolutionLVByDep.data)

  const lieuxVoteData = [];
  const departementData = [];

  departement?.map((item) => {
    departementData.push({ value: item.cod_dep, label: item.lib_dep });
  });

  lieux.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });


  // ** States

  const [idDep, setIdDep] = useState();
  const [idCom, setIdCom] = useState();
  const [idLv, setIdLv] = useState();

  // ** Function to toggle sidebar

  // // ** Get data on mount
  useEffect(() => {
    dispatch(getDepartement(userData.id_circons_er));
    dispatch(getLieuxVote(userData.id_circons_em))
  }, [dispatch]);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Synthèse de données</CardTitle>
        </CardHeader>
        <CardBody>
          {userData.type_election === "2" ? (
            <Row>
              <Col md="3">
                <Label for="status-select">Département</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={departementData}
                  onChange={(event) => {
                    setIdDep(event.value);
                    dispatch(NbrCirconsDep({idDep: event.value}))
                    dispatch(NbrLieuVotebyCircons20({idDep: event.value}))
                    dispatch(NbrLieuVotebyCircons23({idDep: event.value}))
                    dispatch(EvolutionPopulationByDep({idDep: event.value}))
                    dispatch(EvolutionLVByDep({idDep: event.value}))
                    dispatch(EvolutionCirconsByDep({idDep: event.value}))
                    dispatch(NbrCirconsDep20({idDep: event.value}))
                    dispatch(NbrPopulationByDep20({idDep: event.value}))      
                    dispatch(NbrPopulationByDep23({idDep: event.value}))      
                  }}
                />
              </Col>
            </Row>
          ) : userData.type_election === "1" ? (
            <Row>
              <Col md="3">
                <Label for="status-select">Lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(event) => {
                    dispatch(NbrPopulationByLieuVote20({idLv:event.value}))
                    dispatch(NbrPopulationByLieuVote23({idLv:event.value}))
                    dispatch(EvolutionPopulationBylieuVote({idLv:event.value}))
                  }}
                />
              </Col> 
            </Row>
          ) : null}
        </CardBody>
      </Card>
      {userData.type_election === "2" ? (
          <Row>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21}/>} color='primary' stats={nbrCirconsDep23} statTitle='Nombres circonscription 2023' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='success' stats={nbrCirconsDep20} statTitle='Nombres circonscription 2020' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<Activity size={21} />} color='danger' stats={evolutionCirconsByDep} statTitle='Evolution circonscription' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrPopulationByDep23} statTitle='Nombres populations 2023' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrPopulationByDep20} statTitle='Nombres populations 2020' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<Activity size={21} />} color='warning' stats={evolution} statTitle='Evolution populations' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrLieuVotebyCircons23} statTitle='Nombres lieux de votes 2023' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrLieuVotebyCircons20} statTitle='Nombres lieux de votes 2022' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<Activity size={21} />} color='warning' stats={evolutionLVByDep} statTitle='Evolution lieu de vote' />
            </Col>
          </Row>
      ) : userData.type_election === "1" ? (
          <Row>       
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrPopulationByLieuVote23} statTitle='Nombres populations 2023' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<BarChart2 size={21} />} color='warning' stats={nbrPopulationByLieuVote20} statTitle='Nombres populations 2020' />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal icon={<Activity size={21} />} color='warning' stats={evolutionPopulationBylieuVote} statTitle='Evolution populations' />
            </Col>
          </Row>
      ) : null }
     
    </Fragment>
  );
};

export default Synthese;
