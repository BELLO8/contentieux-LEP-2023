/* eslint-disable */

import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "@styles/react/pages/page-authentication.scss";
import InputPasswordToggle from "@components/input-password-toggle";
import { useForm, Controller } from "react-hook-form";
import { getUserData } from "../../utility/Utils";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { getCirconscription } from "../../redux/store/Circonscription";
import { getTypeElection } from "../../redux/store/TypeElection";
import { getBureauVote, getLieuxVote } from "../../redux/store/Election";
import { addRepresentant } from "../../@core/auth/jwt/const";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import Avatar from "@components/avatar";
import { getRepresentant } from "../../redux/store/Representant";

const ModalForm = ({ idbv, idlv }) => {
  console.log(idlv);
  const [formModal, setFormModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [idTypeElection, setIdTypeElection] = useState();
  const [idcirconscription, setIdcirconscription] = useState();
  const [idLieuxVote, setLieuxVote] = useState();
  const [idBureauVote, setBureauVote] = useState();

  const lieuxVote = useSelector((state) => state.election.lieuxVote);
  const bureauVote = useSelector((state) => state.election.bureauVote);

  const lieuxVoteData = [];
  const bureauVoteData = [];

  lieuxVote.map((item) => {
    lieuxVoteData.push({ value: item.cod_lieu, label: item.lib_lvote });
  });

  bureauVote.map((item) => {
    bureauVoteData.push({ value: item.cod_bv, label: item.lib_bv });
  });
  const typeElection = useSelector((state) => state.typeElection.data);
  const circonscription = useSelector((state) => state.circonscription.data);

  const typeElectionData = [];
  const circonscriptionData = [];

  typeElection.map((item) => {
    typeElectionData.push({ value: item.id_type, label: item.type_election });
  });

  circonscription.map((item) => {
    circonscriptionData.push({ value: item.id_circons, label: item.circons });
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = getUserData();

  useEffect(() => {
    dispatch(getLieuxVote(user.id_circons));
  }, [dispatch]);

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      addRepresentant({
        ...data,
        id_type_election: user.id_type_election,
        id_circons: user.id_circons,
        id_parti: user.id_parti,
        id_candidat: user.id_candidat,
        id_lieu_vote: idlv == 'undefined' ? idLieuxVote : idlv,
        id_bureau_vote: idlv == 'undefined' ? idBureauVote : idbv,
        id_role: "1",
      })
        .then((res) => {
          if (res.data.status === "success") {
            localStorage.removeItem("candidatInfo");
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar
                    size="sm"
                    color="success"
                    icon={<Check size={12} />}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6>{res.data.message}</h6>
                </div>
              </div>
            );
            setFormModal(!formModal);
            dispatch(getRepresentant(user.id_candidat));
          } else if (res.data.status === "error") {
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar
                    size="sm"
                    color="danger"
                    icon={<AlertCircle size={12} />}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6>{res.data.message}</h6>
                  <Link to="/paiement-candidat">payer maintenant</Link>
                </div>
              </div>
            );
          }
        })
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST") {
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar
                    size="sm"
                    color="danger"
                    icon={<AlertCircle size={12} />}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6>{err.response.data.message}</h6>
                </div>
              </div>
            );
          } else {
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar
                    size="sm"
                    color="danger"
                    icon={<AlertCircle size={12} />}
                  />
                </div>
                <div className="d-flex flex-column">
                  <h6>{err.message}</h6>
                </div>
              </div>
            );
          }

          console.log(err);
        });
    }
  };

  return (
    <div className="demo-inline-spacing">
      <div>
        <Button color="primary" onClick={() => setFormModal(!formModal)}>
          Ajouter un répresentant
        </Button>
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={() => setFormModal(!formModal)}>
            Ajout d'un representant dans un bureau de vote
          </ModalHeader>
          <ModalBody>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-username">
                  Username
                </Label>
                <Controller
                  id="username"
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Entrer votre username"
                      invalid={errors.username && true}
                      {...field}
                      required
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="login-nom">
                  Nom
                </Label>
                <Controller
                  id="nom"
                  name="nom"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Entrer votre nom"
                      invalid={errors.nom && true}
                      {...field}
                      required
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="login-prenoms">
                  Prenom
                </Label>
                <Controller
                  id="prenoms"
                  name="prenoms"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Entrer votre prenom"
                      invalid={errors.prenoms && true}
                      {...field}
                      required
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="login-telephone">
                  Contact
                </Label>
                <Controller
                  id="telephone"
                  name="telephone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Entrer votre numéro de telephone"
                      invalid={errors.telephone && true}
                      {...field}
                      required
                    />
                  )}
                />
              </div>
              {/* <div className="mb-1">
                <Label className="form-label" for="type-elec">
                  Selectionner le type d'élection
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id="type-election"
                  className="react-select"
                  classNamePrefix="select"
                  options={typeElectionData}
                  onChange={(event) => {
                    setIdTypeElection(event.value);
                    dispatch(getCirconscription(event.value));
                  }}
                />
              </div> */}
              {idlv === 'undefined' ? (
                <>
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
                      }}
                    />
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password"></Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                      required
                    />
                  )}
                />
              </div>

              <Button type="submit" color="primary" block>
                Ajouter le representant
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default ModalForm;
