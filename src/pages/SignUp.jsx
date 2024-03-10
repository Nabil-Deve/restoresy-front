import React, { useState } from "react";
import Header from "../components/Header";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { registerUser } from "../services/APIService";
import { useNavigate } from "react-router-dom";

// Création des states, puis on  met à jour les states avec l'événement onChange qui détecte quand l'utilisateur écrit dans un champ de texte.
const SignUp = (props) => {
  const navigate = useNavigate();
  // Un state est un objet js qui permet de stocker une variable autrement dit un état. Cet état peut changer au fil du temps en fonction de ce que l'utilisateur écrit avec son clavier. Dans la création du state, on distingue 2 parties : le state lui-même (firstNam) et la fonction qui permet de mettre à jour le state (setFirstName par exemple).
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // On crée une fonction qui va être appelée sur le click du bouton m'inscrire
  const onRegisterUser = async () => {
    try {
      // On appelle la fonction registerUser pour envoyer les données remplies par le user au backend
      const res = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      console.log(res.data); // data : contenu de ce que le serveur me renvoie comme réponse.

      alert(
        "Votre compte utilisateur a bien été créé. Merci de vous connecter."
      );
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-signup">
        <Form className="form-signup-style">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom</Form.Label>
            {/*On a créé un événement onChange qui permet de détecter lorsque le user écrit dans ce champ de texte. Lorsque le user écrit, on met à jour la valeur du state avec le setFirstName*/}
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="name"
              placeholder="Entrez votre nom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="first-name"
              placeholder="Entrez votre prénom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Entrez votre email"
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
          {/*onClick permet d'appeler la fonction onRegisterUser */}
          <Button onClick={onRegisterUser} variant="primary">
            M'inscrire
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
