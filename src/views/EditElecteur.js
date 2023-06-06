// ** React Imports
import { isEmptyObject } from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Card, CardHeader, CardTitle, CardBody, CardText, Input, Label, Row, Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getUserData } from '../utility/Utils'
import { AjoutElecteurContentieux } from '../redux/store/Election'
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'
import { AlertCircle } from 'react-feather'

const EditElecteur = () => {
  
  const navigate = useNavigate()

  const electeur = useSelector((state) => state.election.showElecteur)
  const {
    register,
    handleSubmit
  } = useForm()
  const userData = getUserData()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const contentieurData = {
      nat_douteuse: data.nat_douteuse === false ? null : "true",
      est_decede: data.est_decede === false ? null : "true",
      identite_incorrect: data.identite_incorrect === false ? null : "true",
      cond_crime: data.cond_crime === false ? null : "true",
      en_cotumace: data.en_cotumace === false ? null : "true",
      nat_stage: data.nat_stage === false ? null : "true",
      num_electeur: electeur.numelecteur,
      id_candidat: userData.id_candidat
    }
    dispatch(AjoutElecteurContentieux(contentieurData)).then((res) => {
      if (res.payload.status === "success") {
        toast(
          <div className='d-flex'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<AlertCircle size={12}/>} />
            </div>
            <div className='d-flex flex-column'>
              <h6>{res.payload.message}</h6>
            </div>
          </div>
        )
        navigate('/repertoire-electeur')
      }
    })

  }

  return (!isEmptyObject(electeur)) ? (
    <div className=''>
      
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Information sur l'électeur</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg="3" sm="12">
              <Label>Nom et prenom</Label>
              <Input type='text' value={electeur.nom.concat(" ", electeur.prenoms)} disabled></Input>
            </Col>
            <Col lg="3" sm="12">
              <Label>Date de naissance</Label>
              <Input type='text' value={electeur.datenaiss} disabled></Input>
            </Col>
            <Col lg="3" sm="12">
              <Label>Lieu de naissance </Label>
              <Input type='text' value={electeur.lieunaiss} disabled></Input>
            </Col>
            <Col lg="3" sm="12">
              <Label>Nom et prenom du père</Label>
              <Input type='text' value={electeur.nom_pere.concat(" ", electeur.prenoms_pere)} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Date de naissance du père</Label>
              <Input type='text' value={electeur.datenaiss_pere} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Lieu de naissance du père</Label>
              <Input type='text' value={electeur.lieunaiss_pere} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Nom et prenom de la mère</Label>
              <Input type='text' value={electeur.nom_mere.concat(" ", electeur.prenoms_mere)} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Lieu de naissance de le mère</Label>
              <Input type='text' value={electeur.lieunaiss_mere} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Date de naissance de la mère</Label>
              <Input type='text' value={electeur.datenaiss_mere} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Adresse</Label>
              <Input type='text' value={electeur.adresse} disabled></Input>
            </Col>

            <Col lg="3" sm="12" className='mt-1'>
              <Label>Adresse postal</Label>
              <Input type='text' value={electeur.adresse_postale} disabled></Input>
            </Col>
            <Col lg="3" sm="12" className='mt-1'>
              <Label>Profession</Label>
              <Input type='text' value={electeur.profession} disabled></Input>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
           <CardTitle tag='h4'>Réference électorale</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mt-2'>
            <Col lg="4" sm="12">
              <Label>Région</Label>
              <Input type='text' value={electeur.lib_region} disabled></Input>
            </Col>
            <Col lg="4" sm="12">
              <Label>Département</Label>
              <Input type='text' value={electeur.libdep} disabled></Input>
            </Col>
            <Col lg="4" sm="12">
              <Label>Sous préfecture</Label>
              <Input type='text' value={electeur.libsousprefecture} disabled></Input>
            </Col>
            <Col lg="4" sm="12">
              <Label>Commune </Label>
              <Input type='text' value={electeur.libcommune} disabled></Input>
            </Col>
            <Col lg="4" sm="12">
              <Label>Numero electeur</Label>
              <Input type='text' value={electeur.numelecteur} disabled></Input>
            </Col>
            <Col lg="4" sm="12">
              <Label>Région</Label>
              <Input type='text' value={electeur.lib_region} disabled></Input>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Card>
        <CardHeader>
          <CardTitle tag='h4'>Prise en change du contentieux</CardTitle>
        </CardHeader>
        <CardBody>
          <div className='demo-inline-spacing'>
          <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='primary-decede' {...register("est_decede")}/>
              <Label className='form-check-label' for='primary-checkbox'>
              Décédé
              </Label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='primary-nat' {...register("nat_douteuse")}/>
              <Label className='form-check-label' for='primary-checkbox'>
              Nationnalité douteuse
              </Label>
            </div>
            <div className='form-check '>
              <input className='form-check-input' type='checkbox' id='secondary-cont' {...register("en_cotumace")} />
              <Label className='form-check-label' for='secondary-checkbox'>
              Contumace
              </Label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='success-nat'  {...register("nat_stage")}/>
              <Label className='form-check-label' for='success-checkbox'>
              Naturalisé en periode de stage
              </Label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='danger-indentite' {...register("identite_incorrect")} />
              <Label className='form-check-label' for='danger-checkbox'>
              Identite incorrect
              </Label>
            </div>
            <div className='form-check '>
              <input className='form-check-input' type='checkbox' id='warning-condcrim' {...register("cond_crime")}/>
              <Label className='form-check-label' for='warning-checkbox'>
              Comdamné pour crime
              </Label>
            </div>
          </div>
        </CardBody>
        </Card>
        <Button.Ripple color='primary' type='submit'>Enregistrer les modifications</Button.Ripple>
      </Form>
    </div>
  ) : (
        <div className="misc-wrapper">
        <div className="misc-inner p-2 p-sm-3">
          <div className="w-100 text-center">
            <p className="mb-2">
              Oops! 🤧 pas de données pour le moment.
            </p>
            <Button
              tag={Link}
              to="/liste-electorale"
              color="primary"
              className="btn-sm-block mb-2"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
        </div>
  )
}

export default EditElecteur
