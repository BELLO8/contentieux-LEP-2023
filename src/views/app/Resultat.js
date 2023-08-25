/* eslint-disable */
import ChartjsHorizontalBarChart from "../Components/ChartjsHorizontalBar";
import "chart.js/auto";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { useEffect } from "react";
import { getUserData } from "../../utility/Utils";
import { useNavigate } from "react-router-dom";
import React from "react";
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
  getElecteurVotant,
  getTimeLineByBv,
} from "../../redux/store/Election";
import {
  getCandidats,
  getElecteurByBvBYCircons,
  getLv,
} from "../../utility/Utils";
import { Download, Filter, Printer } from "react-feather";
import CandidatVoice from "../Components/CardTransactions";
import BVTimeline from "../Components/BVTimeline";
import { isEmptyObject } from "jquery";

export default function Resultat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const lieuxVote = getLv();
  const nombreElecteurByBv = getElecteurByBvBYCircons();
  const [open, setOpen] = useState("1");

  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const electeurbv = [];
  const lieuxVoteData = [];
  const listCandidat = getCandidats();
  const resultat = useSelector((state) => state.election.resultat);
  const user = getUserData();
  const bv = useSelector((state) => state.election.bureauVote);

  const listCandidatVoixData = [];

  resultat?.map((item) => {
    listCandidatVoixData.push({
      id: item.id_candidat,
      total_voix: item.total_voix,
      nom: item.nom,
    });
  });

  let candidatResult = listCandidat?.map((candidat) => {
    let candidatVotantData = listCandidatVoixData.find(
      (candidatVotantData) => candidatVotantData.id === candidat.id
    );
    return { ...candidat, ...candidatVotantData };
  });

  lieuxVote?.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
  }, []);
  return (
    <div>
      <BreadCrumbs title="Résultat élection" url="/" data={[]} />
      {/* <ChartjsHorizontalBarChart /> */}
      <Row>
        <Col lg="6" sm="6">
          <div className="basic-modal">
            <Button
              className="mb-1 btn-icon rounded-circle btn-sm"
              outline
              color="primary"
              onClick={() => setBasicModal(!basicModal)}
            >
              <Filter size={16} />
            </Button>
            <Modal
              isOpen={basicModal}
              toggle={() => setBasicModal(!basicModal)}
              modalClassName="modal-slide-in event-sidebar"
            >
              <ModalHeader>Appliquer un filtre sur les données</ModalHeader>
              <ModalBody>
                <Card className="shadow-none">
                  <CardBody>
                    {/* <h4 className="mb-1">
                      <Filter size={17} />
                      Filtre
                    </h4> */}
                    <h5 className="filter-title">Lieu de vote</h5>
                    <Input
                      id="search-invoice"
                      className="mb-1"
                      placeholder="Recherche par mot clé"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <div className="form-check">
                <Input
                  type="radio"
                  id="all"
                  name="item-radio"
                  defaultChecked
                  onClick={() => {}}
                />
                <Label className="form-check-label" for="all">
                  Tout
                </Label>
              </div> */}
                    {lieuxVoteData
                      .filter((filtre) => {
                        if (searchTerm == "") {
                          return filtre;
                        } else if (
                          JSON.stringify(filtre)
                            .toLowerCase()
                            .indexOf(searchTerm.toLowerCase()) != -1
                        ) {
                          return filtre;
                        }
                      })
                      .map((item, index) => {
                        return (
                          <Accordion open={open} toggle={toggle}>
                            <AccordionItem>
                              <AccordionHeader targetId={index}>
                                <div className="form-check">
                                  <Input
                                    type="radio"
                                    id={item.value}
                                    name="item-radio"
                                    onClick={() => {
                                      dispatch(getBureauVote(item.value));
                                    }}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={item.value}
                                  >
                                    {item.label}
                                  </Label>
                                </div>
                              </AccordionHeader>
                              <AccordionBody accordionId={index}>
                                {bv?.map((bureauVote) => {
                                  return (
                                    <div className="form-check">
                                      <Input
                                        type="radio"
                                        id={bureauVote.cod_bv}
                                        name="item-radio"
                                        onClick={() => {
                                          dispatch(
                                            getElecteurVotant({
                                              id_bv: bureauVote.cod_bv,
                                            })
                                          );
                                          dispatch(
                                            getTimeLineByBv({
                                              bv: bureauVote.cod_bv,
                                            })
                                          );
                                        }}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for={bureauVote.cod_bv}
                                      >
                                        BV : {bureauVote.lib_bv}
                                      </Label>
                                    </div>
                                  );
                                })}
                              </AccordionBody>
                            </AccordionItem>
                          </Accordion>
                        );
                      })}
                  </CardBody>
                </Card>
              </ModalBody>
            </Modal>
          </div>
        </Col>
      </Row>
      {isEmptyObject(bv) ? (
        <p className="fw-bold text-dark">Cilquer sur le bouton du filtre en haut pour afficher votre rapport</p>
      ) : (
        <Row className="mt-3">
          <Col lg="12" sm="6">
            <Button className="mb-2 btn-sm" color="primary">
              <Download size={13} /> Télécharger le rapport
            </Button>
            <Row className="mb-3">
              <BVTimeline />
            </Row>
            <Row className="mb-3">
              <h2 className="fw-bolder mb-3">Résultat </h2>
              {candidatResult.map((result) => (
                <Col lg="3" sm="6">
                  <CandidatVoice
                    nom={result.nom}
                    lib_parti={result.parti}
                    nombre_voix={0}
                  />
                </Col>
              ))}
              <ChartjsHorizontalBarChart />
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}
