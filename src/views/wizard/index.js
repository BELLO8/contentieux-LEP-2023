// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import WizardModern from './WizardModern'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

const Wizard = () => {
  return (
    <Fragment>
      <BreadCrumbs title='Form Wizard' data={[{ title: 'Form' }, { title: 'Form Wizard' }]} />
      <Row>
        <Col sm='12'>
          <WizardModern />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Wizard
