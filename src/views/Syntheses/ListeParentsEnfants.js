/* eslint-disable */

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Invoice List Sidebar

// ** Table Columns
import { columnsEnfantMere, columnsEnfantPereMere, columnsMere, columnsPere, columnsPereMere } from "../components/columns";

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
  getDepartement, getLieuxVote, getParent20
} from "../../redux/store/Election";
import { getCirconscription } from "../../redux/store/Circonscription";
import CustomPagination from "../components/CustomPagination";
import Circons from "../components/circons";


const ListeParentsEnfant = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [endpoint, setEndPoint] = useState();
  const [col, setCol] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  
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
    { value:'pereplusde20',col:columnsPere, label: "Pères ayant plus de 20 enfants" },
    { value:'mereplusde20',col:columnsMere, label: " Mères ayant plus de 20 enfants" },
    {value:'merepereplusde20',col:columnsPereMere, label: "Pères et Mères ayant plus de 20 enfants" },
    { value:'Enfantperemereplusde20',col:columnsEnfantPereMere, label: "Enfant concerné pères et mère plus de 20 enfants" },
    { value:'Enfantmereplusde20',col:columnsEnfantMere, label: "Enfant concerné mères  plus de 20 enfants" },
    // {com:'',region:'',label:'Mineurs'},
    // {com:'',region:'',label:'Centenaire'},
    // {com:'',region:'',label:'Doublons'},
    // {com:'',region:'',label:'Nouveau inscrit'},
    // {com:'',region:'',label:'Conserver la circonscription et changé de lieu de vote'},
    // {com:'',region:'',label:'Conserver leur région et changé de département'},
    // {com:'',region:'',label:'Electeurs qui ont changé de région'},
  ]



  useEffect(() => {
    userData.id_circons_er !== null
      ? dispatch(getDepartement(userData.id_circons_er))
      : userData.id_circons_em !== null ?
        dispatch(getLieuxVote(userData.id_circons_em)) : dispatch(getCirconscription(2))
        
    
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(getParent20({ ...endpoint, page: page.selected + 1 }))   
    setCurrentPage(page.selected + 1);
  };


  return (
    <Fragment>
      <Circons/>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Typologie des anomalies</CardTitle>
        </CardHeader>
        <CardBody>
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
                  setEndPoint({uri:e.value})
                  setCol(e.col)
                  dispatch(getParent20({uri:e.value}))
                }}
              />
            </Col>
              
            </Row>
         
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
            columns={col}
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

export default ListeParentsEnfant;
