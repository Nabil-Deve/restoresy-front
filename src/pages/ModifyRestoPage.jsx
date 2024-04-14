import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getItemJSON, setItemJSON } from "../helpers/storage";
import { updateResto } from "../services/APIService";

const ModifyRestoPage = () => {
  const navigate = useNavigate();

  const [resto, setResto] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [hours, setHours] = useState(null);

  useEffect(() => {
    const u = getItemJSON("resto");
    if (u) {
      setResto(u); // On récupère les infos du resto connecté qu'on met dans la variable resto.
    } else {
      navigate("/");
    }
  }, []);

  // Préremplir les champs de texte avec infos du resto sur la page
  useEffect(() => {
    if (resto) {
      setName(resto.name);
      setAddress(resto.address);
      setEmail(resto.email);
      setPhone(resto.phone);
      setCuisine(resto.cuisine);
      setHours(resto.hours);
    }
  }, [resto]);

  // fonction qui met à jour les infos du resto
  const onUpdateResto = async () => {
    try {
      // On appeler le service créé dans APIServices.
      const res = await updateResto({
        name,
        address,
        phone,
        cuisine,
        hours,
      });

      alert("Votre resto a bien été mis à jour");
      setItemJSON("resto", { ...resto, name, address, phone, cuisine, hours });
      window.location.reload(); // Recharge la page.
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <Header />
      <Form className="form-modify-rp">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nom du restaurant</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type=""
            placeholder="Entrez le nom du restaurant"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="first-name"
            placeholder="Entrez votre addresse"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            disabled={true}
            type="email"
            placeholder="Entrez votre email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type=""
            placeholder="Entrez votre numéro de téléphone"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type de cuisine</Form.Label>
          <Form.Control
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            type=""
            placeholder="Entrez le type de cuisine"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Horaires d'ouverture</Form.Label>
          <Form.Control
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            type="password-confirm"
            placeholder="Entrez les horaires d'ouverture"
          />
        </Form.Group>

        <Button
          onClick={onUpdateResto}
          className="button-modify-rp"
          variant="primary"
        >
          Modifier
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default ModifyRestoPage;
