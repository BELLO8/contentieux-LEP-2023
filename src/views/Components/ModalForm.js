/* eslint-disable */

import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import "@styles/react/pages/page-authentication.scss";
import InputPasswordToggle from "@components/input-password-toggle";
import { useForm, Controller } from "react-hook-form";
import { getUserData } from "../../utility/Utils";
import { useDispatch } from "react-redux";
import { addRepresentant } from "../../@core/auth/jwt/const";
import toast from "react-hot-toast";
import { Check, Plus } from "react-feather";
import Avatar from "@components/avatar";
import { getRepresentant } from "../../redux/store/Representant";

const ModalForm = ({ idbv, idlv, rep }) => {
  const [formModal, setFormModal] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = getUserData();

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      addRepresentant({
        ...data,
        id_type_election: user.id_type_election,
        id_circons: user.id_circons,
        id_parti: user.id_parti,
        id_candidat: user.id_candidat,
        id_lieu_vote: idlv,
        id_bureau_vote: idbv,
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
    <div>
      <b>{rep}</b> Répresentant(s)
      <Button
        color="primary"
        className="btn-icon rounded-circle"
        onClick={() => setFormModal(!formModal)}
      >
        <Plus size={14} />
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
  );
};
export default ModalForm;
