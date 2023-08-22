/* eslint-disable */

// ** React Imports
import { Fragment, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Utils

// ** Reactstrap Imports
import {
  Col,
  Card,
  Input
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserData } from "../../utility/Utils";
import "../style.css";
import { columns } from "./columns";
import { getRepresentant } from "../../redux/store/Representant";

const UsersList = ({ idlv, idbv }) => {
  // ** Store VUsersListars
  const dispatch = useDispatch();
  const user = getUserData();
  const store = useSelector((state) => state.representant.representant.data);

  const [searchTerm, setSearchTerm] = useState("");

  let data = store?.filter(function (param) {
    return param.id_lieu_vote == idlv && param.id_bureau_vote == idbv;
  });

  useEffect(() => {
    dispatch(getRepresentant());
  }, [dispatch]);

  return (
    <Fragment>
      <Col xl="6">
        {/* <div className="d-flex align-items-center mt-2 mb-sm-0 mb-1 me-1">
          <label className="mb-0" htmlFor="search-invoice"></label>
          <Input
            id="search-invoice"
            className="ms-50 w-100"
            placeholder="Recherche par mot clé"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
      </Col>
      <Card className="overflow-hidden shadow-none mt-2">
        <div className="react-dataTable" id="electeur">
          <DataTable
            responsive
            noDataComponent="Aucune données pour le moment"
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            data={data?.filter((item) => {
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
    </Fragment>
  );
};

export default UsersList;
