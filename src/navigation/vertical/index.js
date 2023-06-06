import { Mail, Home, Circle } from "react-feather"

export default [
  {
    id: "home",
    title: "Liste électorale",
    icon: <Home size={20} />,
    navLink: "/liste-electorale"
  },
  {
    id: "secondPage",
    title: "Répertoire électeur",
    icon: <Mail size={20} />,
    children: [
      {
        id: 'decede',
        title: 'Liste décédé',
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
        title: 'Résultats du contentieux',
        icon: <Circle size={12} />,
        navLink: '/repertoire-electeur'
      }
    ]
  },
  {
    id: "synthese",
    title: "Synthèse",
    icon: <Mail size={20} />,
    navLink: "/syntheses"
  }
]
