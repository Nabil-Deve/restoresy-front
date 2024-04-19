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

const Booking = () => {
  // React va sur localhost:3000/booking/id (du resto)
  // Le useParams va lui permettre de récupéer l'id du resto
  // useParams : fonction de React.
  const params = useParams();
  const navigate = useNavigate();

  // Initialiser l'état du resto à null car on n'a pas encore choisi de resto
  const [resto, setResto] = useState(null);

  // L'état des variables avant de réserver
  const [numberGuests, setNumberGuests] = useState(1);
  const [hour, setHour] = useState("10:00");
  const [comment, setComment] = useState(null);
  const [date, setDate] = useState(new Date());
  console.log(hour);

  // Elle sert à récupérer l'id du resto dans le back
  const onGetResto = async () => {
    try {
      const restoId = params.restoId;
      const res = await getRestoById(restoId); // res : réponse qu'on reçoit du back
      setResto(res.data); // Pour afficher les infos du resto. Objet qu'on voit dans la console. C'est le resto.
      console.log(res.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    // Chaque fois que params change, une fois que le composant est chargé, on appelle la fonction onGetResto qui va récupérer le resto avec son id (dans les params) depuis le back-end
    if (params.restoId) {
      onGetResto();
    }
  }, [params]); // Quand la valeur de params change, on réexecute la fonction.

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

  // Fonction qui sera appelée au click pour pouvoir créer le booking dans la bancked
  const onCreateBooking = async () => {
    try {
      const res = await createBooking(
        resto._id,
        numberGuests,
        hour,
        date,
        comment
      );
      console.log("hour après", hour);
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
              {/*C'est la fonction setResto qui change la valeur du resto. */}
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

{
  /*{/*

 useEffect(() => {
    // on appelle notre Notre fonction 
    onGetResto()

  }, [params]); quand la varible params elle change le use efffect il se réexécute 

*/
}
