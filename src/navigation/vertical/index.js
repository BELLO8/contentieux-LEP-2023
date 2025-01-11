import { AlertCircle, Archive, BarChart2, CheckSquare, Monitor, Table } from "react-feather"

export default [
  {
    id: "live",
    title: "Tandance nationale",
    icon: <BarChart2 />,
    navLink: "/tandance-nationale"
  },
  {
    id: "home",
    title: "Tableau de bord",
    icon: <Monitor size={20} />,
    navLink: "/home"
  },
  {
    id: "bv",
    title: "Etapes du vote ",
    icon: <Archive size={20} />,
    navLink: "/bureau-vote"
  },
  // {
  //   id: "vote",
  //   title: "Evolution du scrutin",
  //   icon: <Package size={20} />,
  //   navLink: "/vote"
  // },
  {
    id: "depouillement",
    title: "Dépouillement",
    icon: <Table size={20} />,
    navLink: "/depouillement"
  },
  {
    id: "resultat",
    title: "Résultats",
    icon: <CheckSquare size={20} />,
    navLink: "/resultat"
  },
  {
    id: "contentieux",
    title: "Les Contentieux",
    icon: <AlertCircle size={20} />,
    navLink: "/contentieux"
  }

]
