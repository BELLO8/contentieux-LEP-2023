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
  Row,
  Spinner
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  getDoublons
} from "../redux/store/Election";
import { getUserData } from "../utility/Utils";

// ** Table Header


const ListeDoublons = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.electeurdoublons);

  const userData = getUserData();
  const lieux = useSelector((state) => state.election.lieuxVote);
  const electeur = useSelector((state) => state.election.electeurdoublons);
  

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pending, setPending] = useState(true)
  // // ** Get data on mount
  useEffect(() => {
    dispatch(getDoublons(userData.id_circons_er)).then(() => setPending(false));
  }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
   
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
      selector: row => row.numelecteur,
      cell: row => (<Badge color='primary'> {row.numelecteur} </Badge>) 
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
      selector: row => row.datenaiss,
      cell: row => <span className='text-capitalize'>{row.datenaiss}</span>
    },
    {
      name: 'Lieu naissance',
      minWidth: '138px',
      sortable: true,
      sortField: 'Lieu_naissance',
      selector: row => row.lieunaiss,
      cell: row => row.lieunaiss
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
          <CardTitle tag="h4">Liste des doublons</CardTitle>
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
            progressPending={pending}
			      progressComponent={<Spinner color='primary' size='xl' />}
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100]}
            data={electeur}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default ListeDoublons;
