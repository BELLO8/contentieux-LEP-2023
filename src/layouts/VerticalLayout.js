/* eslint-disable */

import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import { Monitor } from "react-feather";
import { getUserData } from "../utility/Utils";

const VerticalLayout = (props) => {
  const user = getUserData();
  const menuVerti = [
    {
      id: "parti",
      title: "Vue du parti",
      icon: <Monitor size={20} />,
      navLink: "/VueParti",
    },
  ];

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout
      menuData={user?.role === "parti" ? menuVerti : navigation}
      {...props}
    >
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
