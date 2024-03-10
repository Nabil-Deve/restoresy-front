import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Col, Container, Row } from "react-bootstrap";
import userphoto from "../assets/images/userphoto.avif";

const UserPage = (props) => {
  return (
    <div>
      <Header />
      <Container className="container-user-page">
        <Row>
          <Col>
            <img className="photo-user-page" src={userphoto} />
          </Col>
          <Col>
            <h3>Jean-Pierre Cabri</h3>
            <p>15 rue de la Fourche</p>
            <p>75013 Paris</p>
            <p>jp-cabri@gmail.com</p>
            <p>Tél.: 06 12 12 ** ** </p>
          </Col>
        </Row>
      </Container>
      <Button className="user-page-btn">Modifier</Button>
      <Footer />
    </div>
  );
};

export default UserPage;
