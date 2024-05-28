import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getItemJSON } from "../helpers/storage";
import {
  acceptBooking,
  getMyRatings,
  getRestoBookings,
  refuseBooking,
} from "../services/APIService";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import "moment/min/locales";
import RatingCardResto from "../components/RatingCardResto";
moment.locale("fr");

const RestoDashboard = () => {
  const navigate = useNavigate();
  // Récupérer un resto qui est connecté
  // On créé un state
  const [resto, setResto] = useState(null);
  const [bookings, setBookings] = useState([]); // On initialise avec un tableau vide. On y stocke les résas.
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const u = getItemJSON("resto");
    if (u) {
      setResto(u);
    } else {
      navigate("/");
    }
  }, []);

  // Fonction qui permet de récupérer les bookings
  const onGetRestoBookings = async () => {
    try {
      const res = await getRestoBookings();
      console.log(res.data);
      setBookings(res.data);
    } catch (e) {
      alert(e);
    }
  };

  // Quand le composant est chargé
  useEffect(() => {
    if (resto) {
      onGetRestoBookings();
    }
  }, [resto]);

  // Fonction qui permet de refuser une résa
  const onRefuseBooking = async (bookingId) => {
    try {
      const res = await refuseBooking(bookingId);
      alert("La réservation a bien été annulée");
      onGetRestoBookings(); // On rafraîchit pour que ça se met bien à jour.
    } catch (e) {
      alert(e);
    }
  };

  // Fonction qui permet d'accepter une résa
  const onAcceptBooking = async (bookingId) => {
    try {
      const res = await acceptBooking(bookingId);
      alert("La réservation a bien été acceptée");
      onGetRestoBookings(); // On rafraîchit pour que ça se met bien à jour.
    } catch (e) {
      alert(e);
    }
  };

  // Fonction qui récupère tous les tous les avis par le resto
  const onGetMyRatings = async () => {
    try {
      const res = await getMyRatings();
      setRatings(res.data);
    } catch (error) {
      alert(error);
    }
  };

  // On appelle cette fonction dans un useEffect quand la page est chargé
  useEffect(() => {
    onGetMyRatings();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginLeft: "2px", marginTop: "30px" }}>
              Réservations
            </h1>
            {bookings.map((booking, index) => (
              <Card
                className="card-user-booking"
                key={"bookings" + index}
                style={{ border: "2px solid blue", backgroundColor: "#AFCDF9" }}
              >
                <Card.Body>
                  {/*On ajoute toutes les infos de la résa sur la card.  */}
                  <Card.Title>
                    Client {booking.user.firstName} {booking.user.lastName}
                  </Card.Title>

                  {booking.status == "pending" ? (
                    <Card.Text style={{ color: "blue" }}>
                      En cours de confirmations
                    </Card.Text>
                  ) : null}
                  {booking.status == "refused" ? (
                    <Card.Text style={{ color: "red" }}>
                      Annulé par vous
                    </Card.Text>
                  ) : null}
                  {booking.status == "accepted" ? (
                    <Card.Text style={{ color: "green" }}>Confirmé</Card.Text>
                  ) : null}
                  {booking.status == "canceled" ? (
                    <Card.Text style={{ color: "red" }}>
                      Annulé par le client
                    </Card.Text>
                  ) : null}

                  <Card.Text>
                    <div>
                      <p>Nombre de couverts : {booking.numberGuests}</p>
                      <p>
                        Date: {moment(booking.date).format("DD/MM/YYYY")} à{" "}
                        {booking.hour}
                      </p>
                    </div>
                  </Card.Text>
                  {booking.status == "pending" ? (
                    <Button
                      style={{ marginRight: "5px" }}
                      variant="danger"
                      onClick={() => onRefuseBooking(booking._id)}
                    >
                      Annuler
                    </Button>
                  ) : null}
                  {booking.status == "pending" ? (
                    <Button
                      variant="success"
                      onClick={() => onAcceptBooking(booking._id)}
                    >
                      Confirmer
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col>
            <h1 style={{ marginLeft: "2px", marginTop: "30px" }}>
              Avis des clients
            </h1>
            {ratings.map((rating, index) => (
              <RatingCardResto rating={rating} key={"ratingcard" + index} />
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />;
    </div>
  );
};

export default RestoDashboard;
