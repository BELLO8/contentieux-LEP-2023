/* eslint-disable */

import { Navigate } from "react-router-dom";
import { Suspense } from "react";

// ** Context Imports

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  // const ability = useContext(AbilityContext)
  const user = JSON.parse(localStorage.getItem("userProfil"));

  if (route) {
    // let action = null
    // let resource = null
    let restrictedRoute = false;

    if (route.meta) {
      // action = route.meta.action
      // resource = route.meta.resource
      restrictedRoute = route.meta.restricted;
    }
    if (!user) {
      return <Navigate to="/interdit" />;
    }
    if (user && restrictedRoute) {
      if (user.role === "candidat") {
        return <Navigate to="/" />;
      } else if (user.role === "parti") {
        return <Navigate to="/VueParti" />;
      }
    }
    if (user && restrictedRoute && user.role === "candidat") {
      return <Navigate to="/access-control" />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PrivateRoute;
