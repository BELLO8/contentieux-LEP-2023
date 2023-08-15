/* eslint-disable */

import React, { useEffect } from "react";
import { io } from "socket.io-client";
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
  ModalBody, ModalHeader,
  Row
} from "reactstrap";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  allNombreVotant,
  getBureauVote,
  getLieuxVote, nombreElecteurByBvBYCircons, vote
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Filter } from "react-feather";
import BreadCrumbs from "../../@core/components/breadcrumbs";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app/", {
  transports: ["websocket"],
});

export default function Vote() {
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const dataVotant = useSelector((state) => state.election.votants);

  const allNombreVotantByBvByCircons = useSelector(
    (state) => state.election.allNombreVotantByBvByCircons
  );
  const nombreElecteurByBv = useSelector(
    (state) => state.election.nombreElecteurByBv
  );

  const electeurbv = [];
  const lieuxVoteData = [];
  const bureauVoteData = [];

  nombreElecteurByBv.map((item) => {
    electeurbv.push({
      id: item.id_bureau,
      nb_electeur: item.nb_electeur,
      bureau_vote: item.bureau_vote,
      id_lieu_vote: item.id_lieu_vote,
      lieu_vote: item.lieu_vote,
    });
  });

  const nombreVotant = [];
  allNombreVotantByBvByCircons.map((item) => {
    nombreVotant.push({
      id: item.id_bureau_vote,
      total: item.total_votant,
      liblvote: item.liblvote,
      lib_bv: item.lib_bv,
    });
  });

  console.log(dataVotant);
  let newArray = electeurbv.map((obj1) => {
    let obj2 = nombreVotant.find((obj2) => obj2.id === obj1.id);
    return { ...obj1, ...obj2 };
  });

  nombreElecteurByBv.map((item) => {
    electeurbv.push(item);
  });

  lieuxVote.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  bureauVote.map((item) => {
    bureauVoteData.push({ value: item.cod_bv, label: item.lib_bv });
  });
  const user = getUserData();

  useEffect(() => {
    socket.on(`insertedvote${user.id_parti + user.id_circons}`, (data) => {
      console.log(JSON.parse(data));
      dispatch(vote(JSON.parse(data)));
    });
    dispatch(nombreElecteurByBvBYCircons());
    dispatch(allNombreVotant());
    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch, socket]);

  return (
    <>
      <BreadCrumbs title="Déroulement du vote" url="/" data={[]} />
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
              <StatsHorizontal
                idbv={item.id}
                bv={item.bureau_vote}
                lv={item.lieu_vote}
                inscrit={item.nb_electeur}
                votants={item.total ? item.total : 0}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
