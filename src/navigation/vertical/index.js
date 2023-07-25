import { AlignJustify, CheckSquare, Monitor, Package, Settings, Table, Users } from "react-feather"

export default [
  {
    id: "home",
    title: "Tableau de bord",
    icon: <Monitor size={20} />,
    navLink: "/home"
  },
  {
    id: "params",
    title: "Répresentants ",
    icon: <Users size={20} />,
    navLink: "/parametre"
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
