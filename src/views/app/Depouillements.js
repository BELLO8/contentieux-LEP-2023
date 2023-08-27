/* eslint-disable */

import React, { useEffect } from "react";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { useState } from "react";
import StatsHorizontal from "../Components/StatsHorizontal";

import {
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allNombreVotant,
  getBureauVote,
  getCandidatsVoiceByDep,
  getNombreBulletinNonValideByCirconsElectorale,
  getNombreBulletinOuvertByCirconsElectorale,
  getNombreVotantCei,
  getResult,
  getTimeLineByCircons,
  nombreElecteurByBvBYCircons,
} from "../../redux/store/Election";
import {
  getCandidats,
  getElecteurByBvBYCircons,
  getLv,
  getUserData,
} from "../../utility/Utils";
import { Filter } from "react-feather";
import BreadCrumbs from "../../@core/components/breadcrumbs";

export default function Vote() {
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const bulletinNonValid = useSelector(
    (state) => state.election.nombreBulletinNonValideByCirconsElectorale
  );
  const timeLine = useSelector((state) => state.election.timeLineCircons);
  const nombreCeiVotant = useSelector(
    (state) => state.election.nombreVotantCei
  );
  const nombreBulletinOuver = useSelector(
    (state) => state.election.nombreBulletinOuvertByCirconsElectorale
  );
  const lieuxVote = getLv();
  const nombreElecteurByBv = getElecteurByBvBYCircons();
  // const nombreElecteurByBv = useSelector((state) => state.election.nombreElecteurByBv);
  const nombreCei = [];
  const bulletinOuver = [];
  const nonValide = [];
  const user = getUserData()

  bulletinNonValid.map((item) => {
    nonValide.push({
      id: item.id_bv,
      bulletinBlanc: item.bulletin_blanc,
      bulletinNull: item.bulletin_null,
    });
  });

  nombreCeiVotant.map((item) => {
    nombreCei.push({
      id: item.id_bureau_vote,
      nombre_votant: item.nombre_votant,
    });
  });

  nombreBulletinOuver.map((bulletin) => {
    bulletinOuver.push({ id: bulletin.id_bv, bulletin: bulletin.bulletin });
  });

  useEffect(() => {
    dispatch(
      getResult({
        id_circons: user?.id_circons,
        id_parti: user?.id_parti,
        type: user?.id_type_election,
      })
    );
    // dispatch(nombreElecteurByBvBYCircons());
    dispatch(getCandidatsVoiceByDep());
    dispatch(getNombreVotantCei());
    dispatch(getNombreBulletinOuvertByCirconsElectorale());
    dispatch(getNombreBulletinNonValideByCirconsElectorale());
    dispatch(getTimeLineByCircons());
    dispatch(getCandidatsVoiceByDep());
  }, [dispatch]);

  const electeurbv = [];
  const lieuxVoteData = [];
  const votant = [];
  const timeLineData = [];


  timeLine.map((item) => {
    timeLineData.push({
      id: item.id_bureau_vote,
      name: item.lib_etape,
      started_at: item.started_at,
      end_at: item.end_at,
    });
  });

  nombreElecteurByBv?.map((item) => {
    electeurbv.push({
      id: item.id_bureau,
      nb_electeur: item.nb_electeur,
      bureau_vote: item.bureau_vote,
      id_lieu_vote: item.id_lieu_vote,
      lieu_vote: item.lieu_vote,
    });
  });


  let newArray = electeurbv.map((obj1) => {
    let timeLine = timeLineData.filter((time) => time.id === obj1.id);
    let bulletins = bulletinOuver.find((bull) => bull.id === obj1.id);
    let nombresCei = nombreCei.find((nombreCei) => nombreCei.id === obj1.id);
    let NombreBull = nonValide.filter((nbre) => nbre.id === obj1.id);
    return {
      ...obj1,
      ...nombresCei,
      nombreBulletinBlanc: [...NombreBull][0]?.bulletinBlanc
        ? [...NombreBull][0]?.bulletinBlanc
        : 0,
      nombreBulletinNull: [...NombreBull][0]?.bulletinNull
        ? [...NombreBull][0]?.bulletinNull
        : 0,
      ...bulletins,
      etape: [...timeLine][timeLine.length - 1]
        ? [...timeLine][timeLine.length - 1]?.name === "Dépouillement" ||
          [...timeLine][timeLine.length - 1]?.name === "Décompte des voix"
          ? ([...timeLine][timeLine.length - 1].name = "Dépouillement encours")
          : "Dépouillement pas débuté"
        : "Pas debuté",
    };
  });


  nombreElecteurByBv?.map((item) => {
    electeurbv.push(item);
  });

  lieuxVote?.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  return (
    <>
      <BreadCrumbs title="Dépouillement" url="/" data={[{ title: searchTerm }]} />
      <Row>
        <Col lg="6" sm="6">
          <div className="basic-modal">
            <Button
              className="mb-1 mt-3 btn-icon rounded-circle"
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
                <div>
                  <h5 className="mt-3 filter-title">Lieu de vote</h5>
                  <ul className="list-unstyled categories-list">
                    <li className="mb-1">
                      <div className="form-check">
                        <Input
                          type="radio"
                          id="all"
                          name="item-radio"
                          defaultChecked
                          onClick={() => {
                            setSearchTerm("");
                          }}
                        />
                        <Label className="form-check-label" for="all">
                          Tout
                        </Label>
                      </div>
                    </li>
                    {lieuxVoteData.map((item) => {
                      return (
                        <li key={item.value} className="mb-1">
                          <div className="form-check">
                            <Input
                              type="radio"
                              id={item.value}
                              name="item-radio"
                              onClick={() => {
                                dispatch(getBureauVote(item.value));
                                setSearchTerm(item.label);
                              }}
                            />
                            <Label
                              className="form-check-label"
                              for={item.value}
                            >
                              {item.label}
                            </Label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </Col>
        <Col lg="6" sm="6">
        </Col>
        
        {newArray
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
          .map((item) => (
            <Col lg="4" sm="6">
              <StatsHorizontal
                idbv={item.id}
                idlv={item.id_lieu_vote}
                bv={item.bureau_vote}
                lv={item.lieu_vote}
                inscrit={item.nb_electeur}
                etape={item.etape}
                nombreBulletinBlanc={item.nombreBulletinBlanc}
                nombreBulletinNull={item.nombreBulletinNull}
                bulletinOuvert={item.bulletin ? item.bulletin : 0}
                votants={item.nombre_votant ?? 0}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
