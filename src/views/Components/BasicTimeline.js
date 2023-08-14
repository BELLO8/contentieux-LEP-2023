/*eslint-disable */

import Timeline from "@components/timeline";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Timeline Data
import CustomTimeline from "./Customtimeline";

const BasicTimeline = () => {
  const basicData = [
    {
      title: "Ouverture du scrutin",
      content: "Invoices have been paid to the company.",
      meta: "12 min ago",
    },
    {
      title: "Verification materiels",
      content: "Project meeting with john @10:15am.",
      meta: "45 min ago",
      color: "secondary",
    },
    {
      title: "Scrutin",
      content: "Click the button below to read financial reports",
      meta: "2 hours ago",
      color: "success",
    },
    {
      title: "depouillemnt",
      content: "Have to interview Katy Turner for the developer job.",
      meta: "03:00 PM",
      color: "warning",
    },
  ];
  return (
    <div className="bg-white p-3 round">
      <h5 className="mb-3">Chronologie globale du déroulement de l'élection</h5>
      <CustomTimeline data={basicData} />
    </div>
  );
};

export default BasicTimeline;
