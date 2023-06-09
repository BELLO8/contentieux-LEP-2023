import {
  Card,
  CardHeader,
  CardBody,
  CardTitle, Button
} from "reactstrap"
import Timeline from "../@core/components/timeline"
import { User, ShoppingBag, CreditCard, UserPlus } from 'react-feather'
import { Link } from "react-router-dom"

const Process = () => {

  const iconsData = [
  {
    title: 'Etape 1',
    content:'Effectuez un paiment',
    icon: <CreditCard size={14} />,
    customContent: (
      <div className='d-flex align-items-center'>
        <p className='text-primary'>
          Chaque candidat doit payer sur la plateforme 
          une somme en fonction de son nombres d'electeurs avant de créer son compte.
        </p>
          
      </div>
    )
  },
  {
    title: 'Etapte 2',
    content: 'Creation du compte après le paiement',
    icon: <UserPlus size={14} />,
    color: 'secondary',
    customContent: (
      <div className='d-flex align-items-center'>
        <div className='ms-50'>
          <p className='mb-0 text-primary'>Une fois le paiement effectué le candidant peux créer son compte .</p>
        </div>
      </div>
    )
  },
  {
    title: 'Etape 3',
    content:
      'Se connecter et acceder a son espace',
    icon: <User size={14} />,
    color: 'danger',
    customContent: (
      <div className='d-flex justify-content-between flex-wrap flex-sm-row flex-column'>
           <p className='mb-0 text-primary'>Le candidat doit renseigner son username et mot de passe pour accéder à son espace .</p>
      </div>
      
    )
  }
]

  return (
    <div className='auth-wrapper auth-basic'>
      <div className='auth-inner'>
      <Card>
        <CardHeader>
          <CardTitle>Comment ça marche ?</CardTitle>
        </CardHeader>
        <CardBody>
        <Timeline data={iconsData} />
        <Button className="mb-1 mt-2" color="primary" tag={Link} to="/paiement-candidat">Ok j'ai compris</Button>
        </CardBody>
      </Card>
      </div>
    </div>
  )
}

export default Process
