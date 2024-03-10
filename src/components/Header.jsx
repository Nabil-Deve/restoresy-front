import React, { useEffect, useState } from "react"; // React : nom de la variable
import logo from "../assets/images/logo.svg";
import userImage from "../assets/images/user.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearAll, getItemJSON } from "../helpers/storage";

// Tous les composants sont en majuscules.
const Header = (props) => {
  const navigate = useNavigate();
  // on récupère l'utilisateur qui est connecté
  const [user, setUser] = useState(null);
  // on récupère le resto qui est connecté
  const [resto, setResto] = useState(null);

  useEffect(() => {
    // une fois que la page est chargée
    // on récupère le user connecté depuis le localStorage
    const u = getItemJSON("user"); // On créé une variable u qui sera le user retourné par la fonction getItemJSON (récupéré depuis le localStorage du navigateur)
    if (u) {
      // Si u n'est pas nulle (existe bien)
      setUser(u); // Alors on le stocke dans le state user.
    }
  }, []);

  useEffect(() => {
    // une fois que la page est chargée
    // on récupère le resto connecté depuis le localStorage
    const u = getItemJSON("resto");
    if (u) {
      setResto(u);
    }
  }, []);

  // Après avoir importé la fonction const clearAll, on déclare la fonction logout qui permet de se déconnecter.
  const logout = () => {
    clearAll();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo-section">
        <img src={logo} className="logo" />
        <h2>RestoResy</h2>
      </div>
      <div>
        {/* Une fois que le user s'est connecté, on peut voir s'afficher l'icone et son nom dans la page Search, puis on clique sur son nom ou son icône, son profil user s'affiche*/}
        {user ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => navigate("/userpage")} // Cela redirige vers la page UserPage
              style={{ cursor: "pointer" }}
            >
              <span style={{ marginRight: 10 }}> {user.firstName}</span>
              <img src={userImage} />
            </div>
            <div>
              <Button
                style={{ marginLeft: 10 }}
                variant="link"
                onClick={logout}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        ) : null}

        {/* Une fois que le resto s'est connecté, on peut voir s'afficher l'icone et son nom dans la page Search, puis on clique sur son nom ou son icône, son profil resto s'affiche*/}
        {resto ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              onClick={() => navigate("/modifyrestopage")}
              style={{ cursor: "pointer" }}
            >
              <span style={{ marginRight: 10 }}> {resto.name}</span>
              <img src={userImage} />
            </div>
            <div>
              <Button
                style={{ marginLeft: 10 }}
                variant="link"
                onClick={logout}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        ) : null}

        {!user && !resto ? (
          <div>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => navigate("/signup")}
            >
              S'inscrire
            </Button>
            <Button onClick={() => navigate("/signupresto")}>
              Inscription restaurant
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
