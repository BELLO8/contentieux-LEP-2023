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
import { getBureauVote, getElecteurVotant } from "../../redux/store/Election";
import {
  getCandidats,
  getElecteurByBvBYCircons,
  getLv,
  getUserData,
} from "../../utility/Utils";
import { Filter } from "react-feather";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { useNavigate } from "react-router-dom";
import CandidatVoice from "../Components/CandidatVoice";
import HorizontalBarChart from "../Components/HorizontalBar";
import { colorByParti } from "../Components/columns";

export default function ComptageVoix() {
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
  const bv = useSelector((state) => state.election.bureauVote);
  const user = getUserData();

  const listCandidatVoixData = [];
  
  voixCandidat
    ?.filter(function (params) {
      return params.id_bv === idBv;
    })
    .map((item) => {
      listCandidatVoixData.push({
        id: item.id_candidat,
        voix: item.nombre_voix,
        idBv: item.id_bv,
      });
    });

  let candidatResult = listCandidat?.map((candidat) => {
    let candidatVotantData = listCandidatVoixData.find(
      (candidatVotantData) => candidatVotantData.id === candidat.id
    );
    let colors = colorByParti.filter(function (params) {
      return params.libelle === candidat.parti;
    });
    return { ...candidat, ...candidatVotantData, color:colors[0].color };
  });

  lieuxVote?.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });
  console.log(candidatResult);
  const candidatNom = [];
  const candidatData = [];

  candidatResult.map((item) => {
    candidatNom.push(item.nom);
    candidatData.push(item.voix);
  });
  console.log(candidatResult);

  useEffect(() => {
    if (getUserData().role === "parti") {
      navigate("/VueParti");
    }
  }, [dispatch]);

  return (
    <>
      <BreadCrumbs title="Dépouillement" url="/" data={[]} />
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
                                          setIdBv(bureauVote.cod_bv);
                                          dispatch(
                                            getElecteurVotant({
                                              id_bv: bureauVote.cod_bv,
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
      <Row className="mt-3">
        <Col lg="12" sm="8">
          <Row>
            {candidatResult.map((result) => (
              <Col lg="3" sm="6">
                <CandidatVoice
                  nom={result.nom}
                  lib_parti={result.parti}
                  nombre_voix={result?.voix}
                  color={result.color}
                />
              </Col>
            ))}
          </Row>
          <HorizontalBarChart
            candidat={candidatNom}
            candidatData={candidatData}
          />
        </Col>
      </Row>
    </>
  );
}
