/* eslint-disable */
import Avatar from "@components/avatar";

// ** Icons Imports
import * as Icon from "react-feather";
import { selectThemeColors } from "@utils";
import Select from "react-select";
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getBureauVote,
  getLieuxVote,
  nombreElecteurBv,
  nombreVotant,
  tauxParticipation,
} from "../../redux/store/Election";
import { getUserData } from "../../utility/Utils";

const CardTransactions = () => {
  const dispatch = useDispatch();

  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);
  const taux = useSelector((state) => state.election.taux);

  const nbreElectBv = useSelector(
    (state) => state.election.nbreElectBv.population
  );
  const nbrevotant = useSelector((state) => state.election.nbrVotant.data);

  const lieuxVoteData = [];
  const bureauVoteData = [];

  lieuxVote.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  bureauVote.map((item) => {
    bureauVoteData.push({ value: item.cod_bv, label: item.lib_bv });
  });
  const user = getUserData();

  useEffect(() => {
    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch]);

  const transactionsArr = [
    {
      title: "Electeurs",
      color: "light-primary",
      subtitle: "Nombre de l'electeur sur la liste",
      amount: nbreElectBv,
      Icon: Icon["Users"],
      down: true,
    },
    {
      title: "Votants",
      color: "light-success",
      subtitle: "Nombre de votants",
      amount: nbrevotant,
      Icon: Icon["Check"],
    },
    {
      title: "Taux de participation",
      color: "light-danger",
      subtitle: "Pourcentage d'évolution de votants",
      amount: `${taux}%`,
      Icon: Icon["Percent"],
    },
  ];

  const renderTransactions = () => {
    return transactionsArr.map((item) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            <Avatar
              className="rounded"
              color={item.color}
              icon={<item.Icon size={18} />}
            />
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              <small>{item.subtitle}</small>
            </div>
          </div>
          <div
            className={`fw-bolder ${
              item.down ? "text-danger" : "text-success"
            }`}
          >
            {item.amount}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">Déroulement du vote</CardTitle>
      </CardHeader>

      <CardBody>
        <div className="mb-1">
          <Label className="form-label" for="type-elec">
            Selectionner un lieu de vote
          </Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            id="type-election"
            className="react-select"
            classNamePrefix="select"
            options={lieuxVoteData}
            onChange={(event) => {
              setLieuxVote(event.value);
              dispatch(getBureauVote(event.value));
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="type-elec">
            Selectionner un bureau de vote
          </Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            id="type-election"
            className="react-select"
            classNamePrefix="select"
            options={bureauVoteData}
            onChange={(event) => {
              setBureauVote(event.value);
              dispatch(nombreElecteurBv(event.value));
              dispatch(
                nombreVotant({
                  id_bv: event.value,
                  id_type: user.id_type_election,
                  id_parti: user.id_parti,
                })
              );
              dispatch(
                tauxParticipation({
                  id_bv: event.value,
                  id_type: user?.id_type_election,
                  id_parti: user?.id_parti,
                })
              );
            }}
          />
        </div>
        {renderTransactions()}
      </CardBody>
    </Card>
  );
};

export default CardTransactions;
