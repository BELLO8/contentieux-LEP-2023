/* eslint-disable */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCirconscription } from "../../redux/store/Circonscription";
import {
    Label,
    Card,
    CardBody,
    Input,
    Col,
    Row
} from "reactstrap";
import { Filter } from "react-feather";
import { getResultatGlobalByParti } from "../../redux/store/Election";
import { useState } from "react";
import img1 from "@src/assets/images/portrait/small/1.png";

const LvCard = () => {
  const typeElection = useSelector((state) => state.typeElection.data);
  const circonsData = useSelector((state) => state.circonscription.data);
  const dispatch = useDispatch();
  const [idType, setIdtype] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");

  const ResultatCandidat = useSelector(
    (state) => state.election.resultatGlobalByParti
  );

  return (
    <>
      <Row>
        <Col lg="3" sm="4">
          <Card className="shadow-none round">
            <CardBody>
              <h4 className="mb-1">
                <Filter size={17} />
                Filtre
              </h4>
              <h5 className="filter-title">Type d'èlection</h5>
              <ul className="list-unstyled categories-list mt-2">
                {typeElection?.map((type) => (
                  <li className="mb-1">
                    <div className="form-check">
                      <Input
                        type="radio"
                        id={type.id_type}
                        name="item-radio-type"
                        defaultChecked
                        onClick={() => {
                          dispatch(getCirconscription(type.id_type));
                          setIdtype(type.id_type);
                        }}
                      />
                      <Label
                        className="form-check-label"
                        for={type.type_election}
                      >
                        {type.type_election}
                      </Label>
                    </div>
                  </li>
                ))}
              </ul>

              <h5 className="filter-title mt-3 mb-1">
                Circonscription électorale
              </h5>
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                placeholder="Recherche par mot clé"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ul className="list-unstyled categories-list">
                {circonsData
                  ?.filter((filtre) => {
                    if (search == "") {
                      return filtre;
                    } else if (
                      JSON.stringify(filtre)
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) != -1
                    ) {
                      return filtre;
                    }
                  })
                  .map((item) => {
                    return (
                      <li key={item.id} className="mb-1 mt-2">
                        <div className="form-check">
                          <Input
                            type="radio"
                            id={item.id}
                            name="item-radio"
                            onClick={() => {
                              setSearchTerm(item.circons);
                              dispatch(getResultatGlobalByParti(idType));
                            }}
                          />
                          <Label
                            className="form-check-label"
                            for={item.circons}
                          >
                            {item.circons}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col lg="9" sm="8">
          <Row>
            {ResultatCandidat?.filter((filtre) => {
              if (searchTerm == "") {
                return filtre;
              } else if (
                JSON.stringify(filtre)
                  .toLowerCase()
                  .indexOf(searchTerm.toLowerCase()) != -1
              ) {
                return filtre;
              }
            }).map((item) => (
              <Col lg="3" sm="6">
                <Card
                  className="shadow-none border-primary"
                  style={{ width: "200px", minHeight: "285px" }}
                >
                  <img
                    className="img-fluid m-1"
                    src={img1}
                    style={{ height: "160px" }}
                    alt="Card cap"
                  />
                  {/* <CardImg top src={img1} alt='Card cap' /> */}
                  <div
                    className="d-flex flex-column align-items-center text-center"
                    style={{ minHeight: "52px" }}
                  >
                    <p>
                      <b>{item.nom}</b>
                    </p>
                  </div>
                  <div style={{ height: "12px" }}></div>
                  <div className=" d-flex align-items-center flex-column text-white bg-danger">
                    <b>{item.lib_parti}</b>
                  </div>
                  <div className="d-flex align-items-center flex-column">
                    <h2 className="mt-1 mb-1">{item.total_voix}</h2>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LvCard;
