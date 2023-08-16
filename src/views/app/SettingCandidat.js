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
  getLieuxVote,
  getTimeLineByCircons,
  nombreElecteurByBvBYCircons,
  vote,
} from "../../redux/store/Election";
import { getElecteurByBvBYCircons, getLv, getUserData } from "../../utility/Utils";
import { Filter } from "react-feather";
import BureauVote from "../Components/BureauVote";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { getRepresentant } from "../../redux/store/Representant";

export default function SettingCandidat() {
  const dispatch = useDispatch();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const lieuxVote = getLv();

  const nombreElecteurByBv = getElecteurByBvBYCircons();
  const timeLine = useSelector((state) => state.election.timeLineCircons);
  const ListRepresentant = useSelector(
    (state) => state.representant.representant.data
  );

  const electeurbv = [];
  const lieuxVoteData = [];
  const timeLineData = [];
  const ListRepresentantData = [];

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

  let newArray = electeurbv.map((obj1) => {
    let obj2 = timeLineData.filter((obj2) => obj2.id === obj1.id);
    let obj3 = ListRepresentantData.filter((obj3) => obj3.id === obj1.id);
    return {
      ...obj1,
      etape: [...obj2][obj2.length - 1]
        ? [...obj2][obj2.length - 1].name
        : "Pas encore debuté",
      nbrRep: [...obj3].length,
    };
  });

  console.log(newArray);
  lieuxVote?.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });


  useEffect(() => {
    dispatch(getTimeLineByCircons());
    dispatch(getRepresentant());
    //dispatch(nombreElecteurByBvBYCircons());
    //dispatch(getLieuxVote());
  }, [dispatch]);

  return (
    <>
      <BreadCrumbs title="Bureau de vote" url="/" data={[]} />
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
                etape={item.etape}
                bv={" Bv : " + item.bureau_vote}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
