/* eslint-disable */
import React, { useEffect } from "react";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBureauVote,
  getCandidatsVoiceByDep,
  getElecteurVotant,
  getResult,
} from "../../redux/store/Election";
import {
  getCandidats,
  getElecteurByBvBYCircons,
  getLv,
  getUserData,
} from "../../utility/Utils";
import { Filter } from "react-feather";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import CandidatVoice from "../Components/CardTransactions";
import ChartjsHorizontalBarChart from "../Components/ChartjsHorizontalBar";
import HorizontalBarChart from "../Components/HorizontalBar";
import { colorByParti } from "../Components/columns";

export default function Depouillement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const lieuxVote = getLv();
  const nombreElecteurByBv = getElecteurByBvBYCircons();
  const [open, setOpen] = useState("1");
  const [idBv, setIdBv] = useState();
  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const electeurbv = [];
  const lieuxVoteData = [];
  const listCandidat = getCandidats();
  const voixCandidat = useSelector((state) => state.election.CandidatsVoice);
  const result = useSelector((state) => state.election.resultat);
  const bv = useSelector((state) => state.election.bureauVote);
  const user = getUserData();

  const params = useParams();
  const listCandidatVoixData = [];
  const listCandidatVoix = [];

  result?.map((item) => {
    listCandidatVoix.push({
      id: item.id_candidat,
      total_voix: item.total_voix,
      nom: item.nom,
    });
  });

  voixCandidat
    ?.filter(function (param) {
      return param.id_bv === params.idbv;
    })
    .map((item) => {
      listCandidatVoixData.push({
        id: item.id_candidat,
        voix: item.nombre_voix,
        idBv: item.id_bv,
      });
    });

  let candidatResult = listCandidat.map((candidat) => {
    let candidatVotantData = listCandidatVoixData.find(
      (candidatVotantData) => candidatVotantData.id === candidat.id
    );
    let VotantData = listCandidatVoix.find(
      (VotantData) => VotantData.id === candidat.id
    );
    let colors = colorByParti.filter(function (params) {
      return params.libelle === candidat.parti;
    });
    return {
      ...candidat,
      ...candidatVotantData,
      color: colors[0].color,
      ...VotantData,
    };
  });

  lieuxVote?.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });
  console.log(candidatResult);
  const candidatNom = [];
  const candidat = [];
  const candidatData = [];

  candidatResult
    .sort((a, b) => b.voix - a.voix)
    .map((item) => {
      candidatNom.push(item.nom);
      candidatData.push(item.voix);
    });

  console.log(candidatResult);

  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
    dispatch(getElecteurVotant({ id_bv: params.idbv }));
    dispatch(
      getResult({
        id_circons: user?.id_circons,
        id_parti: user?.id_parti,
        type: user?.id_type_election,
      })
    );
    dispatch(getCandidatsVoiceByDep());
  }, [dispatch]);

  return (
    <>
      <BreadCrumbs title="Dépouillement" url="/depouillement" data={[]} />

      <Row className="mt-3">
        <Col lg="12" sm="8">
          <Row>
            {candidatResult
              .sort((a, b) => b.total_voix - a.total_voix)
              .map((result) => (
                <Col lg="3" sm="6">
                  <CandidatVoice
                    nom={result.nom}
                    lib_parti={result.parti}
                    nombre_voix={
                      result?.voix
                    }
                    color={result.color}
                  />
                </Col>
              ))}
          </Row>
          <HorizontalBarChart
            candidat={candidatNom ? candidatNom : candidat}
            candidatData={candidatData}
          />
        </Col>
      </Row>
    </>
  );
}
