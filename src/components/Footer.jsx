import React from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <h5>A propos</h5>
            <ul>
              <li>
                <Link to="#">Qui sommes-nous?</Link>
              </li>
              <li>
                <Link to="#">Contactez-nous</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Ressources</h5>
            <ul>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="#">Politique de confidentialité</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5>Suivez-nous!</h5>
            <ul>
              <li>
                <Link to="#">Instagram</Link>
              </li>
              <li>
                <Link to="#">Twitter</Link>
              </li>
              <li>
                <Link to="#">Facebook</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            © 2024 RestoResy. Tous droits réservés
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
