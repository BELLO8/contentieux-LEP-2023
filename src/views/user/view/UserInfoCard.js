// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'

// ** Third Party Components

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const UserInfoCard = ({ selectedUser }) => {
  console.log(selectedUser)

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Nom :</span>
                  <span>{selectedUser.nom}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Circonscription :</span>
                  <span>{selectedUser.circons_electorale}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser.contact}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Nombres d'electeurs:</span>
                  <Badge color='warning'>{selectedUser.nombre_electeur}</Badge>
                </li>
              </ul>
            ) : null}
          </div>
         
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
