// ** Icon Imports

// ** Reactstrap Imports
import { Button, Form } from 'reactstrap'
import { ArrowLeft, Check, AlertCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { register } from '../../../@core/auth/jwt/const'
import { useNavigate } from 'react-router-dom'
const PaymentInfo = ({ stepper }) => {
  const navigate = useNavigate()
  const userRegister = useSelector(state => state.infoCandidat.user)
  //const candidat = useSelector(state => state.infoCandidat.data)
  
  console.log(userRegister)
  const {
    handleSubmit
  } = useForm()

  const onSubmit = () => {
    if (userRegister !== null) {
        register({
          username: userRegister.username,
          password: userRegister.password,
          id_candidat: userRegister.id_candidat
        }).then((res) => {
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
            navigate('/login')
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
  }

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='payment-type'>
      <iframe src='https://pay.apaym.com/institutjamawue' width={820} height={500} ></iframe>
      </div>
      <div className='d-flex justify-content-between'>
        <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
          <span className='align-middle d-sm-inline-block d-none'>Previous</span>
        </Button>
        <Button type='submit' color='success' className='btn-next' >
              <span className='align-middle d-sm-inline-block d-none'>Passer au paiement</span>
        </Button>
      </div>

    </Form>
  )
}

export default PaymentInfo
