// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components

// ** Icons Imports
import { MoreVertical, FileText, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const columns = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => row.nom.concat(" ", row.prenoms),
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.nom.concat(" ", row.prenoms)}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Numero electeur',
    sortable: true,
    minWidth: '172px',
    sortField: 'num_electeur',
    selector: row => row.num_electeur,
    cell: row => (<Badge color='primary'> {row.num_electeur} </Badge>) 
  },
  {
    name: 'Sexe',
    minWidth: '138px',
    sortable: true,
    sortField: 'sexe',
    selector: row => row.sexe,
    cell: row => <span className='text-capitalize'>{row.sexe}</span>
  },
  {
    name: 'Date_naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Lieu_naissance',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.Lieu_naissance,
    cell: row => row.Lieu_naissance
  },
  {
    name: 'Nom du pere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_pere,
    cell: row => row.nom_pere
  },
  {
    name: 'Nom de la mere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_mere',
    selector: row => row.nom_mere,
    cell: row => row.nom_mere
  },
  {
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  }
]
