import { Badge } from "reactstrap"

export const columns = [
    {
      name: 'Representant',
      sortable: true,
      minWidth: '300px',
      sortField: 'nom',
      selector: row => (<span>{row.nom} {row.prenoms} </span>),
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
              <span className='fw-bolder'>{row.nom} {row.prenoms} </span>
          </div>
        </div>
      )
    },
    {
        name: 'Username',
        minWidth: '138px',
        sortable: true,
        sortField: 'username',
        selector: row => row.username,
        cell: row => row.username
      },
    {
      name: 'Role',
      sortable: true,
      minWidth: '172px',
      sortField: 'lib_role',
      selector: row => row.lib_role,
      cell: row => (<Badge color='primary'> {row.lib_role} </Badge>) 
    },
    {
      name: 'Lieu de vote',
      minWidth: '230px',
      sortable: true,
      sortField: 'lib_lieu_vote',
      selector: row => row.lib_lieu_vote,
      cell: row => <span className='text-capitalize'>{row.lib_lieu_vote}</span>
    },
    {
      name: 'Bureau de vote',
      minWidth: '138px',
      sortable: true,
      sortField: 'lib_bureau_vote',
      selector: row => row.lib_bureau_vote,
      cell: row => row.lib_bureau_vote
    },
    {
      name: 'Type election',
      minWidth: '138px',
      sortable: true,
      sortField: 'lib_type_election',
      selector: row => row.lib_type_election,
      cell: row => row.lib_type_election
    }
  ]