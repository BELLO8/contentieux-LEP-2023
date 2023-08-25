// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './auth'
import typeElection from "./store/TypeElection"
import circonscription from "./store/Circonscription"
import parti from "./store/Parti"
import election from "./store/Election"
import representant from "./store/Representant"
import infoCandidat from "./store/InfoCandidat"

const rootReducer = {
    auth,
    navbar,
    layout,
    typeElection,
    circonscription,
    parti,
    election,
    representant,
    infoCandidat
  }

export default rootReducer
