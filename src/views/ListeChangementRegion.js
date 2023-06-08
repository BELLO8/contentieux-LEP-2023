/* eslint-disable */

// ** React Imports
import { Fragment, useEffect, useState } from "react";


// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown
} from "react-feather";
import ReactPaginate from "react-paginate";

// ** Utils

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Progress,
  Row,
  Spinner
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  changeRegionByCommune,
  changeRegionByRegion,
  getDoublons
} from "../redux/store/Election";
import { getUserData } from "../utility/Utils";

// ** Table Header


const ListeChangementRegion = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.Electeur);

  const userData = getUserData();
  const lieux = useSelector((state) => state.election.lieuxVote);
  const electeur = useSelector((state) => state.election.Electeur);


  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pending, setPending] = useState(true);

  // // ** Get data on mount
  useEffect(() => {
    dispatch(changeRegionByRegion({idRegion: userData.id_circons_er})).then(() => setPending(false));
    dispatch(changeRegionByCommune({idCom: userData.id_circons_em})).then(() => setPending(false));
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setPending(true)
    dispatch(changeRegionByCommune({
      idCom: userData.id_circons_em,
      page: page.selected + 1,
     })).then(() => setPending(false))

   dispatch(changeRegionByRegion({
    idRegion: userData.id_circons_er,
    page: page.selected + 1,
   })).then(() => setPending(false))
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };


   const columns = [
    {
      name: 'Electeur',
      sortable: true,
      minWidth: '300px',
      sortField: 'nom',
      selector: row => row.nom.concat(" ", row.prenom),
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
              <span className='fw-bolder'>{row.nom.concat(" ", row.prenom)}</span>
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
      name: 'Date naissance',
      minWidth: '230px',
      sortable: true,
      sortField: 'Date_naissance',
      selector: row => row.Date_naissance,
      cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
    },
    {
      name: 'Lieu naissance',
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
      name: 'Profession',
      minWidth: '138px',
      sortable: true,
      sortField: 'profession',
      selector: row => row.profession,
      cell: row => row.profession
    },
    {
      name: 'Region 2020',
      minWidth: '138px',
      sortable: true,
      sortField: 'region2020',
      selector: row => row.region2020,
      cell: row => row.region2020
    },
    {
      name: 'Region 2023',
      minWidth: '138px',
      sortable: true,
      sortField: 'region2023',
      selector: row => row.region2023,
      cell: row => row.region2023
    }
  ]

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
          <CardTitle tag="h4">Liste des électeurs qui ont changé de région</CardTitle>
        </CardHeader>
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
            pagination
            responsive
            noDataComponent=''
            progressPending={pending}
			      progressComponent={<Spinner color='primary' size='xl' />}
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

export default ListeChangementRegion;
