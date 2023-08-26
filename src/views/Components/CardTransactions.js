/* eslint-disable */

// ** Icons Imports
// ** Reactstrap Imports
import { Card } from "reactstrap";
import img1 from "@src/assets/images/portrait/small/1.png";
import { useSelector } from "react-redux";

const CandidatVoice = ({ nom, lib_parti, nombre_voix,color }) => {
  const listeVotants = useSelector((state) => state.election.Listvotants);
  const vote =
    listeVotants.length === 0
      ? 0
      : parseFloat(
          (Number(nombre_voix ? nombre_voix : 0) * 100) / Number(listeVotants.length)
        ).toFixed(2);

  const renderTransactions = () => {
    return (
      <Card
        className="shadow-none"
        style={{ minHeight: "85px", minWidth: "295px", maxWidth: "222px" }}
      >
        <div className="d-flex">
          <img src={img1} height={80} width={80} />
          <div style={{ marginLeft: "5px" }}>
            <div
              className="px-1 text-white fw-bolder"
              style={{
                minWidth: "182px",
                backgroundColor:color
              }}
            >
              <small>{lib_parti}</small>
            </div>
            <div className="px-1" style={{ minHeight: "35px" }}>
              <small className="fw-bolder text-dark">{nom}</small>
            </div>
            <div className="d-flex bg-light-secondary px-1 fw-bolder text-dark">
              <div className="mx-1">{vote}%</div>
              <div className="px-2" style={{ borderLeft: "solid 2px white" }}>
                {nombre_voix ?? 0}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return renderTransactions();
};

export default CandidatVoice;
