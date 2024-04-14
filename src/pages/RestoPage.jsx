import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import restophoto from "../assets/images/restophoto.svg";
import star from "../assets/images/star.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { getRestoById, getRestoRatings } from "../services/APIService";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const RestoPage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [resto, setResto] = useState(null);
  const [selectedSection, setSelectedSection] = useState("about");
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const onGetResto = async () => {
    try {
      const restoId = params.restoId;
      const res = await getRestoById(restoId);
      setResto(res.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (params.restoId) {
      onGetResto();
    }
  }, [params]);

  // Fonction qui permet de récupérer les avis
  const onGetRestoRatings = async () => {
    try {
      const res = await getRestoRatings(resto._id);
      setRatings(res.data);
      let average =
        res.data.length > 0
          ? res.data.reduce((acc, rating) => acc + rating.stars, 0) / // ? : si    : else
            res.data.length
          : 0;

      setAverageRating(average);
    } catch (e) {
      alert(e);
    }
  };

  // Quand le composant est chargé
  useEffect(() => {
    if (resto) {
      onGetRestoRatings();
    }
  }, [resto]);

  if (resto) {
    return (
      <div>
        <Header />

        <Container className="container-resto-page">
          <Row className="content-resto-page">
            <Col>
              <div className="resto-details">
                <img src={restophoto} />
                <div className="resto-address">
                  <h1>
                    {resto.name}
                    {averageRating != 0 ? (
                      <ReactStars
                        edit={false}
                        value={averageRating}
                        count={5}
                        size={40}
                        activeColor="#ffd700"
                      />
                    ) : null}
                  </h1>
                  <p>{resto.address}</p>
                  <p>{resto.cuisine}</p>
                  <p>Email: {resto.email}</p>
                  <p>Téléphone: {resto.phone}</p>
                  <p>Horaires: {resto.hours}</p>
                </div>
              </div>

              <ButtonGroup aria-label="stack-resto-page">
                <Button
                  variant={selectedSection == "about" ? "secondary" : "light"}
                  onClick={() => setSelectedSection("about")}
                >
                  A propos
                </Button>
                <Button
                  variant={selectedSection == "menu" ? "secondary" : "light"}
                  onClick={() => setSelectedSection("menu")}
                >
                  Menu
                </Button>
                <Button
                  variant={selectedSection == "photos" ? "secondary" : "light"}
                  onClick={() => setSelectedSection("photos")}
                >
                  Photos
                </Button>
                <Button
                  variant={selectedSection == "ratings" ? "secondary" : "light"}
                  onClick={() => setSelectedSection("ratings")}
                >
                  Avis
                </Button>
              </ButtonGroup>
              {selectedSection == "about" ? (
                <div className="resto-description">
                  <p style={{ marginLeft: "10px" }}> {resto.about}</p>
                </div>
              ) : null}

              {selectedSection == "menu" ? (
                <div className="resto-menu">
                  <p style={{ marginLeft: "10px" }}> {resto.menu}</p>
                </div>
              ) : null}

              {selectedSection == "ratings" ? (
                <div className="resto-menu">
                  {ratings.map((rating, index) => (
                    <div key={"rating" + index}>
                      <ReactStars
                        edit={false}
                        value={rating.stars}
                        count={5}
                        size={40}
                        activeColor="#ffd700"
                      />
                      <h4>{rating.content}</h4>
                      {rating.restoReply ? (
                        <p>Réponse du resto : {rating.restoReply}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </Col>

            <Col className="column-calendar-btn">
              <Button onClick={() => navigate("/bookingpage/" + resto._id)}>
                Réserver une table
              </Button>
            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    );
  } else {
    return null;
  }
};

export default RestoPage;
