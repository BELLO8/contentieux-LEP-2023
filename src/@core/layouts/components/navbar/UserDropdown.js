/* eslint-disable */

import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { User, Power } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { useEffect, useState } from "react";
import { getUserData, isUserLoggedIn } from "../../../../utility/Utils";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../../redux/auth";

// ** Default Avatar Image

const UserDropdown = () => {
  const [userData, setUserData] = useState(null);
  const user = getUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userProfil")));
    }
  }, []);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <h6 style={{ fontWeight: "bold" }}>
            {user?.role === "parti" ? user?.username : user?.nom}
          </h6>
          <span className="user-status fw-bold text-warning">
            {user?.role !== "parti"
              ? user?.role + " " + user?.lib_parti
              : "Administrateur"}
          </span>
        </div>
        <Avatar imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          onClick={() => {
            dispatch(handleLogout());
            {
              user?.role === "parti"
                ? navigate("/jamawe/login")
                : navigate("/login");
            }
          }}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Deconnexion</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
