// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Styles
import "@styles/base/pages/page-misc.scss"

const Error = () => {

  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">Page non trouvée 🕵🏻‍♀️</h2>
          <p className="mb-2">
            Oops! 😖 L'URL demandée n'a pas été trouvée sur ce serveur.
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
export default Error
