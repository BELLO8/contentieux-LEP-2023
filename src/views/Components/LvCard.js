/* eslint-disable */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Card, CardBody, Input, Col, Row } from "reactstrap";
import { Filter } from "react-feather";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { getlistCandidatByType, idTypeElection } from "../../redux/store/Election";
import { useState } from "react";
import { candidats } from "./columns";

const ListCandidats = () => {
  const typeElection = useSelector((state) => state.typeElection.data);
  const circonsData = useSelector((state) => state.circonscription.data);
  const dispatch = useDispatch();
  const [idType, setIdtype] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const paginationComponentOptions = {
    rowsPerPageText: "Résultat par page",
    rangeSeparatorText: "de",
  };
  const Candidats = useSelector((state) => state.election.listCandidatByType);

  return (
    <>
      <Row>
        <Col lg="6" sm="10">
          <Card className="shadow-none round">
            <CardBody>
              <h4 className="mb-1">
                <Filter size={17} />
                Filtre
              </h4>
              <h5 className="filter-title">Type d'èlection</h5>
              <div className="d-flex">
                {typeElection?.map((type) => (
                  <div className="">
                    <Input
                      type="radio"
                      id={type.id_type}
                      name="item-radio-type"
                      defaultChecked
                      onClick={() => {
                        dispatch(getlistCandidatByType(type.id_type));
                        dispatch(idTypeElection(type.id_type))
                      }}
                    />
                    <Label
                      className="mx-1 form-check-label"
                      for={type.type_election}
                    >
                      {type.type_election}
                    </Label>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card className="overflow-hidden shadow-none">
          <div className="d-flex mt-1 align-items-center mb-sm-0">
            <label className="mb-0" htmlFor="search-invoice"></label>
            <Input
              id="search-invoice"
              className="ms-50 w-50"
              placeholder="Recherche par mot clé"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="react-dataTable mt-1" id="electeur">
            <DataTable
              responsive
              pagination
              paginationComponentOptions={paginationComponentOptions}
              noDataComponent="Aucune données pour le moment"
              columns={candidats}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              data={Candidats?.filter((item) => {
                if (searchTerm == "") {
                  return item;
                } else if (
                  JSON.stringify(item)
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) != -1
                ) {
                  return item;
                }
              })}
            />
          </div>
        </Card>
      </Row>
    </>
  );
};

export default ListCandidats;
