import { Mail, Home, Circle, FileText, AlignJustify, BookOpen } from "react-feather"

export default [
  {
    id: "home",
    title: "Liste électorale",
    icon: <AlignJustify size={20} />,
    navLink: "/liste-electorale"
  },
  {
    id: "Répertoire",
    title: "Répertoire électeur",
    icon: <BookOpen size={20} />,
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
    icon: <FileText size={20} />,
    children:[
      {
        id: 'listesynthese',
        title: 'Synthèses',
        icon: <Circle size={12} />,
        navLink: '/syntheses'
      },
      {
        id: 'doublon',
        title: 'Liste des doublons',
        icon: <Circle size={12} />,
        navLink: '/doublons'
      },
      {
        id: 'changeRegion',
        title: 'Changement de région',
        icon: <Circle size={12} />,
        navLink: '/changement-region'
      },
      {
        id: 'changeDep',
        title: 'Changement de departement',
        icon: <Circle size={12} />,
        navLink: '/changement-departement'
      },
      {
        id: 'changeLv',
        title: 'Changement de lieux de vote',
        icon: <Circle size={12} />,
        navLink: '/changement-lieu-vote'
      },
       {
        id: 'newinscritbyRegion',
        title: 'Nouveau inscrit',
        icon: <Circle size={12} />,
        navLink: '/nouveau-inscrit'
      },
      {
        id: 'electeurCentenaireByRegion',
        title: 'Centenaire',
        icon: <Circle size={12} />,
        navLink: '/centenaire'
      },
      {
        id: 'electeurMineurByRegion',
        title: 'Mineur',
        icon: <Circle size={12} />,
        navLink: '/mineur'
      }
    ]
  }
]


// import { Mail, Home } from "react-feather"

// export default [
//   {
//     id: "home",
//     title: "Home",
//     icon: <Home size={20} />,
//     navLink: "/home"
//   },
//   {
//     id: "secondPage",
//     title: "Second Page",
//     icon: <Mail size={20} />,
//     navLink: "/second-page"
//   }
// ]
