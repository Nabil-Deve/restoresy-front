import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getItemJSON } from "../helpers/storage";
import {
  acceptBooking,
  getRestoBookings,
  refuseBooking,
} from "../services/APIService";
import moment from "moment";
import "moment/min/locales";
moment.locale("fr");

const RestoDashboard = (props) => {
  const navigate = useNavigate();
  // Récupérer un resto qui est connecté
  // On créé un state
  const [resto, setResto] = useState(null);
  const [bookings, setBookings] = useState([]);

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

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>Réservations</h1>
            {bookings.map((booking, index) => (
              <Card className="card-user-booking" key={"bookings" + index}>
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
                        {moment(booking.hour).format("HH:hh")}
                      </p>
                    </div>
                  </Card.Text>
                  {booking.status == "pending" ? (
                    <Button
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
            <h1>Avis des clients</h1>
            <Card className="card-dashboard">
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Voir</Button>
              </Card.Body>
            </Card>

            <Card className="card-dashboard">
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Voir</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />;
    </div>
  );
};

export default RestoDashboard;
