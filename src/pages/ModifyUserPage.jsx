import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import userphoto from "../assets/images/userphoto.avif";

const ModifyUserPage = (props) => {
  return (
    <div>
      <Header />
      <Container className="container-modify-up">
        <Row>
          <Col>
            <Col>
              <img src={userphoto} />
            </Col>

            <Button>Télécharger une photo</Button>
          </Col>
          <Col>
            <Form style={{ width: "50%" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="name" placeholder="Entrez votre nom" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="first-name"
                  placeholder="Entrez votre prénom"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="zipcode"
                  placeholder="Entrez votre adresse"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre numéro de téléphone"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Button className="button-update-m-up" variant="primary" type="submit">
        Mettre à jour
      </Button>
      <Footer />
    </div>
  );
};

export default ModifyUserPage;
