/* eslint-disable */

// ** React Imports
import { Fragment, useState, useEffect, useRef } from "react";

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share, FileText,
  File,
  MoreVertical
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Badge,
  Row,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Button
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserData } from "../../../utility/Utils";
import {
  getCirconscriptionAdmin,
  getDepartement,
  getElecteur,
  getElecteurByCommune,
  getElecteurByLieuVote,
  getLieuxVote,
  showElecteur
} from "../../../redux/store/Election";
import "./style.css"

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.electeur);

  const userData = getUserData();
  const departement = useSelector((state) => state.election.departement);
  const com = useSelector((state) => state.election.commune);
  const lieux = useSelector((state) => state.election.lieuxVote);
  const electeur = useSelector((state) => state.election.electeur);
  const bureauVote = useSelector((state) => state.election.bureauVote)
  const componentRef = useRef();

  const lieuxVoteData = [];
  const departementData = [];
  const comData = [];
  const bureauVoteData = [];

  departement?.map((item) => {
    departementData.push({ value: item.cod_dep, label: item.lib_dep });
  });

  com.map((item) => {
    comData.push({ value: item.cod_circonsAdmin, label: item.lib_circonAdmin });
  });

  lieux.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  bureauVote.map((item) => {
    bureauVoteData.push({ value: item.cod_bv, label: item.lib_bv });
  });


  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [idDep, setIdDep] = useState();
  const [idCom, setIdCom] = useState();
  const [idLv, setIdLv] = useState();

  // ** Function to toggle sidebar
   const columns = [
    {
      name: 'Electeur',
      sortable: true,
      minWidth: '300px',
      sortField: 'nom',
      selector: row => row.nom.concat(" ", row.prenoms),
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
              <span className='fw-bolder'>{row.nom.concat(" ", row.prenoms)}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Numero electeur',
      sortable: true,
      minWidth: '172px',
      sortField: 'num_electeur',
      selector: row => row.num_electeur,
      cell: row => (<Badge color='primary'> {row.num_electeur} </Badge>) 
    },
    {
      name: 'Sexe',
      minWidth: '138px',
      sortable: true,
      sortField: 'sexe',
      selector: row => row.sexe,
      cell: row => <span className='text-capitalize'>{row.sexe}</span>
    },
    {
      name: 'Date_naissance',
      minWidth: '230px',
      sortable: true,
      sortField: 'Date_naissance',
      selector: row => row.Date_naissance,
      cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
    },
    {
      name: 'Lieu_naissance',
      minWidth: '138px',
      sortable: true,
      sortField: 'Lieu_naissance',
      selector: row => row.Lieu_naissance,
      cell: row => row.Lieu_naissance
    },
    {
      name: 'Nom du pere',
      minWidth: '138px',
      sortable: true,
      sortField: 'nom_pere',
      selector: row => row.nom_pere,
      cell: row => row.nom_pere
    },
    {
      name: 'Nom de la mere',
      minWidth: '138px',
      sortable: true,
      sortField: 'nom_mere',
      selector: row => row.nom_mere,
      cell: row => row.nom_mere
    },
    {
      name: 'Profession',
      minWidth: '138px',
      sortable: true,
      sortField: 'profession',
      selector: row => row.profession,
      cell: row => row.profession
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <div className='column-action'>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className='w-100'
                to={'/modification-electeur'}
                onClick={() => dispatch(showElecteur({ numelecteur: row.num_electeur })) }
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'>Detail d'un électeur</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
  // // ** Get data on mount
  useEffect(() => {
    dispatch(getDepartement(userData.id_circons_er));
    dispatch(getLieuxVote(userData.id_circons_em))
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    if (select === "selectDep") {
      dispatch(
        getElecteur({
          idDep: idDep,
          idCand: userData.id_candidat,
          page: page.selected + 1,
        })
      );
    } else if (select === "selectCom") {
      dispatch(
        getElecteurByCommune({
          idCom: idCom,
          idCand: userData.id_candidat,
          page: page.selected + 1,
        })
      );
    } else {
      dispatch(
        getElecteurByLieuVote({
          idLv: idLv,
          idCand: userData.id_candidat,
          page: page.selected + 1,
        })
      );
    }
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = store.meta?.last_page;

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
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
                    setSelect("selectDep");
                    setIdDep(event.value);
                    dispatch(
                      getElecteur({
                        idDep: event.value,
                        idCand: userData.id_candidat,
                      })
                    );
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
                    setSelect("selectCom");
                    setCurrentPage(1)
                    setIdCom(event.value);
                    dispatch(getLieuxVote(event.value));
                    dispatch(getElecteurByCommune({
                      idCom: event.value,
                      idCand: userData.id_candidat
                    }))
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
                    setSelect("selectLv");
                    setIdLv(event.value);
                    dispatch(getElecteurByLieuVote({
                      idLv: event.value,
                      idCand: userData.id_candidat
                    }))
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
                    setIdLv(event.value);
                    dispatch(getElecteurByLieuVote({
                      idLv: event.value,
                      idCand: userData.id_candidat
                    }))
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
          ) : null}
        </CardBody>
      </Card>
        <CustomPagination />
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
                Rechercher:
              </label>
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                value={searchTerm}
                // onChange={(e) => handleFilter(e.target.value)}
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
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100]}
            data={electeur.data}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersList;
