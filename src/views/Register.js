// ** React Imports
import { Link } from "react-router-dom"

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather"

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import WizardModern from "./wizard/WizardModern"

const Register = () => {


  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">

        <Col className="d-none d-lg-flex align-items-center p-5" lg="2" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="8"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Inscrivez vous pour demarrer 🚀
            </CardTitle>
            <CardText className="mb-2">
              {/* Make your app management easy and fun! */}
            </CardText>
            <WizardModern/>
            <p className="text-center mt-2">
              <span className="me-25">Vous avez déjà un compte ?</span>
              <Link to="/login">
                <span>Se connecter</span>
              </Link>
            </p>
          </Col>
        </Col>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="2" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Register
