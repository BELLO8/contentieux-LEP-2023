// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


const PlanCard = ({ userInfo }) => {
  console.log(userInfo)
  return (
    <Fragment>
      <Card className='plan-card border-primary'>
      {userInfo !== null ? ( 
         <CardBody>
         <div className='mb-2 d-flex justify-content-between align-items-start'>
           <div className='d-flex justify-content-center'>
             <span className='fw-bolder display-6 mb-0 text-primary'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'XOF' }).format(userInfo?.montant)}</span>
           </div>
         </div>
         <ul className='ps-1 mb-2'>
           <li className='mb-50'>Edition des listes électorales</li>
           <li className='mb-50'>Edition des synthèses évolutives</li>
           <li>Edition des répertoires liés au contentieux</li>
         </ul>
        
       </CardBody>
      ) : null }
       
      </Card>

    </Fragment>
  )
}

export default PlanCard
