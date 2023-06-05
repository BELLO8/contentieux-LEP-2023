// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './auth'
import typeElection from "./store/TypeElection"
import circonscription from "./store/Circonscription"
import infoCandidat from "./store/InfoCandidat"
import election from "./store/Election"
const rootReducer = {
    auth,
    navbar,
    layout,
    typeElection,
    circonscription,
    infoCandidat,
    election
  }

export default rootReducer
