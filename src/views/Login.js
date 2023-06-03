/* eslint-disable */

import { Link, useNavigate } from "react-router-dom"
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
import { login } from "../@core/auth/jwt/const"
import { useForm, Controller } from "react-hook-form"
import { getHomeRouteForLoggedInUser } from "../utility/Utils"
import { handleLogin } from "../redux/auth"
import { useDispatch } from "react-redux"

const defaultValues = {
  password: "",
  username: ""
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      login({
          username: data.username,
          password: data.password
        })
        .then((res) => {
          const Token = res.data.data.token
          if (res.data.status === "success") {
            const data = {
              ...res.data.data.candidat,
              accessToken: Token,
              refreshToken: res.data.refreshToken
            }
            dispatch(handleLogin(data))
            navigate(getHomeRouteForLoggedInUser(data.type_election))
            
          } else {
            alert(res.data.message)
          }
        })
        .catch((err) => console.log(err))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Bienvenue sur Contentieux-LEP-2023 ! 👋
            </CardTitle>
            <CardText className='mb-2'>Connectez-vous à votre compte et commencez l'aventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-username'>
                  Username
                </Label>
                <Controller
                  id="username"
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="username"
                      invalid={errors.username && true}
                      {...field}
                    />
                  )}
                />              
                </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />             
                </div>
             
              <Button type='submit' color='primary' block>
                Se connecter
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
