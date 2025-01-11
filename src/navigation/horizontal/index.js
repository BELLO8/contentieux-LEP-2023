import { Archive, CheckSquare, Monitor, Package, Table } from "react-feather"

export default [

  {
    id: "home",
    title: "Tableau de bord",
    icon: <Monitor size={20} />,
    navLink: "/home"
  },
  {
    id: "bv",
    title: "Bureau de vote ",
    icon: <Archive size={20} />,
    navLink: "/bureau-vote"
  },
  {
    id: "vote",
    title: "Vote",
    icon: <Package size={20} />,
    navLink: "/vote"
  },
  {
    id: "depouillement",
    title: "Dépouillement",
    icon: <Table size={20} />,
    navLink: "/depouillement"
  },
  {
    id: "resultat",
    title: "Resultat",
    icon: <CheckSquare size={20} />,
    navLink: "/resultat"
  }
   
]
