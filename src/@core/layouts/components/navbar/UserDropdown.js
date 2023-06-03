// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User, Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"
import { useEffect, useState } from "react"
import { isUserLoggedIn } from "../../../../utility/Utils"
import { useDispatch } from "react-redux"
import { handleLogout } from "../../../../redux/auth"

// ** Default Avatar Image

const UserDropdown = () => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userProfil')))
    }
  }, [])

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{ userData !== null ? userData.nom : '' }</span>
          <span className="user-status">{ userData !== null ? userData.role : '' }</span>
        </div>
        <Avatar
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem onClick={() => { 
          dispatch(handleLogout())
          navigate('/login')
          }}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
