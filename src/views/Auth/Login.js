/* eslint-disable */

import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";
import img1 from "@src/assets/images/portrait/small/6.jpg";
import "@styles/react/pages/page-authentication.scss";
import { useEffect } from "react";
import { AlertCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";
import { login } from "../../@core/auth/jwt/const";
import { handleLogin } from "../../redux/auth";
import {
  getCandidats,
  getLieuxVote,
  statLVBV
} from "../../redux/store/Election";
import {
  getHomeRouteForLoggedInUser,
  getUserData,
  isUserLoggedIn,
} from "../../utility/Utils";

const defaultValues = {
  password: "",
  username: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
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
      login({
        username: data.username,
        password: data.password,
      })
        .then((res) => {
          const Token = res.data.data.token;
          if (res.data.status === "success") {
            const data = {
              ...res.data.data.user,
              role: "candidat",
              accessToken: Token,
              refreshToken: res.data.refreshToken,
            };
            dispatch(handleLogin(data));
            // dispatch(nombreElecteurByBvBYCircons());
            dispatch(getLieuxVote());
            dispatch(statLVBV());
            // dispatch(nombreLV());
            // dispatch(nombreElecteur());
            dispatch(getCandidats());
            navigate(getHomeRouteForLoggedInUser("candidat"));
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
            <img src={img1} alt="Login Cover" height={713} />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg " lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h1" className="fw-bolder mb-1">
              <b style={{ color: "maroon" }}>Elector |</b> Connectez-vous
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
                      placeholder="username"
                      invalid={errors.username && true}
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
                Se connecter
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Nouveau sur notre plateforme?</span>
              <Link to="/inscription">
                <span>créer un compte</span>
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
    //           Bienvenue sur JamElec ! 👋
    //         </CardTitle>
    //         <CardText className="mb-2">
    //           Connectez-vous à votre compte et commencez l'aventure
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
    //                   placeholder="username"
    //                   invalid={errors.username && true}
    //                   {...field}
    //                   required
    //                 />
    //               )}
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
    //             Se connecter
    //           </Button>
    //         </Form>
    //         <p className="text-center mt-2">
    //           <span className="me-25">Nouveau sur notre plateforme?</span>
    //           <Link to="/inscription">
    //             <span>créer un compte</span>
    //           </Link>
    //         </p>
    //       </CardBody>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default Login;
