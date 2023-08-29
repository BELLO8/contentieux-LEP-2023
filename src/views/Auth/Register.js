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
  Row,
  Col,
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
import { register } from "../../@core/auth/jwt/const";
import toast from "react-hot-toast";
import { AlertCircle, Check } from "react-feather";
import Avatar from "@components/avatar";
import { getCandidatInfo } from "../../redux/store/InfoCandidat";
import img1 from "@src/assets/images/portrait/small/5.jpg";
const defaultValues = {};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idTypeElection, setIdTypeElection] = useState();
  const [idParti, setParti] = useState();
  const [idcirconscription, setIdcirconscription] = useState();

  const typeElection = useSelector((state) => state.typeElection.data);
  const circonscription = useSelector((state) => state.circonscription.data);
  const candidatInfo = useSelector((state) => state.infoCandidat.data);
  const typeElectionData = [];
  const circonscriptionData = [];
  // const partiData = [];

  // parti.map((item) => {
  //   partiData.push({ value: item.id, label: item.libelle });
  // });

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
        navigate("/JamaweAdmin");
      } else {
        navigate("/home");
      }
    }
  }, []);

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      register({ id_candidat: candidatInfo.cod_candidat, ...data })
        .then((res) => {
          if (res.data.status === "success") {
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
            navigate("/login");
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
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center">
            <img  src={img1} alt="Login Cover" height={713} />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg "
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h1" className="fw-bolder mb-1">
              <b style={{ color:"maroon" }}>Elector |</b> Créer votre compte
            </CardTitle>
            <CardText className="mb-2 text-dark">
               Assurer l'égalité des droits et garantir l'égalit des chances.
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
              </div>
              <div className="mb-1">
                <Label className="form-label" for="circons">
                  Selectionner une circonscription
                </Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  id="circons"
                  options={circonscriptionData}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(event) => {
                    setIdcirconscription(event.value);
                    console.log(event.value);
                    dispatch(
                      getCandidatInfo({
                        idTypeElection: idTypeElection,
                        idcirconscription: event.value,
                      })
                    );
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
              <Link to="/login">
                <span>Se connecter</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
    // <div className="auth-wrapper auth-basic px-2">
    //   <div className="auth-inner my-2">
    //     <Card className="mb-0">
    //       <CardBody>
    //         <CardTitle tag="h4" className="mb-1">
    //           Inscription sur Elector ! 👋
    //         </CardTitle>
    //         <CardText className="mb-2">
    //           Créer votre compte et commencez votre aventure
    //         </CardText>
    //         <Form
    //           className="auth-login-form mt-2"
    //           onSubmit={handleSubmit(onSubmit)}
    //         >
    //           <div className="mb-1">
    //             <Label className="form-label" for="login-username">
    //               Username
    //             </Label>
    //             <Controller
    //               id="username"
    //               name="username"
    //               control={control}
    //               render={({ field }) => (
    //                 <Input
    //                   autoFocus
    //                   type="text"
    //                   placeholder="Entrer votre username"
    //                   invalid={errors.username && true}
    //                   {...field}
    //                   required
    //                 />
    //               )}
    //             />
    //           </div>
    //           <div className="mb-1">
    //             <Label className="form-label" for="type-elec">
    //               Selectionner le type d'élection
    //             </Label>
    //             <Select
    //               theme={selectThemeColors}
    //               isClearable={false}
    //               id="type-election"
    //               className="react-select"
    //               classNamePrefix="select"
    //               options={typeElectionData}
    //               onChange={(event) => {
    //                 setIdTypeElection(event.value);
    //                 dispatch(getCirconscription(event.value));
    //               }}
    //             />
    //           </div>
    //           <div className="mb-1">
    //             <Label className="form-label" for="circons">
    //               Selectionner une circonscription
    //             </Label>
    //             <Select
    //               isClearable={false}
    //               theme={selectThemeColors}
    //               id="circons"
    //               options={circonscriptionData}
    //               className="react-select"
    //               classNamePrefix="select"
    //               onChange={(event) => {
    //                 setIdcirconscription(event.value);
    //                 console.log(event.value);
    //                 dispatch(
    //                   getCandidatInfo({
    //                     idTypeElection: idTypeElection,
    //                     idcirconscription: event.value,
    //                   })
    //                 );
    //               }}
    //             />
    //           </div>

    //           <div className="mb-1">
    //             <div className="d-flex justify-content-between">
    //               <Label className="form-label" for="login-password">
    //                 Password
    //               </Label>
    //               <Link to="/forgot-password"></Link>
    //             </div>
    //             <Controller
    //               id="password"
    //               name="password"
    //               control={control}
    //               render={({ field }) => (
    //                 <InputPasswordToggle
    //                   className="input-group-merge"
    //                   invalid={errors.password && true}
    //                   {...field}
    //                   required
    //                 />
    //               )}
    //             />
    //           </div>
    //           <Button type="submit" color="primary" block>
    //             Créer mon compte
    //           </Button>
    //         </Form>
    //         <p className="text-center mt-2">
    //           <span className="me-25">Vous avez déjà un compte ?</span>
    //           <Link to="/login">
    //             <span>Se connecter</span>
    //           </Link>
    //         </p>
    //       </CardBody>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default Register;
