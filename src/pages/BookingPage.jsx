import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import restophoto from "../assets/images/restophoto.svg";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Button, Col, Container, Row } from "react-bootstrap";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking, getRestoById } from "../services/APIService";

const Booking = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [resto, setResto] = useState(null);

  const [numberGuests, setNumberGuests] = useState(1);
  const [hour, setHour] = useState(new Date());
  const [comment, setComment] = useState(null);
  const [date, setDate] = useState(new Date());

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
    // une fois que le composant est chargé, on appelle la fonction onGetResto qui va récupérer le resto avec son id (dans les params) depuis le back-end
    if (params.restoId) {
      onGetResto();
    }
  }, [params]);

  const increase = () => {
    if (numberGuests + 1 <= 12) {
      setNumberGuests(numberGuests + 1);
    }
  };

  const dicrease = () => {
    if (numberGuests - 1 > 0) {
      setNumberGuests(numberGuests - 1);
    }
  };

  const onCreateBooking = async () => {
    try {
      const res = await createBooking(
        resto._id,
        numberGuests,
        hour,
        date,
        comment
      );
      alert("Votre réservation a bien été enregistrée.");
      navigate("/search");
    } catch (e) {
      alert(e);
    }
  };
  if (resto) {
    return (
      <div>
        <Header />

        <Container className="resto-details-bp">
          <Row>
            <Col>
              <img src={restophoto} />
            </Col>
            <Col>
              <div>
                <h1>{resto.name}</h1>
                <p>{resto.address} </p>
                <p>{resto.cuisine}</p>
                <p>Email: {resto.email}</p>
                <p>Téléphone: {resto.phone}</p>
                <p>Horaires: {resto.hours}</p>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <p>Nombre de couverts</p>
              <Button onClick={dicrease}>-</Button>
              {numberGuests}
              <Button onClick={increase}>+</Button>

              <div className="timepicker">
                <TimePicker onChange={setHour} value={hour} />
              </div>
              <p className="comment-bp">Commentaires</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    type="name"
                    placeholder="Entrez vos commentaires"
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col>
              <Calendar onChange={setDate} value={date} />
              <Button className="button-bp" onClick={onCreateBooking}>
                {/*En cliquant sur ce bouton, ça redirige vers SearchPage */}
                Confirmer cette date
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

export default Booking;
