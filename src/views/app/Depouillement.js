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
  getCandidats,
  getCandidatsVoiceByDep,
  getLieuxVote,
  nombreElecteurByBvBYCircons,
} from "../../redux/store/Election";
import {
  getElecteurByBvBYCircons,
  getLv,
  getUserData,
} from "../../utility/Utils";
import { Filter } from "react-feather";
import Bv from "../Components/BvDepouillement";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import { isEmptyObject } from "jquery";

export default function Depouillement() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const lieuxVote = !isEmptyObject(
    useSelector((state) => state.election.lieuxVote)
  )
    ? useSelector((state) => state.election.lieuxVote)
    : getLv();

  const nombreElecteurByBv = getElecteurByBvBYCircons();

  const electeurbv = [];
  const lieuxVoteData = [];

  nombreElecteurByBv.map((item) => {
    electeurbv.push(item);
  });

  lieuxVote.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  useEffect(() => {
    dispatch(getCandidatsVoiceByDep());
  }, [dispatch]);

  return (
    <>
      <BreadCrumbs title="Dépouillement" url="/" data={[]} />

      <Row className="mt-3">
        <Col lg="3" sm="12">
          <Card>
            <CardBody>
              <h4 className="mb-1">
                <Filter size={17} />
                Filtre
              </h4>
              <h5 className="filter-title">Lieu de vote</h5>
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
                        <Label className="form-check-label" for={item.value}>
                          {item.label}
                        </Label>
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
                    bv={item.bureau_vote}
                    lv={item.lieu_vote}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
