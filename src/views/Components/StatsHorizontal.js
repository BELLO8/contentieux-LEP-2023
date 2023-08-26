/* eslint-disable */

import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, Row, Col, Badge, CardBody } from "reactstrap";
import { Folder } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";

const StatsHorizontal = ({
  idbv,
  bv,
  lv,
  candidats,
  etape,
  idlv,
  votants,
  bulletinOuvert,
  nombreBulletinBlanc,
  nombreBulletinNull,
}) => {
  const navigate = useNavigate();

  console.log(candidats);
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
                        etape != "Dépouillement pas débuté" ? "success" : "dark"
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

                  <div className="d-flex justify-content-start align-items-center">
                    <div className="profile-user-info">
                      <h6 className="mb-0 mx-1"> Bulletin null </h6>
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
                      <h6 className="mb-0 mx-1"> Bulletin blanc </h6>
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
                </div>
              </div>
              <Button
                color="secondary"
                size="sm"
                outline
                className="mx-1"
                onClick={() => {
                  navigate(
                    `/depouillement/depouillement-par-bv/${idlv}/${idbv}`
                  );
                }}
              >
                <b style={{ color: "#183f98" }}>Détails</b>
              </Button>
              <div className="border">
                <Row>
                  <Swiper
                    spaceBetween={2}
                    slidesPerView={2}
                    navigation={true}
                    autoplay={{ delay: 10500, disableOnInteraction: false }}
                    modules={[Autoplay, Navigation]}
                  >
                    {candidats.map((item) => (
                      <SwiperSlide>
                        <Card className="border">
                          <CardBody>
                            <small>{item.nom}</small>
                            <div className="d-flex my-auto">
                              <h4
                                className="mb-0 bg-secondary px-1"
                                style={{ fontWeight: "bold", color: "#ffff" }}
                              >
                                {}
                              </h4>
                              <h4
                                className="mb-0 bg-secondary px-1"
                                style={{
                                  fontWeight: "bold",
                                  borderLeft: "solid 2px white",
                                }}
                              >
                                {item.voix}
                              </h4>
                            </div>
                          </CardBody>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StatsHorizontal;
