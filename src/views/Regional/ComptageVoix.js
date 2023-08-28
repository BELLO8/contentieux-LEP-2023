/* eslint-disable */
import React, { useEffect } from "react";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "../style.css";
import { useState } from "react";
import {
  Col,
  Input
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCommuneByRegion } from "../../redux/store/Election";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CommuneCard from "../Components/CommuneCard";

export default function ComptageVoix() {
  const dispatch = useDispatch();
  const communes = useSelector((state) => state.election.communeByRegion);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCommuneByRegion());
  }, [dispatch]);
  return (
    <>
      <BreadCrumbs title="Dépouillement" url="/" data={[]} />
      
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
        route={"/comptageVoix/"}
      />
    </>
  );
}
