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
import BureauVote from "../Components/BureauVote";

export default function SettingCandidat() {
  const dispatch = useDispatch();
  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const taux = useSelector((state) => state.election.taux);
  const data = useSelector((state) => state.election.votants);
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
    dispatch(nombreElecteurByBvBYCircons());
    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch]);

  return (
    <>
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
        {electeurbv
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
            <Col lg="6" sm="6">
              <BureauVote
                idbv={item.id_bureau}
                idlv={item.id_lieu_vote}
                lv={item.lieu_vote}
                bv={" Bv : " + item.bureau_vote}
              />
            </Col>
          ))}
      </Row>

     
    </>
  );
}
