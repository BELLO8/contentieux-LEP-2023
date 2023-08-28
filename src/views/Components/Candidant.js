/* eslint-disable */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row } from "reactstrap";
import { voice } from "../../redux/store/Election";
import { getCandidats, getUserData } from "../../utility/Utils";
import { io } from "socket.io-client";
import img1 from "@src/assets/images/portrait/small/1.png";
import vide from "@src/assets/images/portrait/small/vide.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";

const socket = io.connect("https://jellyfish-app-wxyzd.ondigitalocean.app", {
  transports: ["websocket"],
});

const Candidat = () => {
  const dispatch = useDispatch();
  const listCandidat = getCandidats();
  const voix = useSelector((state) => state.election.voix);
  const resultat = useSelector((state) => state.election.resultat);
  const user = getUserData();

  const listCandidatVoixData = [];
  const voixData = [];

  voix?.map((item) => {
    voixData.push({ id: item.id_candidat, voix: item.nombre_voix });
  });

  resultat?.map((item) => {
    listCandidatVoixData.push({
      id: item.id_candidat,
      total_voix: item.total_voix,
      nom: item.nom,
    });
  });

  let candidatResult = listCandidat?.map((candidat) => {
    let voix = voixData.find((voix) => voix.id === candidat.id);
    let candidatVotantData = listCandidatVoixData.find(
      (candidatVotantData) => candidatVotantData.id === candidat.id
    );
    return { ...candidat, ...voix, ...candidatVotantData };
  });

  useEffect(() => {
    socket.on(`insertedvoix-${user.id_candidat}`, (data) => {
      console.log(data);
      dispatch(voice(data));
      dispatch(
        getResult({
          id_circons: user?.id_circons,
          id_parti: user?.id_parti,
          type: user?.id_type_election,
        })
      );
    });
  }, [dispatch, socket]);

  const renderCandidatList = () => {
    return (
      <Swiper
        spaceBetween={7}
        slidesPerView={6}
        navigation={true}
        autoplay={{ delay: 10500, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
      >
        {candidatResult
          ?.sort((a, b) => Number(b.total_voix) - Number(a.total_voix))
          .map((item) => (
            <SwiperSlide>
              <Card className="shadow-none">
                <img className="img-fluid m-1" src={img1} alt="Card cap" />
                {/* <CardImg top src={img1} alt='Card cap' /> */}
                <div
                  className="d-flex flex-column align-items-center text-center"
                  style={{ minHeight: "52px" }}
                >
                  <p>
                    <b>{item.nom}</b>
                  </p>
                </div>
                <div style={{ height: "12px" }}></div>
                <div className=" d-flex align-items-center flex-column text-white bg-danger">
                  <b>{item.parti}</b>
                </div>
                <div className="d-flex align-items-center flex-column">
                  <h2 className="mt-1 mb-1">{item.total_voix ?? 0}</h2>
                </div>
              </Card>
            </SwiperSlide>
          ))}

        {listCandidatVoixData
          .filter(function (param) {
            return param.id == "-1" || param.id == "-2";
          })
          .map((item) => (
            <SwiperSlide>
              <Card className="shadow-none">
                <img className="img-fluid m-1" src={vide} alt="Card cap" />
                {/* <CardImg top src={img1} alt='Card cap' /> */}
                <div
                  className="d-flex flex-column align-items-center text-center"
                  style={{ minHeight: "52px" }}
                >
                  <p>
                    <b>{item.nom}</b>
                  </p>
                </div>
                <div style={{ height: "12px" }}></div>
                {/* <div className=" d-flex align-items-center flex-column text-white bg-danger">
                <b>{item.parti}</b>
              </div> */}
                <div className="d-flex align-items-center flex-column">
                  <h2 className="mt-1 mb-1">{item.total_voix}</h2>
                </div>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  };

  return (
    <>
      <Row className="mt-5">
        <h5 className="mb-1">
          Candidats
          {/*  <Button className="btn-sm" color="primary" tag={Link} to="/resultat">Afficher les résultats</Button> */}
        </h5>
        {renderCandidatList()}
      </Row>
    </>
  );
};

export default Candidat;
