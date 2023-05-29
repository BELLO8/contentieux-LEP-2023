// ** Router imports
import { useRoutes, Navigate } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"
import BlankLayout from "@layouts/BlankLayout"
import Error from "../views/Error"
import Login from "../views/Login"
import { getUserData, getHomeRouteForLoggedInUser } from "../utility/Utils"

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      console.log(user)
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
