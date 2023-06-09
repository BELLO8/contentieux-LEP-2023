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
import { register } from "../@core/auth/jwt/const"
import { useForm, Controller } from "react-hook-form"
import { isUserLoggedIn } from "../utility/Utils"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import toast from 'react-hot-toast'
import { RegisterCandidant } from "../redux/store/Election"

const defaultValues = {

}

const Register = () => {
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
  const CodeCand = JSON.parse(localStorage.getItem('candidatInfo'))
    if (Object.values(data).every((field) => field.length > 0)) {
      register({
          username: data.username,
          password: data.password,
          id_candidat: CodeCand?.cod_candidat
        })
        .then((res) => {
          if (res.data.status === "success") {
            localStorage.removeItem('candidatInfo')
            toast(
              <div className='d-flex'>
                <div className='me-1'>
                  <Avatar size='sm' color='success' icon={<Check size={12} />} />
                </div>
                <div className='d-flex flex-column'>
                  <h6>{res.data.message}</h6>
                </div>
              </div>
            )
            navigate('/login')
          }else if(res.data.status === "error"){
              toast(
                <div className='d-flex'>
                  <div className='me-1'>
                    <Avatar size='sm' color='danger' icon={<AlertCircle size={12}/>} />
                  </div>
                  <div className='d-flex flex-column'>
                    <h6>{res.data.message}</h6>
                    <Link to='/paiement-candidat'>
                    payer maintenant
                  </Link>
                  </div>
                </div>
              )
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
              Inscription sur Contentieux-LEP-2023 ! 👋
            </CardTitle>
            <CardText className='mb-2'>Créer votre compte et commencez votre aventure</CardText>
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
            <p className="text-center mt-2">
              <span className="me-25">Vous avez déjà un compte ?</span>
              <Link to="/login">
                <span>Se connecter</span>
              </Link>
            </p>
            <p className="text-center mt-2">
              <span className="me-25">Pas encore payé ?</span>
              <Link to="/paiement-candidat">
                <span>Payer maintenant</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Register
