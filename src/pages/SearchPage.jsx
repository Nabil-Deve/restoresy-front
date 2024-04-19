import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import italia from "../assets/images/italia.svg";
import thai from "../assets/images/thai.svg";
import bebert from "../assets/images/bebert.svg";
import heart from "../assets/images/heart.svg";
import map from "../assets/images/map.svg";
import magnifyingglass from "../assets/images/magnifyingglass.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getItemJSON } from "../helpers/storage";
import { useNavigate } from "react-router-dom";
import { getAllRestos, searchRestos } from "../services/APIService";
import { Button } from "react-bootstrap";

const Search = (props) => {
  const navigate = useNavigate();
  const [restos, setRestos] = useState([]);
  const [foundRestos, setFoundRestos] = useState([]);
  // on récupère l'utilisateur qui est connecté
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // une fois que la page est chargée
    // on récupère le user connecté depuis le localStorage
    const u = getItemJSON("user"); // On créé une variable u qui sera le user retourné par la fonction getItemJSON (récupéré depuis le localStorage du navigateur)
    if (u) {
      // Si u n'est pas nulle (existe bien)
      setUser(u); // Alors on le stocke dans le state user.
    } else {
      // Sinon
      navigate("/"); // On fait rediriger vers la page Home (racine du site)
    }
  }, []);

  // Appeler le service getAllRestos pour récupérer tous les restos depuis la bdd
  const onGetAllRestos = async () => {
    try {
      const res = await getAllRestos();
      console.log(res.data);
      setRestos(res.data);
    } catch (e) {
      alert(e);
    }
  };

  // Une fois chargée, le useEffect appelle la fonction onGetAllRestos.
  useEffect(() => {
    onGetAllRestos();
  }, []);

  // Fonction qui recherche les restos
  const onSearchRestos = async () => {
    try {
      const res = await searchRestos(query);
      setFoundRestos(res.data);
    } catch (error) {
      alert(error);
    }
  };

  // Dès que le champs de texte query change,
  useEffect(() => {
    if (!!query) {
      // !! : si query n'est pas un texte vide
      // On vérifie s'il existe
      onSearchRestos(); // On appelle cette fonction
    } else {
      setFoundRestos([]);
    }
  }, [query]);

  if (user) {
    return (
      <div>
        <Header />
        <div className="container-search">
          <h1>Bonjour {user.lastName},</h1>
          <Button onClick={() => navigate("/UserBookings")}>
            Mes réservations
          </Button>
          <h2>Recherchez votre restaurant préféré!</h2>
          <div className="input-group">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              className="form-control"
              placeholder="Nom, type de cuisine, emplacement "
              aria-label="Nom du restaurant"
              aria-describedby="button-addon2"
            />
          </div>
          <Container className="restos-selection">
            <Row>
              {foundRestos.map((resto, index) => (
                <Col key={"foundResto" + index}>
                  <div>
                    <img
                      className="card-resto-search"
                      onClick={() => navigate("/restopage/" + resto._id)}
                      src={resto.imageURI}
                    />
                    <p>{resto.name}</p>
                    <p>
                      <img src={map} />
                      <p
                        onClick={() =>
                          (window.location.href =
                            "http://maps.google.com/?q=" + resto.address)
                        }
                      >
                        {resto.address}
                      </p>
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
          <div className="resto-select">
            <h1>
              Notre sélection du jour <img src={heart} />
            </h1>
          </div>

          <Container className="restos-selection">
            <Row>
              {restos.map((resto, index) => (
                <Col key={"resto" + index}>
                  <div>
                    <img
                      className="card-resto-search"
                      onClick={() => navigate("/restopage/" + resto._id)}
                      src={resto.imageURI}
                    />
                    <p>{resto.name}</p>
                    <p>
                      <img src={map} />
                      <p
                        onClick={() =>
                          (window.location.href =
                            "http://maps.google.com/?q=" + resto.address)
                        }
                      >
                        {resto.address}
                      </p>
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  } else {
    return null;
  }
};

export default Search;
