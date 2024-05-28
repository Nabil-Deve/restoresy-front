import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactStars from "react-rating-stars-component";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createRating, getRestoById } from "../services/APIService";

const Ratingpage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [resto, setResto] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(5);

  const onGetResto = async () => {
    try {
      const restoId = params.restoId;
      const res = await getRestoById(restoId);
      setResto(res.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (params.restoId) {
      onGetResto();
    }
  }, [params]);

  // On crée une fonction qui va être appelée sur le click du bouton Noter
  const onCreateRating = async () => {
    try {
      // On appelle la fonction createRating pour envoyer les données remplies par le user au backend
      const res = await createRating({
        content,
        stars,
        restoId: resto._id,
      });
      console.log(res.data); // data : contenu de ce que le serveur me renvoie comme réponse.

      alert("Votre avis a bien été publié.");
      navigate("/search");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header />

      <Form className="form-rating-page ">
        <ReactStars
          count={5}
          size={50}
          activeColor="#ffd700"
          onChange={(newRating) => setStars(newRating)} //Quand le user met à jour les étoiles, cela met à jour le state des étoiles
        />
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Votre avis</Form.Label>
          <Form.Control
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type=""
            placeholder=""
          />
        </Form.Group>
      </Form>
      <Button
        onClick={onCreateRating}
        variant="primary"
        style={{ marginLeft: "40%" }}
      >
        Publier mon avis
      </Button>
      <Footer />
    </div>
  );
};

export default Ratingpage;
