import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import restophoto from "../assets/images/restophoto.svg";
import { Button, Col, Container, Row } from "react-bootstrap";

const BookingConfirmation = () => {
  return (
    <div>
      <Header />
      <div className="resto-details">
        <img src={restophoto} />
        <div className="my-booking">
          <h1>Votre réservation Chez Bébert </h1>
          <p>40 rue Faubourg 75018 Paris</p>
          <p>Cuisine Variée</p>
        </div>
      </div>

      <div className="validate-booking">
        <h1>Jean-Marc souhaite réserver une table dans votre restaurant!</h1>
        <h1>Valider la date et l’heure de la réservation numéro 1872032583</h1>
      </div>

      <Container className="buttons-container-bc">
        <Row>
          <Col>
            <h2>Heure</h2>
            <Button>Valider la réservation</Button>
          </Col>
          <Col>
            <h2>Date</h2>
            <Button>Annuler</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
