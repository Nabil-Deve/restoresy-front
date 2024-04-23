import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import { registerResto } from "../services/APIService";
import { useNavigate } from "react-router-dom";

const SignUpResto = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [hours, setHours] = useState("");
  const [menu, setMenu] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image" && file.size < 1000000) {
      setFileToBase(file);
    } else {
      alert("Invalid file. Please select an image under 1MB.");
    }
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onRegisterResto = async () => {
    try {
      const res = await registerResto({
        name,
        address,
        email,
        phone,
        cuisine,
        hours,
        menu,
        about,
        password,
        image,
      });

      alert("Votre restaurant a bien été créé. Merci de vous connecter.");
      navigate("/connectresto");
      console.log(res.data);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-signup">
        <Form className="form-signup-style">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom du restaurant</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="name"
              placeholder="Entrez le nom de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Entrez l'adresse de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Entrez l'email de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Entrez le numéro de téléphone de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cuisine</Form.Label>
            <Form.Control
              onChange={(e) => setCuisine(e.target.value)}
              value={cuisine}
              placeholder="Entrez le type de cuisine de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Horaires</Form.Label>
            <Form.Control
              onChange={(e) => setHours(e.target.value)}
              value={hours}
              placeholder="Entrez les horaires de votre restaurant"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Menu</Form.Label>
            <Form.Control
              onChange={(e) => setMenu(e.target.value)}
              value={menu}
              placeholder="Décrivez le menu de votre restaurant."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>A propos</Form.Label>
            <Form.Control
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder="Décrivez votre restaurant en quelques mots."
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

          <Form.Group className="mb-3">
            <Form.Label>Image du restaurant</Form.Label>
            <Form.Control type="file" onChange={handleImage} accept="image/*" />
          </Form.Group>

          <Button
            className="resto-button"
            variant="primary"
            onClick={onRegisterResto}
          >
            Créer le restaurant
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpResto;
