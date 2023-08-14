/* eslint-disable */
import Avatar from "@components/avatar";

// ** Icons Imports
import * as Icon from "react-feather";
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const CandidatVoice = ({ data }) => {
  const renderTransactions = () => {
    return data.map((item) => {
      return (
        <div key={item.nom} className="transaction-item">
          <div className="d-flex">
            <Avatar
              className="rounded"
              color="light-primary"
              icon={<Icon.User size={18} />}
            />
            <div>
              <h6 className="transaction-title">{item.nom}</h6>
              <small>candidat</small>
            </div>
          </div>
          <div className="fw-bolder text-success">{item.nombre_voix ?? 0}</div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h6">Comptage de voix</CardTitle>
      </CardHeader>

      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  );
};

export default CandidatVoice;
