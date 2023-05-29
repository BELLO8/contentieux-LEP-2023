import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card, CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"
import "@styles/react/pages/page-authentication.scss"
import InputPasswordToggle from "@components/input-password-toggle"
const Login = () => {

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Bienvenue sur Contentieux-LEP-2023 ! 👋
            </CardTitle>
            <CardText className='mb-2'>Connectez-vous à votre compte et commencez l'aventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                  </Link>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password' />
              </div>
             
              <Button color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'> 
              <span className='me-25'>Nouveau sur notre plateforme?</span>
              <Link to='/register'>
                <span>créer un compte</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
