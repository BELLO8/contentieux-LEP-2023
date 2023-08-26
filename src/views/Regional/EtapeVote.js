/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommuneByRegion } from "../../redux/store/Election";
import {
  Card,
  Col,
  Row,
  Input,
  Label,
  CardBody,
  Button,
  Badge,
  CardText,
} from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../@core/components/breadcrumbs";

const EtapeVote = () => {
  const dispatch = useDispatch();
  const communes = useSelector((state) => state.election.communeByRegion);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCommuneByRegion());
  }, [dispatch]);
  return (
    <>
      <BreadCrumbs title="Etape de vote" url="/" data={[]} />
      {/* <Row>
        <Col lg="3" sm="4">
          <Card className="shadow-none">
            <div className="px-3">
              <h5 className="mt-3 filter-title">Commune</h5>
              <Input
                id="search"
                className="mb-1"
                placeholder="Recherche par mot clé"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                {communes
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
                  .map((item) => {
                    return (
                      <li key={item.id} className="mb-1">
                        <div className="form-check">
                          <Input
                            type="radio"
                            id={item.id}
                            name="item-radio"
                            onClick={() => {
                              setSearch(item.libcommune);
                            }}
                          />
                          <Label className="form-check-label" for={item.id}>
                            {item.libcommune}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Card>
        </Col>
        <Col lg="9" sm="6">
          
        </Col>
      </Row> */}
      <Col lg="6">
        <Input
          id="search"
          className="mb-1"
          placeholder="Recherche par mot clé"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Row>
        {communes
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
            <Col lg="3" sm="6" md="4">
              <Card
                className="shadow-none round p-2 border"
                style={{
                  minHeight: "222px",
                }}
              >
                <div>
                  <div className="">
                    <Row className=" d-flex justify-content-between align-items-center">
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#000000",
                          }}
                        >
                          Departement : {item.libdep}
                        </p>
                        <h6 style={{ color: "#000000" }}>{item.libcommune}</h6>
                      </div>
                    </Row>
                  </div>

                  <div className="d-flex align-items-center mt-1 mb-1">
                    <div className="my-auto mx-1">
                      <h4
                        className="mb-0"
                        style={{ fontWeight: "bold", color: "#183f98" }}
                      >
                        {item.electeur_d_2023}
                      </h4>
                      <CardText
                        className="font-small-3 mb-0"
                        style={{ fontWeight: "bold", color: "#183f98" }}
                      >
                        Inscrits
                      </CardText>
                    </div>
                    <div className="my-auto mx-1">
                      <h4
                        className="mb-0"
                        style={{ fontWeight: "bold", color: "#f0692b" }}
                      >
                        {item.nb_lv}
                      </h4>
                      <CardText
                        className="font-small-3 mb-0"
                        style={{ fontWeight: "bold", color: "#f0692b" }}
                      >
                        Lieux
                      </CardText>
                    </div>
                    <div className="my-auto px-1">
                      <h4
                        className="mb-0"
                        style={{ fontWeight: "bold", color: "#2bbbf0" }}
                      >
                        {item.nb_bv}
                      </h4>
                      <CardText
                        className="font-small-3 mb-0"
                        style={{ fontWeight: "bold", color: "#2bbbf0" }}
                      >
                        Bureaux
                      </CardText>
                    </div>
                  </div>
                  <Button
                  className="btn-sm"
                  outline
                    onClick={() => {
                      navigate(`/vote/etape-vote/${item.id}`);
                    }}
                  >
                    <b style={{ color: "#183f98" }}>Détails</b>
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default EtapeVote;
