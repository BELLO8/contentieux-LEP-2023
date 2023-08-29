/* eslint-disable */

import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import { Monitor, Archive, CheckSquare, Table, CheckCircle } from "react-feather";
import { getUserData } from "../utility/Utils";

const VerticalLayout = (props) => {
  const user = getUserData();
  const menuVerti = [
    {
      id: "admin",
      title: "Activation candidat",
      icon: <CheckCircle size={20} />,
      navLink: "/JamaweAdmin",
    },
  ];
  const menuReg = [
    {
      id: "home",
      title: "Tableau de bord",
      icon: <Monitor size={20} />,
      navLink: "/home",
    },
    {
      id: "bv",
      title: "Etapes du vote ",
      icon: <Archive size={20} />,
      navLink: "/vote",
    },
    {
      id: "depouillement",
      title: "Dépouillement",
      icon: <Table size={20} />,
      navLink: "/comptageVoix",
    },
    {
      id: "resultat",
      title: "Résultats",
      icon: <CheckSquare size={20} />,
      navLink: "/resultat",
    },
  ];

  return (
    <Layout
      menuData={
        user?.role === "parti" ? menuVerti : user?.id_type_election === "2" ? menuReg : navigation
      }
      {...props}
    >
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
