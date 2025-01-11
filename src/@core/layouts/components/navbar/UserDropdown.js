/* eslint-disable */

import { useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { Power } from "react-feather";

// ** Reactstrap Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { handleLogout } from "../../../../redux/auth";
import { getUserData, isUserLoggedIn } from "../../../../utility/Utils";

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
          </h6>{" "}
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
