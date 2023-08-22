/* eslint-disable */
import { Fragment } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import { getUserData } from "../../../../utility/Utils";

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        <h5 style={{ fontWeight: "bold" }}  >
          {getUserData().lib_type_election} ( {getUserData().lib_circons} ){" "}
        </h5>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
