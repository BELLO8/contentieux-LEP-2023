/* eslint-disable */

// ** React Imports
import { Fragment, useState } from "react";

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Utils

// ** Reactstrap Imports
import {
  Button,
  Card,
  Label,
  CardBody,
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
  anomalie
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";
import Circons from "../components/circons";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { centenaire, changeDep, changeLv, changeRegion, doublon, mineur, nouveauInscrit } from "../components/columns";

// ** Table Header

const Anomalies = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.election.anomalie);

  const userData = getUserData();
  const lieux = useSelector((state) => state.election.lieuxVote);
  const electeur = useSelector((state) => state.election.anomalie);

  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pending, setPending] = useState();
  const [col, setCol] = useState();
  const [endpoint,setEndpoint] = useState()
  // // ** Get data on mount

  // useEffect(() => {
  //   dispatch(getDoublons(userData.id_circons_er)).then(() => setPending(false));
  //   dispatch(doublonbycommune(userData.id_circons_em)).then(() => setPending(false));
  // }, [dispatch]);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(anomalie({ ...endpoint, page: page.selected + 1 }))
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };


  const dataContentieux = [
    {
      com: "electeurMineurByCommune",
      region: "electeurMineurByRegion",
      col:mineur,
      label: "Mineurs",
    },
    {
      com: "electeurCentenaireByCommune",
      region: "electeurCentenaireByRegion",
      col:centenaire,
      label: "Centenaire",
    },
    { com: "doublonbycommune", region: "doublon",col:doublon, label: "Doublons" },
    {
      com: "newinscritbyCircons",
      region: "newinscritbyRegion",
      col:nouveauInscrit,
      label: "Nouveau inscrit",
    },
    {
      com: "conservCirconsChangeLVByCommune",
      region: "conservCirconsChangeLieuVoteByRegion",
      col:changeLv,
      label: "Conserver la circonscription et changé de lieu de vote",
    },
    {
      com: "conservRegionChangeDepByCommune",
      region: "conservRegionChangeDepByRegion",
      col:changeDep,
      label: "Conserver leur région et changé de département",
    },
    {
      com: "changeRegionByCommune",
      region: "changeRegionByRegion",
      col:changeRegion,
      label: "Electeurs qui ont changé de région",
    },
  ];
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
      <Circons />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Liste des anomalies</CardTitle>
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
                onChange={(e) => {
                  userData.id_circons_er !== null
                    ? dispatch(
                        anomalie({ url: e.region, id: userData.id_circons_er })
                      ).then(() => {
                        setEndpoint({ url: e.region, id: userData.id_circons_er })
                        setCol(e.col)
                        setPending(false)
                      })
                    : userData.id_circons_em !== null
                    ? dispatch(
                        anomalie({ url: e.com, id: userData.id_circons_em })
                      ).then(() => {
                        setEndpoint({ url: e.com, id: userData.id_circons_em })
                        setCol(e.col)
                        setPending(false)
                      })
                    : null;
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <CustomPagination />
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row>
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center table-header-actions">
              <Button
                color="primary"
                onClick={() => {
                  const printContent =
                    document.getElementById("electeur").innerHTML;
                  const originalContent = document.body.innerHTML;
                  document.body.innerHTML = printContent;
                  window.print();
                  document.body.innerHTML = originalContent;
                }}
              >
                {" "}
                Imprimer les données
              </Button>
            </div>
          </Col>
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
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
      <h5>
        {electeur.meta?.total === undefined
          ? ""
          : electeur.meta?.total + " " + "élements trouvés"}{" "}
      </h5>
      <Card className="overflow-hidden">
        <div className="react-dataTable" id="electeur">
          <DataTable
            pagination
            responsive
            progressPending={pending}
            progressComponent={<Spinner color="primary" size="xl" />}
            columns={col}
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

export default Anomalies;
