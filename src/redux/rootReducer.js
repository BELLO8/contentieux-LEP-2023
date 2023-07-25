// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './auth'
import typeElection from "./store/TypeElection"
import circonscription from "./store/Circonscription"
import parti from "./store/Parti"
const rootReducer = {
    auth,
    navbar,
    layout,
    typeElection,
    circonscription,
    parti
  }

export default rootReducer
