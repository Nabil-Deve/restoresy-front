import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { replyRating } from "../services/APIService";

// J'ai séparé la card à part pour pouvoir créer un state pour répondre
const RatingCardResto = (props) => {
  const [rating, setRating] = useState(props.rating);

  const [restoReply, setRestoReply] = useState(null);

  // Quand le props change, il faut mettre à jour le rating
  useEffect(() => {
    if (props.rating) {
      setRating(props.rating);
    }
  }, [props]);

  // Fonction qui permet au resto de répondre à un avis
  const onReplyRating = async () => {
    try {
      const res = await replyRating(rating._id, restoReply);
      setRating(res.data); // On met à jour
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Card
      className="card-dashboard"
      style={{ border: "2px solid blue", backgroundColor: "#AFCDF9" }}
    >
      <Card.Body>
        <Card.Title>
          {rating.user.firstName} {rating.user.lastName}
        </Card.Title>
        <ReactStars
          edit={false}
          value={rating.stars}
          count={5}
          size={40}
          activeColor="#ffd700"
        />
        <Card.Text>{rating.content}</Card.Text>

        {!rating.restoReply ? (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(e) => setRestoReply(e.target.value)}
                value={restoReply}
                type="test"
                placeholder="Entrez votre réponse"
              />
            </Form.Group>
            <Button onClick={onReplyRating}>Envoyer la réponse</Button>
          </div>
        ) : (
          <Card.Text>Votre réponse : {rating.restoReply}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default RatingCardResto;
