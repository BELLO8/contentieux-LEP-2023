// ** Router imports
import { Navigate, useRoutes } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"
import BlankLayout from "@layouts/BlankLayout"
import { getHomeRouteForLoggedInUser, getUserData } from "../utility/Utils"
import Login from "../views/Auth/Login"
import Error from "../views/Error"
import LiveVote from "../views/app/LiveVote"

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
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
      path: "/tandance-nationale",
      element: <LiveVote />
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
