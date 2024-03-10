import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";

const ModifyRestoPage = (props) => {
  return (
    <div>
      <Header />
      <Form className="form-modify-rp">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nom du restaurant</Form.Label>
          <Form.Control type="" placeholder="Entrez le nom du restaurant" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="first-name" placeholder="Entrez votre addresse" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Entrez votre email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            type=""
            placeholder="Entrez votre numéro de téléphone"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Type de cuisine</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez le type de cuisine"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Horaires d'ouverture</Form.Label>
          <Form.Control
            type="password-confirm"
            placeholder="Entrez les horaires d'ouverture"
          />
        </Form.Group>

        <Button className="button-modify-rp" variant="primary" type="submit">
          Modifier
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default ModifyRestoPage;
