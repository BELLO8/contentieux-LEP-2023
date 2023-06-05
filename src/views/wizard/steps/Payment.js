// ** Icon Imports

// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Form, Input, Label, Row } from 'reactstrap'
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
          } else { 
              toast(
                <div className='d-flex'>
                  <div className='me-1'>
                    <Avatar size='sm' color='danger' icon={<AlertCircle size={12}/>} />
                  </div>
                  <div className='d-flex flex-column'>
                    <h6>{res.data.message}</h6>
                  </div>
                </div>
              )
          }
        })
    }
  }

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='payment-type'>
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Payment options</CardTitle>
            <CardText className='text-muted mt-25'>Be sure to click on correct payment option</CardText>
          </CardHeader>
          <CardBody>
            <h6 className='card-holder-name my-75'>John Doe</h6>
            <div className='form-check mb-2'>
              <Input defaultChecked id='us-card' type='radio' name='paymentMethod' />
              <Label className='form-check-label' htmlFor='us-card'>
                US Unlocked Debit Card 12XX XXXX XXXX 0000
              </Label>
            </div>
            <Row className='customer-cvv mt-1 row-cols-lg-auto'>
              <Col xs={3} className='d-flex align-items-center'>
                <Label className='mb-50' for='card-holder-cvv'>
                  Enter CVV:
                </Label>
              </Col>
              <Col xs={4} className='p-0'>
                <Input className='input-cvv mb-50' id='card-holder-cvv' />
              </Col>
              <Col xs={3}>
                <Button className='btn-cvv mb-50' color='primary'>
                  Continue
                </Button>
              </Col>
            </Row>
            <hr className='my-2' />
            <ul className='other-payment-options list-unstyled'>
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='paymentMethod' id='credit-card' />
                  <Label className='form-label' for='credit-card'>
                    Credit / Debit / ATM Card
                  </Label>
                </div>
              </li>
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='paymentMethod' id='payment-net-banking' />
                  <Label className='form-label' for='payment-net-banking'>
                    Net Banking
                  </Label>
                </div>
              </li>
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='paymentMethod' id='payment-emi' />
                  <Label className='form-label' for='payment-emi'>
                    EMI (Easy Installment)
                  </Label>
                </div>
              </li>
              <li className='py-50'>
                <div className='form-check'>
                  <Input type='radio' name='paymentMethod' id='payment-cod' />
                  <Label className='form-label' for='payment-cod'>
                    Cash On Delivery
                  </Label>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
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
