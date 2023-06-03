// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Badge } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { getUserData } from '../../../utility/Utils'

const UsersList = () => {
  const user = getUserData()

  return (
    <div className='app-user-list'>
      <Badge color='warning'>  {user.lib_circons} </Badge>
      <Table />
    </div>
  )
}

export default UsersList
