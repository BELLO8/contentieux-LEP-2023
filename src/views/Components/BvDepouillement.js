/* eslint-disable */


// ** Reactstrap Imports
import { Card } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from "jquery";
import CandidatVoice from "./CardTransactions";
import { getCandidats } from "../../utility/Utils";

const Bv = ({ idbv, bv, lv }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCandidat = !isEmptyObject(
    useSelector((state) => state.election.candidats)
  )
    ? useSelector((state) => state.election.candidats)
    : getCandidats();
  const candidatVoice = useSelector((state) => state.election.CandidatsVoice);

  let data = candidatVoice.filter(function (params) {
    return params.id_bv === idbv;
  });

  if (isEmptyObject(data)) {
    data = listCandidat;
  } else {
    data = data.sort((a, b) => b.nombre_voix - a.nombre_voix);
  }

  return (
    <>
      <Card className="shadow rounded mb-1">
        <CandidatVoice data={data} />
      </Card>
    </>
  );
};

export default Bv;
