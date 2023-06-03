// ** React Imports
import { Fragment } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import UserInfoCard from '../../user/view/UserInfoCard'
import PlanCard from '../../user/view/PlanCard'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../../redux/store/InfoCandidat'

const CandidantInfo = ({ stepper }) => {

  const dispatch = useDispatch()
  const candidatInfo = useSelector(state => state.infoCandidat.data)
  const userRegister = useSelector(state => state.infoCandidat.user)

  const user = {...userRegister, id_candidat: candidatInfo.cod_candidat}

  
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Information sur le candidat</h5>
        <small className='text-muted'>Enter Your Account Details.</small>
      </div>
      <Row>
        <Col lg="6" sm="12">
          <UserInfoCard selectedUser={candidatInfo}/>
        </Col>
        <Col lg="6" sm="12">
          <PlanCard userInfo={candidatInfo}/>
        </Col>
      </Row>
      
      <Form onSubmit={e => e.preventDefault()}>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button color='primary' className='btn-next' onClick={() => { 
            dispatch(Register(user))
            stepper.next() 
            } }>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default CandidantInfo
