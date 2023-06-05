import { Mail, Home, Circle } from "react-feather"

export default [
  {
    id: "home",
    title: "Liste electorale",
    icon: <Home size={20} />,
    navLink: "/liste-electorale"
  },
  {
    id: "secondPage",
    title: "Repertoire electeur",
    icon: <Mail size={20} />,
    children: [
      {
        id: 'decede',
        title: 'Liste decede',
        icon: <Circle size={12} />,
        navLink: '/repertoire-electeur-decede'
      },
      {
        id: 'info',
        title: 'Information manquante',
        icon: <Circle size={12} />,
        navLink: '/repertoire-information-manquante'
      },
      {
        id: 'contentieux',
        title: 'Liste contentieux',
        icon: <Circle size={12} />,
        navLink: '/repertoire-electeur'
      }
    ]
  },
  {
    id: "synthese",
    title: "Synthese",
    icon: <Mail size={20} />,
    navLink: "/syntheses"
  }
]
