/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, Row, Col, Badge, CardBody } from "reactstrap";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
  Folder,
} from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import "../style.css";
import { getCandidats } from "../../utility/Utils";
import { useState } from "react";

const StatsHorizontal = ({
  idbv,
  bv,
  lv,
  etape,
  idlv,
  votants,
  bulletinOuvert,
  nombreBulletinBlanc,
  nombreBulletinNull,
  route
}) => {
  const navigate = useNavigate();
  const result = useSelector((state) => state.election.resultat);
  const listCandidat = getCandidats();
  const voixCandidat = useSelector((state) => state.election.CandidatsVoice);
  const listCandidatVoixData = [];
  const listCandidatVoix = [];
  const [swiper, setSwiper] = useState(null);

  result?.map((item) => {
    listCandidatVoix.push({
      id: item.id_candidat,
      total_voix: item.total_voix,
      nom: item.nom,
    });
  });

  voixCandidat
    ?.filter(function (param) {
      return param.id_bv === idbv;
    })
    .map((item) => {
      listCandidatVoixData.push({
        id: item.id_candidat,
        voix: item.nombre_voix,
        idBv: item.id_bv,
      });
    });

  let candidatResult = listCandidat.map((candidat) => {
    let candidatVotantData = listCandidatVoixData.find(
      (candidatVotantData) => candidatVotantData.id === candidat.id
    );
    let VotantData = listCandidatVoix.find(
      (VotantData) => VotantData.id === candidat.id
    );
    return {
      ...candidat,
      ...candidatVotantData,
      ...VotantData,
    };
  });

  return (
    <>
      <Card className="rounded mb-1">
        <div>
          <div className=" ">
            <div>
              <div className="border">
                <Row className=" d-flex justify-content-between align-items-center">
                  <Col lg="8">
                    <div style={{ minWidth: "310px", marginLeft: "8px" }}>
                      <b style={{ minWidth: "10px", color: "#000000" }}>{lv}</b>
                    </div>
                    <Badge
                      style={{ marginLeft: "8px" }}
                      color={
                        etape != "Dépouillement pas débuté" &&
                        etape != "Pas debuté"
                          ? "success"
                          : "dark"
                      }
                    >
                      {etape}
                    </Badge>
                  </Col>
                  <Col lg="4">
                    <div
                      className="border"
                      style={{
                        fontWeight: "bold",
                        color: "#000000",
                        padding: "10px",
                      }}
                    >
                      {bv}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="d-flex align-items-center p-1 mt-1">
                <Avatar
                  color={"light-primary"}
                  icon={<Folder size={15} />}
                  className="me-1"
                />
                <div className="my-auto">
                  <h4
                    className="mb-0"
                    style={{ fontWeight: "bold", color: "#183f98" }}
                  >
                    {bulletinOuvert} / {votants}
                  </h4>
                </div>
                <div className="mx-1">
                  <div className="d-flex justify-content-start align-items-center">
                    <div className="profile-user-info">
                      <h6 className="mb-0 mx-1"> Bulletins nuls </h6>
                    </div>
                    <div className="ms-auto">
                      <Badge
                        className="btn-icon"
                        color="light-primary"
                        size="sm"
                      >
                        {nombreBulletinNull}
                      </Badge>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start align-items-center">
                    <div className="profile-user-info">
                      <h6 className="mb-0 mx-1"> Bulletins blancs </h6>
                    </div>
                    <div className="ms-auto">
                      <Badge
                        className="btn-icon"
                        color="light-primary"
                        size="sm"
                      >
                        {nombreBulletinBlanc}
                      </Badge>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start align-items-center">
                    <div className="profile-user-info">
                      <h6 className="mb-0 mx-1"> Suffrage exprimé </h6>
                    </div>
                    <div className="ms-auto">
                      <Badge
                        className="btn-icon"
                        color="light-primary"
                        size="sm"
                      >
                        {Number(votants) -
                          Number(nombreBulletinNull) -
                          Number(nombreBulletinBlanc)}{" "}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                color="secondary"
                size="sm"
                outline
                className="mx-1"
                onClick={() => {
                  navigate(route);
                }}
              >
                <b style={{ color: "#183f98" }}>Détails</b>
              </Button>

              <div className="d-flex mt-1 mb-1">
                <div className="m-auto">
                  <Button
                    className="btn-icon rounded-circle"
                    color="flat-primary"
                    size="sm"
                    onClick={() => swiper.slidePrev()}
                  >
                    <ArrowLeft size={16} />
                  </Button>
                </div>

                <Swiper
                  spaceBetween={3}
                  slidesPerView={2}
                  navigation={true}
                  autoplay={{ delay: 10500, disableOnInteraction: true }}
                  modules={[Autoplay, Navigation]}
                  onSwiper={(s) => {
                    setSwiper(s);
                  }}
                >
                  {candidatResult.map((item) => (
                    <SwiperSlide>
                      <Card className="border rounded m-auto">
                        <div style={{ padding: "4px" }}>
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            className="fw-bold"
                          >
                            {item.nom}
                          </p>
                          <div className="d-flex">
                            <Badge
                              color="light-danger"
                              style={{ fontWeight: "bold", color: "#ffff" }}
                            >
                              {votants
                                ? item.voix
                                  ? parseFloat(
                                      (item.voix * 100) / votants
                                    ).toFixed(2) + "%"
                                  : 0
                                : 0}
                            </Badge>
                            <Badge
                              color="light-success"
                              style={{
                                fontWeight: "bold",
                                marginLeft: "2px",
                              }}
                            >
                              {item.voix ?? 0}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="m-auto">
                  <Button
                    className="btn-icon rounded-circle"
                    color="flat-primary"
                    size="sm"
                    onClick={() => swiper.slideNext()}
                  >
                    <ArrowRight className="text-primary" size={15} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StatsHorizontal;
