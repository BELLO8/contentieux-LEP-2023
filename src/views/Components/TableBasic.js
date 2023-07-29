
import { MoreVertical, Edit, Trash, ChevronDown } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { columns } from './columns'
import { getUserData } from '../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { getRepresentant } from '../../redux/store/Representant'


const TableBasic = () => {
  const user = getUserData()  
  const store = useSelector((state) => state.representant.representant.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRepresentant(user.id_candidat))

  }, [dispatch])

  return (
  <div>
     <DataTable
            pagination
            responsive
            noDataComponent='aucune données pour le moment'
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10]}
            data={store}
          />
  </div>
  )
}

export default TableBasic