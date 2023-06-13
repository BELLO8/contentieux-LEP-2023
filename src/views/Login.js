/* eslint-disable */

import { Link, useNavigate } from "react-router-dom"
import {
  Card, CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"
import { AlertCircle } from 'react-feather'
import Avatar from '@components/avatar'
import "@styles/react/pages/page-authentication.scss"
import InputPasswordToggle from "@components/input-password-toggle"
import { login } from "../@core/auth/jwt/const"
import { useForm, Controller } from "react-hook-form"
import { getHomeRouteForLoggedInUser, isUserLoggedIn } from "../utility/Utils"
import { handleLogin } from "../redux/auth"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import toast from 'react-hot-toast'

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

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      navigate('/liste-electorale')
    }
  }, [])

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      login({
          username: data.username,
          password: data.password
        })
        .then((res) => {
          console.log(res)
          const Token = res.data.data.token
          if (res.data.status === "success") {
            const data = {
              ...res.data.data.candidat,
              role:"candidat",
              accessToken: Token,
              refreshToken: res.data.refreshToken
            }
            dispatch(handleLogin(data))
            navigate(getHomeRouteForLoggedInUser("candidat"))
          }
        })
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST"){
            toast(
              <div className='d-flex'>
                <div className='me-1'>
                  <Avatar size='sm' color='danger' icon={<AlertCircle size={12}/>} />
                </div>
                <div className='d-flex flex-column'>
                  <h6>{err.response.data.message}</h6>
                </div>
              </div>
            )
          }else{
             toast(
              <div className='d-flex'>
                <div className='me-1'>
                  <Avatar size='sm' color='danger' icon={<AlertCircle size={12}/>} />
                </div>
                <div className='d-flex flex-column'>
                  <h6>{err.message}</h6>
                </div>
              </div>
            )
          }
           
          console.log(err)
        })
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Bienvenue sur JamElec ! 👋
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
                      required
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
                      required
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
              <Link to='/inscription'>
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
