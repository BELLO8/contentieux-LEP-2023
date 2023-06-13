/* eslint-disable */
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Form, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeElection } from '../../redux/store/TypeElection'
import { getCirconscription } from '../../redux/store/Circonscription'
import { getCandidatInfo } from '../../redux/store/InfoCandidat'

const Identification = ({ stepper, type }) => {
  const {
    register,
    handleSubmit
  } = useForm()

  const [idTypeElection, setIdTypeElection] = useState()
  const [idcirconscription, setIdcirconscription] = useState()
 
  const dispatch = useDispatch()
  const typeElection = useSelector(state => state.typeElection.data)
  const circonscription = useSelector(state => state.circonscription.data)

  const typeElectionData = []
  const circonscriptionData = []

  typeElection.map((item) => {
    typeElectionData.push({value:item.id_type, label:item.type_election})
  })

  circonscription.map((item) => {
    circonscriptionData.push({value:item.id_circons, label:item.circons})
  })


  useEffect(() => {
    dispatch(getTypeElection())
  }, [dispatch])

  const onSubmit = data => {
    const elect = {idTypeElection:idTypeElection, idcirconscription:idcirconscription}
    if (Object.values(elect).every(field => field !== undefined)) {
      // dispatch(Register(data))
      dispatch(getCandidatInfo({idTypeElection, idcirconscription}))
      stepper.next()
    } else {
      
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Identification</h5>
        <small>Entrer les Informations pour le connaitre le candidat</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>     
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`country-${type}`}>
                Selectionner le type d'élection
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={typeElectionData}
              onChange={(event) => {
                setIdTypeElection(event.value)
                console.log(idTypeElection)
                dispatch(getCirconscription(event.value))
              }
              }
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`language-${type}`}>
            Selectionner une circonscription
            </Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={circonscriptionData}
              className='react-select'
              classNamePrefix='select'
              onChange={(event) => {
                console.log(event.value)
                setIdcirconscription(event.value)
                console.log(idcirconscription)
              }}
            />
          </Col>
        </Row>
        {/* <Row>
            <Col md='6' className='mb-1'>
              <Label className='form-label' for='username'>
              Nom d'utilisateur
              </Label>
              <input className='form-control' type='text' placeholder='username' { ...register("username", { required: true})} required/>
            </Col>
            <Col md='6' className='mb-1'>
              <Label className='form-label' for='lastName'>
                Mot de passe
              </Label>
              <input className='form-control' type='password' { ...register("password", { required: true})} required/>
            </Col>
        </Row> */}
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Précédent</span>
          </Button>
          <Button typec='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Suivant</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Identification
