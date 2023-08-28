/* eslint-disable */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardText, Button } from "reactstrap";

const CommuneCard = ({ data, searchTerm, route }) => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        {data
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
                      navigate(route + `${item.id}`);
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

export default CommuneCard;
