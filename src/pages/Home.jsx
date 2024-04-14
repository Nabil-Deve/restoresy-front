import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import { Alert, Button } from "react-bootstrap";
import dishes from "../assets/images/dishes.svg";
import Footer from "../components/Footer";
import { loginUser } from "../services/APIService";
import { useNavigate } from "react-router-dom";
import { getItemJSON, setItemJSON } from "../helpers/storage";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Si connecté en tant que user, redirection vers Search.
  // Si non connecté comme user, on vérifie si connecté comme resto.
  // Si connecté comme resto, redidrection vers restodashboard.
  useEffect(() => {
    const u = getItemJSON("user");
    if (u) {
      navigate("/search");
    } else {
      const r = getItemJSON("resto");
      if (r) {
        navigate("/restodashboard");
      }
    }
  }, []); // Tableau de paramètres.

  const onLoginUser = async () => {
    try {
      const res = await loginUser({
        email,
        password,
      });
      console.log(res.data);
      let user = res.data.user; // On stocke le user dans une variable
      user.token = res.data.token; // On attache à cette variable le token de ce user
      setItemJSON("user", user); // On stocke le user récupéré depuis le backend dans le localstorage du navigateur
      navigate("/search"); // Permet de rediriger le user dans la page search.
    } catch (e) {
      alert("Erreur d'authentification. Merci de vérifier votre saisie.");
    }
  };

  return (
    <div>
      <Header />
      <div className="home-section">
        <div className="presentation">
          <h3>
            Bienvenue sur RestoResy, l'application qui rend la réservation de
            tables de restaurant aussi simple que délicieuse.
          </h3>

          <h3>
            Découvrez une expérience gastronomique sans tracas en réservant
            votre place dès maintenant.
          </h3>
          <h3>Bon appétit ! 🍽️</h3>
        </div>
        <div className="form-section">
          <div className="form">
            <Form>
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

              <Button onClick={onLoginUser} variant="primary">
                Se connecter
              </Button>
              <div className="alert-link">
                <Alert.Link onClick={() => navigate("/connectresto")}>
                  Vous êtes un restaurant ?
                </Alert.Link>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="photo-dish">
        <img src={dishes} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
