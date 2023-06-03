// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Custom Hooks

// ** Utils
import { } from "@utils"

// ** Styles
import "@styles/base/pages/page-misc.scss"

const NotAuthorized = () => {
 
    return (
      <div className="misc-wrapper">
        <div className="misc-inner p-2 p-sm-3">
          <div className="w-100 text-center">
            <h2 className="mb-1">Acces interdit 🚫</h2>
            <p className="mb-2">
              Oops! 🤧 Désolé, vous n'êtes pas autorisé à accéder à cette page.
            </p>
            <Button
              tag={Link}
              to="/"
              color="primary"
              className="btn-sm-block mb-2"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    )
}
export default NotAuthorized
