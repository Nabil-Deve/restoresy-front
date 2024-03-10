import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Col, Form, Container, Button } from "react-bootstrap";

const RatingReply = (props) => {
  return (
    <div>
      <Header />
      <Container>
        <Col>
          <Col>
            <Form className="form-rating-page">
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Votre avis</Form.Label>
                <Form.Control type="" placeholder="" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form className="form-rating-page">
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Répondre</Form.Label>
                <Form.Control type="" placeholder="" />
              </Form.Group>
            </Form>
          </Col>
        </Col>
        <Button className="button-rating-page" variant="primary" type="submit">
          Envoyer ma réponse
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default RatingReply;
