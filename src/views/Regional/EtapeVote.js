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
import CommuneCard from "../Components/CommuneCard";

const EtapeVote = () => {
  const dispatch = useDispatch();
  const communes = useSelector((state) => state.election.communeByRegion);
  const [searchTerm, setSearchTerm] = useState("");

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
      <CommuneCard
        data={communes}
        searchTerm={searchTerm}
        route={"/vote/etape-vote/"}
      />
    </>
  );
};

export default EtapeVote;
