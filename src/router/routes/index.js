// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
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
import Wizard from "../../views/wizard"
import UsersList from "../../views/user/list"
import ListeElecteur from "../../views/ListeElecteur"
import InformationMaquante from "../../views/InformationManquante"
import EditElecteur from "../../views/EditElecteur"
import Synthese from "../../views/synthese"
import ListeDoublons from "../../views/ListeDoublons"
import ListeChangementRegion from "../../views/ListeChangementRegion"
import ListeChangementDep from "../../views/ListeChangementDep"
import ListeNouveauInscrit from "../../views/ListeNouveauInscrit"
import ListeCentenaire from "../../views/ListeCentenaire"
import ListeMineur from "../../views/ListeMineur"
import Register from "../../views/Register"
import Process from "../../views/Process"
import CheckoutPDCI from "../../views/CheckoutPDCI"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/comment-ça-marche"

const SecondPage = lazy(() => import("../../views/SecondPage"))
const Login = lazy(() => import("../../views/Login"))
const Checkout = lazy(() => import("../../views/Checkout"))
const Error = lazy(() => import("../../views/Error"))

// ** Merge Routes
const Routes = [
  {
    path: "/repertoire-electeur-decede",
    element: <SecondPage />
  },
   {
    path: "/repertoire-information-manquante",
    element: <InformationMaquante />
  },
  {
    path: "/repertoire-electeur",
    element: <ListeElecteur />
  },
  {
    path: "/modification-electeur",
    element: <EditElecteur />
  },
  {
    path: "/syntheses",
    element: <Synthese />
  },
  {
    path: "/doublons",
    element: <ListeDoublons />
  },
  {
    path: "/changement-region",
    element: <ListeChangementRegion />
  },
  {
    path: "/changement-departement",
    element: <ListeChangementDep />
  },
  {
    path: "/nouveau-inscrit",
    element: <ListeNouveauInscrit />
  },
   {
    path: "/centenaire",
    element: <ListeCentenaire />
  },
  {
    path: "/mineur",
    element: <ListeMineur />
  },
  {
    path: "/comment-ca-marche",
    element: <Process />,
    meta: {
      layout: "blank",
      publicRoute: true
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
    path: "/liste-electorale",
    element: <UsersList />
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
    path: "/paiement-candidat",
    element: <Checkout />,
    meta: {
      publicRoute: true,
      layout: "blank"
    }
  },
  {
    path: "/paiement-candidat-pdci",
    element: <CheckoutPDCI />,
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
