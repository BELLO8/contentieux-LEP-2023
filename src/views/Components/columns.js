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
  
  export const votants = [
    {
      name: 'Electeur',
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
      name: 'Numero electeur',
      sortable: true,
      minWidth: '172px',
      sortField: 'num_electeur',
      selector: row => row.num_electeur,
      cell: row => (<Badge color='primary'> {row.num_electeur} </Badge>) 
    },
    {
      name: 'Status',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.status,
      cell: row => <span className='text-capitalize'>{row.statusVote}</span>
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
    },
    {
      name: 'Heure de vote',
      minWidth: '138px',
      sortable: true,
      sortField: 'heure_vote',
      selector: row => row.heure_vote,
      cell: row => row.heure_vote
    }
  ]