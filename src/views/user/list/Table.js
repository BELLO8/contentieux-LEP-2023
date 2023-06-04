/* eslint-disable */

// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label, CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Button
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getUserData } from '../../../utility/Utils'
import { getCirconscriptionAdmin, getDepartement, getElecteur, getLieuxVote } from '../../../redux/store/Election'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
        <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Exporter les données</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Au format PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>Au format CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Rechercher:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => { 
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.election.electeur)

  const userData = getUserData()
  const departement = useSelector(state => state.election.departement)
  const com = useSelector(state => state.election.commune)
  const lieux = useSelector(state => state.election.lieuxVote)
  const electeur = useSelector(state => state.election.electeur)

  const lieuxVoteData = []
  const departementData = []
  const comData = []

  departement?.map((item) => {
    departementData.push({value:item.cod_dep, label:item.lib_dep})
  })

  com.map((item) => {
    comData.push({value:item.cod_circonsAdmin, label:item.lib_circonAdmin})
  })

  lieux.map((item) => {
    lieuxVoteData.push({value:item.cod_lieu, label:item.lib_lvote})
  })

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentSous, setCurrentSous] = useState({ value: '', label: 'Selectionnez une Sous-prefecure', number: 0 })
  const [idDep, setIdDep] = useState()
  // ** Function to toggle sidebar
  
  // // ** Get data on mount
  useEffect(() => {
    dispatch(getDepartement(userData.id_circons_er))
  }, [dispatch])


  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(getElecteur({idDep: idDep, idCand: userData.id_candidat, page: page.selected + 1}))
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count =  store.meta?.last_page

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }


  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filtre des données</CardTitle>
        </CardHeader>
        <CardBody>
         
            { userData.type_election === "2" ? (
              <Row>
                <Col md='3'>
         <Label for='status-select'>Département</Label>
         <Select
           theme={selectThemeColors}
           isClearable={false}
           className='react-select'
           classNamePrefix='select'
           options={departementData}
           onChange={(event) => {
             setIdDep(event.value)
             dispatch(getElecteur({idDep: event.value, idCand: userData.id_candidat}))
             dispatch(getCirconscriptionAdmin(event.value))
           }}
         />
                 </Col>
                <Col className='my-md-0 my-1' md='3'>
         <Label for='plan-select'>Circonscription administrative</Label>
         <Select
           theme={selectThemeColors}
           isClearable={false}
           className='react-select'
           classNamePrefix='select'
           options={comData}
           onChange={(event) => {
             dispatch(getLieuxVote(event.value))
           }}
         />
               </Col>
                <Col md='3'>
                  <Label for='status-select'>Lieux de vote</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className='react-select'
                    classNamePrefix='select'
                    options={lieuxVoteData}
                    onChange={() => {
                      
                    }}
                  />
                </Col>
              </Row>
            ) : userData.type_election === "1" ? (
              <Row>
            <Col md='3'>
              <Label for='status-select'>Lieux de vote</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={lib_lvote}
                onChange={() => {
                  
                }}
              />
            </Col>
            <Col md='3'>
              <Label for='status-select'>Bureau de vote</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={sousOptions}
                value={currentSous}
                onChange={data => {
                  setCurrentSous(data)
               
                }}
              />
            </Col>
              </Row>
            ) : null }

        </CardBody>
      </Card>
      <CustomPagination />
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            subHeader
            responsive
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationRowsPerPageOptions={[25, 50, 75, 100]}
            data={electeur.data}
            subHeaderComponent={
              <CustomHeader
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UsersList
