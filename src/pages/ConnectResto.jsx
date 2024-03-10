import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Form } from "react-bootstrap";
import { loginResto } from "../services/APIService";
import { useNavigate } from "react-router-dom";
import { setItemJSON } from "../helpers/storage";
import Footer from "../components/Footer";

const ConnectResto = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginResto = async () => {
    try {
      const res = await loginResto({
        email,
        password,
      });
      console.log(res.data);
      let resto = res.data.resto;
      resto.token = res.data.token;
      setItemJSON("resto", resto);
      navigate("/restodashboard");
    } catch (e) {
      alert("Erreur d'authentification. Merci de vérifier votre saisie.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container-co-resto">
        <Form className="form-co-resto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Entrez l'email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Entrez le mot de passe"
            />
          </Form.Group>

          <Button onClick={onLoginResto} variant="primary">
            Se connecter
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default ConnectResto;
