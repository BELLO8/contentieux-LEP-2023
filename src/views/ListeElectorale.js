// ** User List Component
import Table from './components/Table'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Custom Components

// ** Icons Imports

// ** Styles
import '@styles/react/apps/app-users.scss'
import { getUserData } from '../utility/Utils'

const ListeElectorale = () => {
  const user = getUserData()

  return (
    <div className='app-user-list'>
      <Badge color='warning'>  {user.lib_circons} </Badge>
      <Table />
    </div>
  )
}

export default ListeElectorale
