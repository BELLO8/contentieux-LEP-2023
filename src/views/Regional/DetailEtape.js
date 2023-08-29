/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  allNombreVotant,
  getCommuneByRegion,
  getNombreElecteurByBvByCommune,
  getTimeLineByCircons,
  getlieuVoteByCommune,
} from "../../redux/store/Election";
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
import { Filter } from "react-feather";
import BureauVote from "../Components/BureauVote";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { getRepresentant } from "../../redux/store/Representant";
import { io } from "socket.io-client";
import { useState } from "react";
import { getUserData } from "../../utility/Utils";
import { isEmptyObject } from "jquery";
import RealTimeVoteList from "../Components/RealTimeVoteList";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app", {
  transports: ["websocket"],
});

const DetailEtape = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const lieuxVote = useSelector((state) => state.election.lieuVoteByCommune);
  const navigate = useNavigate();
  const communes = useSelector((state) => state.election.communeByRegion);

  const nombreElecteurByBv = useSelector(
    (state) => state.election.nombreElecteurByBvByCommune
  );
  const timeLine = useSelector((state) => state.election.timeLineCircons);
  const ListRepresentant = useSelector(
    (state) => state.representant.representant.data
  );
  const allNombreVotantByBvByCircons = useSelector(
    (state) => state.election.allNombreVotantByBvByCircons
  );
  const dataVotant = useSelector((state) => state.election.votants);
  const user = getUserData();
  const electeurbv = [];
  const timeLineData = [];
  const ListRepresentantData = [];
  const votant = [];
  const nombreVotant = [];

  ListRepresentant?.map((rep) => {
    ListRepresentantData.push({
      id: rep.id_bureau_vote,
      username: rep.username,
    });
  });

  nombreElecteurByBv?.map((item) => {
    electeurbv.push({
      id: item.id_bureau,
      nb_electeur: item.nb_electeur,
      bureau_vote: item.bureau_vote,
      id_lieu_vote: item.id_lieu_vote,
      id_bureau: item.id_bureau,
      lieu_vote: item.lieu_vote,
    });
  });

  timeLine.map((item) => {
    timeLineData.push({
      id: item.id_bureau_vote,
      name: item.lib_etape,
    });
  });

  allNombreVotantByBvByCircons.map((item) => {
    nombreVotant.push({
      id: item.id_bureau_vote,
      total: item.total_votant,
      liblvote: item.liblvote,
      lib_bv: item.lib_bv,
    });
  });

  dataVotant?.map((item) => {
    votant.push({
      id: item.id_bureau_vote,
      nom: item.nom,
      prenoms: item.prenoms,
      num_electeur: item.num_electeur,
      nombreVotant: dataVotant.length,
    });
  });

  let newArray = electeurbv.map((obj1) => {
    let obj2 = timeLineData.filter((obj2) => obj2.id === obj1.id);
    let obj3 = ListRepresentantData.filter((obj3) => obj3.id === obj1.id);
    let nbreVotant = nombreVotant.find(
      (nbreVotant) => nbreVotant.id === obj1.id
    );
    let votantData = votant.find((item) => item.id === obj1.id);
    return {
      ...obj1,
      ...nbreVotant,
      ...votantData,
      etape: [...obj2][obj2.length - 1]
        ? [...obj2][obj2.length - 1].name
        : "Pas debuté",
      nbrRep: [...obj3].length,
    };
  });

  const commune = communes?.filter(function (item) {
    return item.id === params.id;
  });

  useEffect(() => {
    socket.on(`insertedvote-${user.id_candidat}`, (data) => {
      console.log(data);
      dispatch(vote(JSON.parse(data)));
    });
    if (getUserData().role === "parti") {
      navigate("/JamaweAdmin");
    }
    isEmptyObject(communes) ? dispatch(getCommuneByRegion()) : null;
    dispatch(getNombreElecteurByBvByCommune(params.id));
    dispatch(allNombreVotant());
    dispatch(getTimeLineByCircons());
    dispatch(getRepresentant());
    dispatch(getlieuVoteByCommune(params.id));
  }, [dispatch, socket]);
  return (
    <>
      <BreadCrumbs title={commune[0]?.libcommune} url="/vote" data={[]} />
      <RealTimeVoteList />
      <Row>
        <Col lg="6" sm="6">
          <div className="basic-modal">
            <Button
              className="mb-1 btn-icon rounded-circle"
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
                    {lieuxVote.map((item) => {
                      return (
                        <li key={item.id} className="mb-1">
                          <div className="form-check">
                            <Input
                              type="radio"
                              id={item.id}
                              name="item-radio"
                              onClick={() => {
                                setSearchTerm(item.liblvote);
                              }}
                            />
                            <Label
                              className="form-check-label"
                              for={item.liblvote}
                            >
                              {item.liblvote}
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
        <Col lg="6" sm="6"></Col>
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
              <BureauVote
                idbv={item.id_bureau}
                idlv={item.id_lieu_vote}
                lv={item.lieu_vote}
                nbrRep={item.nbrRep}
                inscrit={item.nb_electeur}
                route={`/vote/etape-vote/${item.id_lieu_vote}/${item.id_bureau}`}
                votants={
                  item.nombreVotant
                    ? Number(item.total) + item.nombreVotant
                    : item.total
                    ? item.total
                    : 0
                }
                etape={item.etape}
                bv={" Bv : " + item.bureau_vote}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default DetailEtape;
