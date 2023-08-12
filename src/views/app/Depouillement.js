/* eslint-disable */
import React, { useEffect } from "react";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBureauVote,
  getLieuxVote,
  nombreElecteurByBvBYCircons,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import { Filter } from "react-feather";
import Bv from "../Components/BvDepouillement";

export default function Depouillement() {
  const dispatch = useDispatch();
  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();
  const [basicModal, setBasicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
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
        <Col lg="3" sm="12">
          <Card>
            <CardBody>
              <h4 className="mb-1">
                <Filter size={17} /> Filtre
              </h4>
              <h5 className="filter-title">Lieu de vote</h5>
              <ul className="list-unstyled categories-list">
                <li className="mb-1">
                  <div className="form-check">
                    <Input
                      type="checkbox"
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
                          type="checkbox"
                          id={item.value}
                          onClick={() => {
                            dispatch(getBureauVote(item.value));
                            setSearchTerm(item.label);
                          }}
                        />
                        
                        <Label className="form-check-label" for={item.value}>
                          {item.label}
                        </Label>
                        {/* <Collapse isOpen={isOpen}>
                          <div className="d-flex p-1">
                          
                            <span>
                              Lorem Ipsum is simply dummy text of the printing
                            
                            </span>
                          </div>
                        </Collapse> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col lg="9" sm="12">
          <Row>
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
                  <Bv
                    idbv={item.id_bureau}
                    bv={item.lieu_vote + " Bv : " + item.bureau_vote}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
