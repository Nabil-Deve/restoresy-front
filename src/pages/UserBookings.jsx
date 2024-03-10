import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Card } from "react-bootstrap";
import { getItemJSON } from "../helpers/storage";
import { useNavigate } from "react-router-dom";
import { cancelBooking, getUserBookings } from "../services/APIService";
import moment from "moment";
import "moment/min/locales";
moment.locale("fr");

const UserBookings = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Vérifier si le user est connecté
  useEffect(() => {
    const u = getItemJSON("user");
    if (u) {
      setUser(u);
    } else {
      navigate("/");
    }
  }, []);

  // Fonction qui permet de récupérer les résas
  const onGetUserBookings = async () => {
    try {
      const res = await getUserBookings();
      setBookings(res.data);
    } catch (e) {
      alert(e);
    }
  };

  // Quand le composant est chargé
  useEffect(() => {
    if (user) {
      onGetUserBookings();
    }
  }, [user]);

  const onCancelBooking = async (bookingId) => {
    try {
      const res = await cancelBooking(bookingId);
      alert("La réservation a bien été annulée");
      onGetUserBookings(); // On rafraîchit pour que ça se met bien à jour.
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <Header />

      <h1 className="user-bookings">Mes réservations</h1>
      <div className="list-bookings">
        {/*On fait une boucle pour afficher toutes les résas une par une grâce à map. Quand on créé un map il faut donner une clé unique à chaque élément de la liste*/}
        {bookings.map((booking, index) => (
          <Card className="card-user-booking" key={"bookings" + index}>
            <Card.Body>
              {/*On ajoute toutes les infos de la résa sur la card.  */}
              <Card.Title>Chez {booking.resto.name}</Card.Title>
              {booking.status == "pending" ? (
                <Card.Text style={{ color: "blue" }}>
                  En cours de confirmation
                </Card.Text>
              ) : null}
              {booking.status == "refused" ? (
                <Card.Text style={{ color: "red" }}>
                  Annulé par le resto
                </Card.Text>
              ) : null}
              {booking.status == "accepted" ? (
                <Card.Text style={{ color: "green" }}>
                  Confirmé par le resto
                </Card.Text>
              ) : null}
              {booking.status == "canceled" ? (
                <Card.Text style={{ color: "red" }}>Annulé par vous</Card.Text>
              ) : null}

              <Card.Text>
                <div>
                  <p>{booking.resto.address} </p>
                  <p>{booking.resto.cuisine}</p>
                  <p>
                    Date: {moment(booking.date).format("DD/MM/YYYY")} à{" "}
                    {moment(booking.hour).format("HH:hh")}
                  </p>
                </div>
              </Card.Text>
              {booking.status == "pending" || booking.status == "accepted" ? (
                <Button
                  variant="primary"
                  onClick={() => onCancelBooking(booking._id)}
                >
                  Annuler
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default UserBookings;
