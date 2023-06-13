/* eslint-disable */

// ** Reactstrap Imports
import { Button, Form } from 'reactstrap'
import { ArrowLeft, Check, AlertCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { verifyPayment } from '../../@core/auth/jwt/const'
import { useNavigate } from 'react-router-dom'
import PlanCard from './PlanCard'

const PaymentPdci = ({ stepper }) => {
  const navigate = useNavigate()
  const userRegister = useSelector(state => state.infoCandidat.user)
  const candidat = useSelector(state => state.infoCandidat.data)
  console.log(userRegister)
  const {
    handleSubmit
  } = useForm()

  const onSubmit = () => {
    localStorage.setItem('candidatInfo', JSON.stringify(candidat))
    verifyPayment({
      id_order:candidat?.montant,
      status_order:"success",
      id_transaction:candidat?.cod_candidat
    })
    .then((res) => {
          if (res.data.status === "success") {
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
            navigate('/inscription')
          }
        })
         .catch((err) => {
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar
                    size="sm"
                    color="danger"
                    icon={<AlertCircle size={12} />}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6>{err.message}</h6>
                </div>
              </div>
            )
          console.log(err)
        })
  
  }

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={handleSubmit(onSubmit)}
    >
    <div className='payment-type'>
      <PlanCard userInfo={candidat} />
    </div><div className='d-flex justify-content-between'>
        <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
          <span className='align-middle d-sm-inline-block d-none'>Précédent</span>
        </Button>
        <Button type='submit' color='success' className='btn-next'>
          <span className='align-middle d-sm-inline-block d-none'>Valider le paiement</span>
        </Button>
      </div>
    </Form>
  )
}

export default PaymentPdci
