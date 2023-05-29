// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


const PlanCard = () => {

  return (
    <Fragment>
      <Card className='plan-card border-primary'>
        <CardBody>
          <div className='mb-2 d-flex justify-content-between align-items-start'>
            <Badge color='light-primary'>Standard</Badge>
            <div className='d-flex justify-content-center'>
              <span className='fw-bolder display-5 mb-0 text-primary'>1.000</span>
              <span className='h5 pricing-currency text-primary mt-1 mb-0'>Fcfa</span>
              <sub className='pricing-duration font-small-4 ms-25 mt-auto mb-2'>/mois</sub>
            </div>
          </div>
          <ul className='ps-1 mb-2'>
            <li className='mb-50'>Edition des listes électorales</li>
            <li className='mb-50'>Edition des synthèses évolutives</li>
            <li>Edition des répertoires liés au contentieux</li>
          </ul>
         
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default PlanCard
