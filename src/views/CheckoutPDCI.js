// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Icons Imports

// ** Custom Components

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText
} from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { useEffect } from "react"
import { isUserLoggedIn } from "../utility/Utils"
import Steps from "./components/Steps"

const CheckoutPDCI = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      navigate('/liste-electorale')
    }
  }, [])

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
              Effectuez un paiement sur place pour vos candidats 🚀
            </CardTitle>
            <CardText className="mb-2">
              {/* Make your app management easy and fun! */}
            </CardText>
            <Steps/>
            <p className="text-center mt-2">
              <span className="me-25">Vous avez déjà faire le paiement ?</span>
              <Link to="/inscription">
                <span>Créer votre compte maintenant</span>
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

export default CheckoutPDCI
