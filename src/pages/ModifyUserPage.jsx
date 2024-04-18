import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getItemJSON, setItemJSON } from "../helpers/storage";
import userphoto from "../assets/images/userphoto.avif";
import { updateUser, uploadUserPhoto } from "../services/APIService";
import { useNavigate } from "react-router-dom";

const ModifyUserPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    const u = getItemJSON("user"); // Charger le user depuis le LocalStorage
    if (u) {
      setUser(u);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      if (user.photoURI) {
        setPhoto(user.photoURI);
      }
    }
  }, [user]);

  const onUpdateUser = async () => {
    try {
      const res = await updateUser({
        // Liaison avec le backend : data envoyées au back
        firstName,
        lastName,
      });

      alert("Votre profile a été mis à jour");
      setItemJSON("user", { ...user, firstName, lastName });
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  const onUploadUserPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("image", photo);

      const res = await uploadUserPhoto(formData);
      setItemJSON("user", { ...user, photoURI: res.data.photoURI });

      alert("Photo mise à jour");
    } catch (e) {
      alert(e);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />
      <Container className="container-modify-up">
        <Row>
          <Col>
            <Col>
              {user && user.photoURI ? (
                <img
                  src={{ uri: "http://localhost:3100/images/" + user.photoURI }}
                  style={{ height: 200, width: 200 }}
                />
              ) : null}
            </Col>

            <input
              filename={photo}
              onChange={handleImageChange}
              type="file"
              accept="image/*"
            ></input>

            <Button onClick={onUploadUserPhoto}>Télécharger une photo</Button>
          </Col>
          <Col>
            <Form style={{ width: "50%" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="name"
                  placeholder="Entrez votre nom"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="first-name"
                  placeholder="Entrez votre prénom"
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
            </Form>
          </Col>
        </Row>
      </Container>
      <Button
        onClick={onUpdateUser}
        className="button-update-m-up"
        variant="primary"
        type="submit"
      >
        Mettre à jour
      </Button>
      <Footer />
    </div>
  );
};

export default ModifyUserPage;
