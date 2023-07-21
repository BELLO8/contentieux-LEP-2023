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

export const columnsListElectoral = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => (<span>{row.nom} {row.prenoms} </span>),
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.nom} {row.prenoms}</span>
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
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={'/modification-electeur'}
              onClick={() => dispatch(showElecteur({ numelecteur: row.num_electeur })) }
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Detail d'un électeur</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]

export const columnsPere = [
  {
    name: 'Nom',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_pere,
    cell: row => row.nom_pere
  },
  {
    name: 'Prenom',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.prenoms_pere,
    cell: row => row.prenoms_pere
  },
  {
    name: 'Date_naissance du père',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_pere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_pere}</span>
  },
  {
    name: 'Lieu_naissance du père',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_pere,
    cell: row => row.lieunaiss_pere
  }
  
]

export const columnsMere = [
  {
    name: 'Nom',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_mere,
    cell: row => row?.nom_mere
  },
  {
    name: 'Prenom',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.prenoms_mere,
    cell: row => row.prenoms_mere
  },
  {
    name: 'Date_naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_mere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_mere}</span>
  },
  {
    name: 'Lieu_naissance',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_mere,
    cell: row => row.lieunaiss_mere
  }
  
]

export const columnsPereMere = [
  {
    name: 'Nom et prenom du pere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_pere,
    cell: row => (<span>{row.nom_pere} {row.prenoms_pere}</span>) 
  },
  {
    name: 'Nom et prenom de la mere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_mere,
    cell: row => (<span>{row.nom_mere} {row.prenoms_mere}</span>)
  },
  {
    name: 'Date_naissance du père',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_pere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_pere}</span>
  },
  {
    name: 'Lieu_naissance du père',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_pere,
    cell: row => row.lieunaiss_pere
  },
  {
    name: 'Date_naissance de la mère',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_mere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_mere}</span>
  },
  {
    name: 'Lieu_naissance de la mère',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_mere,
    cell: row => row.lieunaiss_mere
  }
  
]

export const columnsEnfantPereMere = [
  {
    name: 'Enfant',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => row.nom,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.nom} {row.prenoms}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Numero electeur',
    sortable: true,
    minWidth: '172px',
    sortField: 'numelecteur',
    selector: row => row.numelecteur,
    cell: row => (<Badge color='primary'> {row.numelecteur} </Badge>) 
  },
{
    name: 'Date_naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'datenaiss',
    selector: row => row.datenaiss,
    cell: row => <span className='text-capitalize'>{row.datenaiss}</span>
  },
 {
    name: 'Lieu_naissance',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss,
    cell: row => row.lieunaiss
  },
  {
    name: 'Nom et prenom du pere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_pere,
    cell: row => row.nom_pere
  },
  {
    name: 'Nom et prenom de la mere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_mere,
    cell: row => row.nom_mere
  },
  {
    name: 'Date_naissance du père',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_pere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_pere}</span>
  },
  {
    name: 'Lieu_naissance du père',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_pere,
    cell: row => row.lieunaiss_pere
  },
  {
    name: 'Date_naissance de la mère',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_mere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_mere}</span>
  },
  {
    name: 'Lieu_naissance de la mère',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_mere,
    cell: row => row.lieunaiss_mere
  }
  
]

export const columnsEnfantMere = [
  {
    name: 'Enfant',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => row.nom,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.nom} {row.prenoms}</span>
        </div>
      </div>
    )
  },
  {
    name: 'Numero electeur',
    sortable: true,
    minWidth: '172px',
    sortField: 'numelecteur',
    selector: row => row.numelecteur,
    cell: row => (<Badge color='primary'> {row.numelecteur} </Badge>) 
  },
{
    name: 'Date_naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'datenaiss',
    selector: row => row.datenaiss,
    cell: row => <span className='text-capitalize'>{row.datenaiss}</span>
  },
 {
    name: 'Lieu_naissance',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss,
    cell: row => row.lieunaiss
  },
  {
    name: 'Nom et prenom de la mere',
    minWidth: '138px',
    sortable: true,
    sortField: 'nom_pere',
    selector: row => row.nom_mere,
    cell: row => row.nom_mere
  },
  {
    name: 'Date_naissance de la mère',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.datenaiss_mere,
    cell: row => <span className='text-capitalize'>{row.datenaiss_mere}</span>
  },
  {
    name: 'Lieu_naissance de la mère',
    minWidth: '138px',
    sortable: true,
    sortField: 'Lieu_naissance',
    selector: row => row.lieunaiss_mere,
    cell: row => row.lieunaiss_mere
  },
  {
    name: 'Region',
    minWidth: '138px',
    sortable: true,
    sortField: 'region',
    selector: row => row.lib_region,
    cell: row => row.lib_region
  },
  {
    name: 'Dépatement',
    minWidth: '138px',
    sortable: true,
    sortField: 'depatement',
    selector: row => row.libdep,
    cell: row => row.libdep
  },
  {
    name: 'Commune',
    minWidth: '138px',
    sortable: true,
    sortField: 'commune',
    selector: row => row.libcommune,
    cell: row => row.libcommune
  },
  {
    name: 'Lieu de vote',
    minWidth: '138px',
    sortable: true,
    sortField: 'lv',
    selector: row => row.liblvote,
    cell: row => row.liblvote
  }
  
]

export const doublon = [
  {
    name: "Electeur",
    sortable: true,
    minWidth: "300px",
    sortField: "nom",
    selector: (row) => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
        </div>
      </div>
    )
  },
  {
    name: "Numero electeur",
    sortable: true,
    minWidth: "172px",
    sortField: "num_electeur",
    selector: (row) => row.numelecteur,
    cell: (row) => <Badge color="primary"> {row.numelecteur} </Badge>
  },
  {
    name: "Sexe",
    minWidth: "138px",
    sortable: true,
    sortField: "sexe",
    selector: (row) => row.sexe,
    cell: (row) => <span className="text-capitalize">{row.sexe}</span>
  },
  {
    name: "Date naissance",
    minWidth: "230px",
    sortable: true,
    sortField: "Date_naissance",
    selector: (row) => row.datenaiss,
    cell: (row) => <span className="text-capitalize">{row.datenaiss}</span>
  },
  {
    name: "Lieu naissance",
    minWidth: "138px",
    sortable: true,
    sortField: "Lieu_naissance",
    selector: (row) => row.lieunaiss,
    cell: (row) => row.lieunaiss
  },
  {
    name: "Nom du pere",
    minWidth: "138px",
    sortable: true,
    sortField: "nom_pere",
    selector: (row) => row.nom_pere,
    cell: (row) => row.nom_pere
  },
  {
    name: "Nom de la mere",
    minWidth: "138px",
    sortable: true,
    sortField: "nom_mere",
    selector: (row) => row.nom_mere,
    cell: (row) => row.nom_mere
  }
]

export const centenaire = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Age',
    minWidth: '138px',
    sortable: true,
    sortField: 'age',
    selector: row => row.age,
    cell: row => <span className='text-capitalize'>{row.age} ans</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  }
]

export const mineur = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Age',
    minWidth: '138px',
    sortable: true,
    sortField: 'age',
    selector: row => row.age,
    cell: row => <span className='text-capitalize'>{row.age} ans</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  }
]

export const nouveauInscrit = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  }
]

export const changeRegion = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  },
  {
    name: 'Region 2020',
    minWidth: '138px',
    sortable: true,
    sortField: 'region2020',
    selector: row => row.region2020,
    cell: row => row.region2020
  },
  {
    name: 'Region 2023',
    minWidth: '138px',
    sortable: true,
    sortField: 'region2023',
    selector: row => row.region2023,
    cell: row => row.region2023
  }
]

export const changeLv = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => <span className='fw-bolder'> {row.nom} {row.prenom} </span>,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
        <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  },
   {
    name: 'Commune',
    minWidth: '138px',
    sortable: true,
    sortField: 'commune2023',
    selector: row => row.commune2023,
    cell: row => row.commune2023
  },
  {
    name: 'Ancien lieu de vote',
    minWidth: '138px',
    sortable: true,
    sortField: 'lv2020',
    selector: row => row.lieu_vote_2020,
    cell: row => row.lieu_vote_2020
  },
  {
    name: ' Nouveau lieu de vote',
    minWidth: '138px',
    sortable: true,
    sortField: 'lv2023',
    selector: row => row.lieu_vote_2023,
    cell: row => row.lieu_vote_2023
  }
]

export const changeDep = [
  {
    name: 'Electeur',
    sortable: true,
    minWidth: '300px',
    sortField: 'nom',
    selector: row => (<span className='fw-bolder'> {row.nom} {row.prenom} </span>),
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
            <span className='fw-bolder'> {row.nom} {row.prenom} </span>
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
    name: 'Date naissance',
    minWidth: '230px',
    sortable: true,
    sortField: 'Date_naissance',
    selector: row => row.Date_naissance,
    cell: row => <span className='text-capitalize'>{row.Date_naissance}</span>
  },
  {
    name: 'Lieu naissance',
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
    name: 'Profession',
    minWidth: '138px',
    sortable: true,
    sortField: 'profession',
    selector: row => row.profession,
    cell: row => row.profession
  },
  {
    name: 'Departement 2020',
    minWidth: '138px',
    sortable: true,
    sortField: 'region2020',
    selector: row => row.dep2020,
    cell: row => row.dep2020
  },
  {
    name: 'Departement 2023',
    minWidth: '138px',
    sortable: true,
    sortField: 'region2023',
    selector: row => row.dep2023,
    cell: row => row.dep2023
  }
]