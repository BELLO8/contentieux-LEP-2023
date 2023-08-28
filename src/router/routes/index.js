// ** React Imports
import { Fragment, lazy } from "react"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"
import NotAuthorized from "../../views/NotAuthorized"
// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from "@utils"
import Register from "../../views/Auth/Register"
import Home from "../../views/Home"
import Vote from "../../views/app/Depouillements"
import Depouillement from "../../views/app/DepouillementDetails"
import Resultat from "../../views/app/Resultat"
import SettingCandidat from "../../views/app/EtapeVote"
import DetailBv from "../../views/app/DetailBv"
import LoginParti from "../../views/VueParti/LoginParti"
import RegisterParti from "../../views/VueParti/RegisterParti"
import Parti from "../../views/VueParti/Home"
import EtapeVote from "../../views/Regional/EtapeVote"
import DetailEtape from "../../views/Regional/DetailEtape"
import ComptageVoix from "../../views/Regional/ComptageVoix"
import DetailEtapeBv from "../../views/Regional/DetailEtapeBv"
import DepouillementBureauVote from "../../views/Regional/DepouillementsBureauVote"
import DepouillementDetailsBureauVote from "../../views/Regional/DepouillementDetailsBureauVote"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/home"

const Login = lazy(() => import("../../views/Auth/Login"))
const Error = lazy(() => import("../../views/Error"))

// ** Merge Routes
const Routes = [
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/vote",
    element: <EtapeVote />
  },
  // {
  //   path: "/vote/liste-votants",
  //   element: <TableVote />
  // },
  {
    path: "/vote/etape-vote/:id",
    element: <DetailEtape />
  },
  {
    path: "/vote/etape-vote/:idlv/:idbv",
    element: <DetailEtapeBv />
  },
  {
    path: "/depouillement/depouillement-par-bv/:idlv/:idbv",
    element: <Depouillement />
  },
  {
    path: "/depouillement",
    element: <Vote />
  },
  {
    path: "/comptageVoix",
    element: <ComptageVoix />
  },
  {
    path: "/comptageVoix/:id",
    element: <DepouillementBureauVote />
  },
  {
    path: "/comptageVoix/depouillement-par-bv/:idlv/:idbv",
    element: <DepouillementDetailsBureauVote />
  },
  {
    path: "/resultat",
    element: <Resultat />
  },
  {
    path: "/VueParti",
    element: <Parti />
  },
  {
    path: "/bureau-vote",
    element: <SettingCandidat />
  },
  {
    path: "/bureau-vote/deroulement/:idlv/:idbv",
    element: <DetailBv />
  },
  {
    path: "/MonParti/login",
    element: <LoginParti />,
    meta: {
      publicRoute: true,
      layout: "blank"
    }
  },
  {
    path: "/MonParti/inscription",
    element: <RegisterParti />,
    meta: {
      publicRoute: true,
      layout: "blank"
    }
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/inscription",
    element: <Register />,
    meta: {
      publicRoute: true,
      layout: "blank"
    }
  },
  {
    path: '/interdit',
    element: <NotAuthorized />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        
        let RouteTag = PrivateRoute
        // let RouteTag = PublicRoute
        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
