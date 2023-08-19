/* eslint-disable */
<<<<<<< HEAD

=======
>>>>>>> d4f43fa7f5d2b3734fe44db4da8868db95fe21de
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
       {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div> */}
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
