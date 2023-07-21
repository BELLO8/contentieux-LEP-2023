/* eslint-disable */

// ** React Imports
import { Fragment, useState, useEffect, useRef } from "react";


import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import DataTable from "react-data-table-component";
import {
  ChevronDown
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader, Button
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserData } from "../../utility/Utils";
import {
  getCirconscriptionAdmin,
  getDepartement,
  getElecteur,
  getElecteurGlobal, getLieuxVote
} from "../../redux/store/Election";
import "../style.css";
import { getCirconscription } from "../../redux/store/Circonscription";
import { columnsListElectoral } from "./columns";
import CustomPagination from "./CustomPagination";

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.electeur);

  const userData = getUserData();
  const departement = useSelector((state) => state.election.departement);
  const com = useSelector((state) => state.election.commune);
  const lieux = useSelector((state) => state.election.lieuxVote);
  const electeur = useSelector((state) => state.election.electeur);
  const region = useSelector((state) => state.circonscription.data)
  const componentRef = useRef();

  const electeurData = electeur.data === undefined ? [] : electeur.data

  const lieuxVoteData = [];
  const departementData = [];
  const comData = [];
  const regionData = [];

  departement?.map((item) => {
    departementData.push({ value: item.cod_dep, label: item.lib_dep });
  });

  com?.map((item) => {
    comData.push({ value: item.cod_circonsAdmin, label: item.lib_circonAdmin });
  });

  lieux.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  region.map((item) => {
    regionData.push({value:item.id_circons, label:item.circons});
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [endpoint, setEndPoint] = useState();


  useEffect(() => {
    dispatch(getDepartement(userData.id_circons_er));
    dispatch(getLieuxVote(userData.id_circons_em))
    dispatch(getCirconscription(2))
  }, [dispatch]);

  
  const handlePagination = (page) => {
    userData.role === "candidat"
      ? dispatch(getElecteur({ ...endpoint, page: page.selected + 1 }))
      : dispatch(getElecteurGlobal({ ...endpoint, page: page.selected + 1 }))    

    // if (select === "selectDep") {
    //   dispatch(
    //     getElecteur({
    //       idDep: idDep,
    //       idCand: userData.id_candidat,
    //       page: page.selected + 1,
    //     })
    //   );
    // } else if (select === "selectCom") {
    //   dispatch(
    //     getElecteurByCommune({
    //       idCom: idCom,
    //       idCand: userData.id_candidat,
    //       page: page.selected + 1,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     getElecteurByLieuVote({
    //       idLv: idLv,
    //       idCand: userData.id_candidat,
    //       page: page.selected + 1,
    //     })
    //   );
    // }

    setCurrentPage(page.selected + 1);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filtre des données</CardTitle>
        </CardHeader>
        <CardBody>
          {userData.type_election === "2" ? (
            <Row>
              <Col md="3">
                <Label for="status-select">Département</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={departementData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({uri:'electeurbydep/2023',id: event.value, idCand:userData.id_candidat});
                    dispatch(getElecteur({uri:'electeurbydep/2023',id: event.value, idCand:userData.id_candidat}))
                    dispatch(getCirconscriptionAdmin(event.value));
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="3">
                <Label for="plan-select">Circonscription administrative</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={comData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    dispatch(getLieuxVote(event.value));
                    setEndPoint({uri:'electeurbycommune/2023',id: event.value, idCand:userData.id_candidat});
                    dispatch(getElecteur({uri:'electeurbycommune/2023',id: event.value, idCand:userData.id_candidat}))
                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({uri:'electeurbyLieuVote/2023',id: event.value, idCand:userData.id_candidat});
                    dispatch(getElecteur({uri:'electeurbyLieuVote/2023',id: event.value, idCand:userData.id_candidat}))
                  }}
                />
              </Col>
            </Row>
          ) : userData.type_election === "1" ? (
            <Row>
              <Col md="3">
                <Label for="status-select">Lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({uri:'electeurbyLieuVote/2023',id: event.value, idCand:userData.id_candidat});
                    dispatch(getElecteur({uri:'electeurbyLieuVote/2023',id: event.value, idCand:userData.id_candidat}))
                  }}
                />
              </Col>
              {/* <Col md="3">
                <Label for="status-select">Bureau de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={bureauVoteData}
                  onChange={(data) => {
                    setCurrentSous(data);
                  }}
                />
              </Col> */}
            </Row>
          ) : (

            <Row>
              <Col md="3">
                <Label for="status-select">Région</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={regionData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({ uri: 'admin/electeurbyRegion/2023', id: event.value})
                    dispatch(getDepartement(event.value))
                    dispatch(getElecteurGlobal({ uri: 'admin/electeurbyRegion/2023', id: event.value}))
                    
                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Département</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={departementData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({ uri: 'admin/electeurbydep/2023', id: event.value})
                    dispatch(getElecteurGlobal({ uri: 'admin/electeurbydep/2023', id: event.value}))
                    dispatch(getCirconscriptionAdmin(event.value));
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="3">
                <Label for="plan-select">Circonscription administrative</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={comData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({ uri: 'admin/electeurbycommune/2023', id: event.value})
                    dispatch(getLieuxVote(event.value));
                    dispatch(getElecteurGlobal({ uri: 'admin/electeurbycommune/2023', id: event.value}))

                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(event) => {
                    setCurrentPage(1)
                    setEndPoint({ uri: 'admin/electeurbyLieuVote/2023', id: event.value})
                    dispatch(getElecteurGlobal({ uri: 'admin/electeurbyLieuVote/2023', id: event.value}))
                  }}
                />
              </Col>
            </Row>

          )}
        </CardBody>
      </Card>
        <CustomPagination store={store} currentPage={currentPage} handlePagination={handlePagination} />
        <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center table-header-actions">
              
              <Button color="primary" onClick={() => {
                        const printContent = document.getElementById('electeur').innerHTML;
                        const originalContent = document.body.innerHTML;
                        document.body.innerHTML = printContent;
                        window.print();
                        document.body.innerHTML = originalContent;
                  }}> Imprimer les données</Button>
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <label className="mb-0" htmlFor="search-invoice">
              </label>
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                placeholder="Recherche par mot clé"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
        </Row>
        </div>
        <h5>{electeur.meta?.total === undefined ? '' : electeur.meta?.total +' '+'élements trouvés' } </h5>
      <Card className="overflow-hidden">
        <div className="react-dataTable" id="electeur">
          <DataTable
            ref={componentRef}
            pagination
            responsive
            noDataComponent='aucune données pour le moment'
            columns={columnsListElectoral}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100]}
            data={electeurData.filter((item) => {
              if( searchTerm == "") {
                return item
              }else if (
                JSON.stringify(item).toLowerCase().indexOf(searchTerm.toLowerCase()) !=-1
              ) {
                return item;
              }
            })}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersList;
