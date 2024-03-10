import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactStars from "react-rating-stars-component";
import { Button, Form } from "react-bootstrap";

const Ratingpage = (props) => {
  return (
    <div>
      <Header />

      <Form className="form-rating-page ">
        <ReactStars count={5} size={50} activeColor="#ffd700" />
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Votre avis</Form.Label>
          <Form.Control type="" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Points forts</Form.Label>
          <Form.Control type="" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Points faibles</Form.Label>
          <Form.Control type="" placeholder="" />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit">
        Publier mon avis
      </Button>
      <Footer />
    </div>
  );
};

export default Ratingpage;
