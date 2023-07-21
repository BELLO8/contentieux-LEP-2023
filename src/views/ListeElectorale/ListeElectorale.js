// ** User List Component
import Table from '../components/Table'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Custom Components

// ** Icons Imports

// ** Styles
import '@styles/react/apps/app-users.scss'
import Circons from '../components/circons'

const ListeElectorale = () => {
  return (
    <div className='app-user-list'>
     <Circons/>
      <Table />
    </div>
  )
}

export default ListeElectorale
