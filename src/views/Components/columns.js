/*eslint-disable */

import { Badge } from "reactstrap";

export const columns = [
  {
    name: "Representant",
    sortField: "nom",
    selector: (row) => (
      <span>
        {row.nom} {row.prenoms}{" "}
      </span>
    ),
    cell: (row) => (
      <span className="fw-bolder">
        {row.nom} {row.prenoms}{" "}
      </span>
    ),
  },
  {
    name: "Username",
    sortField: "username",
    selector: (row) => row.username,
    cell: (row) => row.username,
  },
  {
    name: "Role",
    selector: (row) => row.lib_role,
    cell: (row) => <Badge color="primary"> {row.lib_role} </Badge>,
  },
  {
    name: "Lieu de vote",
    sortField: "lib_lieu_vote",
    selector: (row) => row.lib_lieu_vote,
    cell: (row) => row.lib_lieu_vote,
  },
  {
    name: "Bureau de vote",
    sortField: "lib_bureau_vote",
    selector: (row) => row.lib_bureau_vote,
    cell: (row) => row.lib_bureau_vote,
  },
  {
    name: "Type election",
    sortable: true,
    sortField: "lib_type_election",
    selector: (row) => row.lib_type_election,
    cell: (row) => row.lib_type_election,
  },
];

export const votants = [
  {
    name: "Heure de vote",
    selector: (row) => row.heure_vote,
    cell: (row) =>
      new Date(row.heure_vote).toLocaleTimeString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
      }),
  },
  {
    name: "Electeur",
    selector: (row) => (
      <span>
        {row.nom} {row.prenoms}{" "}
      </span>
    ),
    cell: (row) => row.nom + " " + row.prenoms,
  },
  {
    name: "Numero electeur",
    selector: (row) => row.num_electeur,
    cell: (row) => <Badge color="primary"> {row.num_electeur} </Badge>,
  },
  {
    name: "Sexe",
    selector: (row) => row.sexe,
    cell: (row) => row.sexe,
  },
  {
    name: "Date_naissance",
    sortField: "Date_naissance",
    selector: (row) => row.Date_naissance,
    cell: (row) => row.Date_naissance,
  },
  {
    name: "Lieu_naissance",
    selector: (row) => row.Lieu_naissance,
    cell: (row) => row.Lieu_naissance,
  },
  // {
  //   name: 'Nom du pere',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'nom_pere',
  //   selector: row => row.nom_pere,
  //   cell: row => row.nom_pere
  // },
  // {
  //   name: 'Nom de la mere',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'nom_mere',
  //   selector: row => row.nom_mere,
  //   cell: row => row.nom_mere
  // },
  {
    name: "Profession",
    minWidth: "138px",
    sortable: true,
    sortField: "profession",
    selector: (row) => row.profession,
    cell: (row) => row.profession,
  },
  
];

export const votantsElect = [
  {
    name: "Electeur",
    sortable: true,
    minWidth: "300px",
    sortField: "nom",
    selector: (row) => (
      <span>
        {row.nom} {row.prenoms}{" "}
      </span>
    ),
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <span className="fw-bolder">
            {row.nom} {row.prenoms}{" "}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Numero electeur",
    sortable: true,
    minWidth: "172px",
    sortField: "num_electeur",
    selector: (row) => row.num_electeur,
    cell: (row) => <Badge color="primary"> {row.num_electeur} </Badge>,
  },
  {
    name: "Sexe",
    minWidth: "138px",
    sortable: true,
    sortField: "sexe",
    selector: (row) => row.sexe,
    cell: (row) => <span className="text-capitalize">{row.sexe}</span>,
  },
  {
    name: "Heure de vote",
    minWidth: "138px",
    sortable: true,
    sortField: "heure_vote",
    selector: (row) => row.heure_vote,
    cell: (row) =>
      new Date(row.heure_vote).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
  },
];

export const colorByParti = [
  {
    id: "17",
    libelle: "INDEPENDANT",
    color: "#00cfe8",
  },
  {
    id: "17",
    libelle: "MGC",
    color: "#033975",
  },
  {
    id: "16",
    libelle: "URD",
    color: "#027f48",
  },
  {
    id: "15",
    libelle: "BBN",
    color: "#f60000",
  },
  {
    id: "14",
    libelle: "PPA-CI",
    color: "#01a9ea",
  },
  {
    id: "13",
    libelle: "PDCI-RDA/PPA-CI",
    color: "#088640",
  },
  {
    id: "12",
    libelle: "REEL.CI",
    color: "#d67b2e",
  },
  {
    id: "11",
    libelle: "PDL",
    color: "#00cfe8",
  },
  {
    id: "10",
    libelle: "FAP",
    color: "#00cfe8",
  },
  {
    id: "9",
    libelle: "FPI",
    color: "#244b83",
  },
  {
    id: "8",
    libelle: "MSC",
    color: "#198cd8",
  },
  {
    id: "7",
    libelle: "PPR",
    color: "",
  },
  {
    id: "2",
    libelle: "RHDP",
    color: "#ee9605",
  },
  {
    id: "1",
    libelle: "PDCI-RDA",
    color: "#088640",
  },
];