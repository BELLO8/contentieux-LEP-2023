/* eslint-disable */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import InputPasswordToggle from "@components/input-password-toggle";
import { useForm, Controller } from "react-hook-form";
import { getUserData, isUserLoggedIn } from "../../utility/Utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import { getCirconscription } from "../../redux/store/Circonscription";
import { getParti } from "../../redux/store/Parti";
import { getTypeElection } from "../../redux/store/TypeElection";
import { register, registerParti } from "../../@core/auth/jwt/const";
import toast from 'react-hot-toast'
import { Check } from "react-feather";
import Avatar from "@components/avatar";

const defaultValues = {};

const RegisterParti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idTypeElection, setIdTypeElection] = useState();
  const [idParti, setParti] = useState();
  const [idcirconscription, setIdcirconscription] = useState();

  const typeElection = useSelector((state) => state.typeElection.data);
  const circonscription = useSelector((state) => state.circonscription.data);
  const parti = useSelector((state) => state.parti.data);

  const typeElectionData = [];
  const circonscriptionData = [];
  const partiData = [];

  parti.map((item) => {
    partiData.push({ value: item.id, label: item.libelle });
  });

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
  } = useForm({ defaultValues });

  useEffect(() => {
    dispatch(getTypeElection());
    dispatch(getParti());
    if (isUserLoggedIn() !== null) {
      if (getUserData().role === "parti") {
        navigate("/VueParti");
      }else{
        navigate("/home");
      }
    }
  }, []);

  const onSubmit = (data) => {

    if (Object.values(data).every((field) => field.length > 0)) {
      registerParti({
        ...data,
        id_parti: idParti,
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
            navigate("/MonParti/login");
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
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <CardTitle tag="h4" className="mb-1">
              Inscription sur JamElec ! 👋
            </CardTitle>
            <CardText className="mb-2">
              Créer votre compte et commencez votre aventure
            </CardText>
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
                <Label className="form-label" for="parti">
                  Selectionner votre parti politique
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id="parti"
                  className="react-select"
                  classNamePrefix="select"
                  options={partiData}
                  onChange={(event) => {
                    setParti(event.value);
                  }}
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
                Créer mon compte
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Vous avez déjà un compte ?</span>
              <Link to="/MonParti/login">
                <span>Se connecter</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterParti;
