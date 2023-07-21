/* eslint-disable */

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Invoice List Sidebar

// ** Table Columns
import { columns } from "../components/columns";

// ** Store & Actions
// import { getAllData, getData } from '../store'
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
  Button,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserData } from "../../utility/Utils";
import {
  getCirconscriptionAdmin,
  getDepartement,
  getElecteur, getLieuxVote,
  getParent,
  getParent20
} from "../../redux/store/Election";
import { getCirconscription } from "../../redux/store/Circonscription";
import CustomPagination from "../components/CustomPagination";
import Circons from "../components/circons";


const ListeAnomalies = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.parent);

  const userData = getUserData();
  const parents = useSelector((state) => state.election.parent);
  const departement = useSelector((state) => state.election.departement);
  const com = useSelector((state) => state.election.commune);
  const region = useSelector((state) => state.circonscription.data)
  const lieux = useSelector((state) => state.election.lieuxVote);

  const parentData = parents.data === undefined ? [] : parents.data

  const departementData = [];
  const comData = [];
  const regionData = [];
  const lieuxVoteData = [];
 
  departement?.map((item) => {
    departementData.push({ value: item.cod_dep, label: item.lib_dep });
  });

  
  com?.map((item) => {
    comData.push({ value: item.cod_circonsAdmin, label: item.lib_circonAdmin });
  });

  region.map((item) => {
    regionData.push({value:item.id_circons, label:item.circons});
  });

  lieux.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  const dataContentieux = [
    { lv: 'electeurPereInconnuByLieuVote',region:'electeurPereInconnuByRegion',circons:'electeurPereInconnuByCircons',dep:'electeurPereInconnuByDep', label: "Pères inconnus" },
    { lv: 'electeurMereInconnuByLieuVote',region:'electeurMereInconnuByRegion',circons:'electeurMereInconnuByCircons',dep:'electeurMereInconnuByDep', label: " Mères inconnues" },
    { lv: 'electeurPereMereInconnusByLieuVote',region:'electeurPereMereInconnusByRegion',circons:'electeurPereMereInconnusByCircons',dep:'electeurPereMereInconnusByDep', label: "Pères et Mères inconnus" },
  ]

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [endpoint, setEndPoint] = useState();
  const [url, setUrl] = useState()
  useEffect(() => {
    userData.id_circons_er !== null
      ? dispatch(getDepartement(userData.id_circons_er))
      : userData.id_circons_em !== null ?
        dispatch(getLieuxVote(userData.id_circons_em)) : dispatch(getCirconscription(2))
        
    
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(getParent({ ...endpoint, page: page.selected + 1 }))   
    setCurrentPage(page.selected + 1);
  };


  return (
    <Fragment>
      <Circons/>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Typologie des anomalies par filtre de recherche</CardTitle>
        </CardHeader>
        <CardBody>
        {userData.type_election === "2" ? (
            <Row>
               <Col md="3">
              <Label for="status-select">Sélectionnez une anomalie</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={dataContentieux}
                onChange={(e) =>  {
                  setUrl(e)
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
                  onChange={(e) => {
                    setCurrentPage(1)
                    setEndPoint({uri:url.dep,id: e.value})
                    dispatch(getParent({uri:url.dep,id: e.value}))
                    dispatch(getCirconscriptionAdmin(e.value));
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="3">
                <Label for="plan-select">Filtre par commune</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={comData}
                  onChange={(e) => {
                    setCurrentPage(1)
                    dispatch(getLieuxVote(e.value));
                    setCurrentPage(1)
                    setEndPoint({uri:url.circons,id: e.value})
                    dispatch(getParent({uri:url.circons,id: e.value}))
                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Filtre par lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(e) => {
                    setCurrentPage(1)
                    setEndPoint({uri:url.lv,id: e.value})
                    dispatch(getParent({uri:url.lv,id: e.value}))
                   }}
                />
              </Col>
            </Row>
          ) : userData.type_election === "1" ? (
            <Row>
              <Col md="3">
              <Label for="status-select">Sélectionnez une anomalie</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={dataContentieux}
                onChange={(e) =>  {
                  setUrl(e)
                }}
              />
              </Col>
              <Col md="3">
                <Label for="status-select">Filtre par lieux de vote</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={lieuxVoteData}
                  onChange={(e) => {
                    setCurrentPage(1)
                    setEndPoint({uri:url.lv,id: e.value})
                    dispatch(getParent({uri:url.lv,id: e.value}))
                   }}
                />
              </Col>
            </Row>
          ) : (
            <Row>
               <Col md="3">
              <Label for="status-select">Sélectionnez une anomalie</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={dataContentieux}
                onChange={(e) =>  {
                  setUrl(e)
                }}
              />
            </Col>
            <Col md="3">
                  <Label for="status-select">Filtre par région</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    //options={regionData}
                    // onChange={(event) => {
                    //   setCurrentPage(1)
                    //   setEndPoint({ uri: 'admin/electeurbyRegion/2023', id: event.value})
                    //   dispatch(getDepartement(event.value))
                    //   dispatch(getElecteurGlobal({ uri: 'admin/electeurbyRegion/2023', id: event.value}))
                      
                    // }}
                  />
                </Col>
                <Col md="3">
                  <Label for="status-select">Filtre par département</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    //options={departementData}
                    // onChange={(event) => {
                    //   setCurrentPage(1)
                    //   setEndPoint({ uri: 'admin/electeurbydep/2023', id: event.value})
                    //   dispatch(getElecteurGlobal({ uri: 'admin/electeurbydep/2023', id: event.value}))
                    //   dispatch(getCirconscriptionAdmin(event.value));
                    // }}
                  />
                </Col>
                <Col className="my-md-0 my-1" md="3">
                  <Label for="plan-select">Filtre par commune</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    //options={comData}
                    // onChange={(event) => {
                    //   setCurrentPage(1)
                    //   setEndPoint({ uri: 'admin/electeurbycommune/2023', id: event.value})
                    //   dispatch(getLieuxVote(event.value));
                    //   dispatch(getElecteurGlobal({ uri: 'admin/electeurbycommune/2023', id: event.value}))
  
                    // }}
                  />
                </Col>
                <Col md="3">
                <Label for="status-select">Filtre par lieux de vote</Label>
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
        <h5>{parents.meta?.total === undefined ? '' : parents.meta?.total +' '+'élements trouvés' } </h5>
      <Card className="overflow-hidden">
        <div className="react-dataTable" id="electeur">
          <DataTable
            pagination
            responsive
            columns={columns}
            noDataComponent='aucune données'
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100]}
            data={parents.data}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default ListeAnomalies;
