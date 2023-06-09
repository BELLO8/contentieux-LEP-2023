/* eslint-disable */

// ** Reactstrap Imports
import { Button, Form, Alert  } from 'reactstrap'
import { ArrowLeft, Check, AlertCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { register } from '../../../@core/auth/jwt/const'
import { useNavigate } from 'react-router-dom'
import PlanCard from '../../user/view/PlanCard'
const PaymentInfo = ({ stepper }) => {
  const navigate = useNavigate()
  const userRegister = useSelector(state => state.infoCandidat.user)
  const candidat = useSelector(state => state.infoCandidat.data)
  const url = `https://pay.apaym.com/institutjamawue/m=${candidat?.montant}/i=225/t=/n=/p=/e=b@gmail.com/r=paiement/k=${candidat?.cod_candidat}/l=1`
  console.log(userRegister)
  const {
    handleSubmit
  } = useForm()

  const onSubmit = () => {
    localStorage.setItem('candidatInfo', JSON.stringify(candidat))
    location. replace(url)
    // if (userRegister !== null) {
    //     register({
    //       username: userRegister.username,
    //       password: userRegister.password,
    //       id_candidat: userRegister.id_candidat
    //     }).then((res) => {
    //       if (res.data.status === "success") {
    //         toast(
    //           <div className='d-flex'>
    //             <div className='me-1'>
    //               <Avatar size='sm' color='success' icon={<Check size={12} />} />
    //             </div>
    //             <div className='d-flex flex-column'>
    //               <h6>{res.data.message}</h6>
    //             </div>
    //           </div>
    //         )
    //         navigate('/login')
    //       }
    //     })
    //     .catch((err) => {
    //         toast(
    //           <div className="d-flex">
    //             <div className="me-1">
    //               <Avatar
    //                 size="sm"
    //                 color="danger"
    //                 icon={<AlertCircle size={12} />}
    //               />
    //             </div>
    //             <div className="d-flex flex-column">
    //               <h6>{err.message}</h6>
    //             </div>
    //           </div>
    //         )
    //       console.log(err)
    //     })
    // }
  }

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={handleSubmit(onSubmit)}
    >
      
        {
          candidat?.montant < 1000000 ? (
              <><div className='payment-type'>
            <PlanCard userInfo={candidat} />
          </div><div className='d-flex justify-content-between'>
              <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                <span className='align-middle d-sm-inline-block d-none'>Précédent</span>
              </Button>
              <Button type='submit' color='success' className='btn-next'>
                <span className='align-middle d-sm-inline-block d-none'>Passer au paiement</span>
              </Button>
            </div></>
          ) : 
          (
            <><div className='payment-type'>
              <Alert color='danger'>
                <h4 className='alert-heading'>Montant trop élévé</h4>
                <div className='alert-body'>
                  Votre montant de : {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'XOF' }).format(candidat?.montant)} est trop élévé pour être payé sur cette plateforme
                  rendez vous au siege du PDCI pour le paiement .
                </div>
              </Alert>
            </div><div className='d-flex justify-content-between'>
                <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                  <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                  <span className='align-middle d-sm-inline-block d-none'>Précédent</span>
                </Button>
              </div></>
          )
        }
      
     
     

    </Form>
  )
}

export default PaymentInfo
