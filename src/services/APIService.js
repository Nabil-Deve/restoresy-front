import axios from "axios";
import { getItemJSON } from "../helpers/storage";

// APIService est le fichier qui contient toutes les fonctions qui vont intéragir avec le backend. On utilise la bibliothèque axios pour faire des requêtes http à notre serveur sur les différentes routes. Ex : /restos/register : ceci est une route qui est préalablement créée sur notre backend. Data : correspond à toutes les données qu'on envoie dans le body de la requête. Les données dans data doivent être strictement similaires aux données attendues côté backend respectant exactement la même nomenclature.

const registerResto = async (data) => {
  return axios.post("http://localhost:3100/restos/register", data);
};

const registerUser = async (data) => {
  return axios.post("http://localhost:3100/users/register", data);
};

const loginUser = async (data) => {
  return axios.post("http://localhost:3100/users/login", data);
};

const loginResto = async (data) => {
  return axios.post("http://localhost:3100/restos/login", data);
};

const getAllRestos = async () => {
  return axios.get("http://localhost:3100/users/get/restos");
};

// service qui récupère un resto avec son id
const getRestoById = async (restoId) => {
  return axios.get("http://localhost:3100/users/get/resto/" + restoId);
};

// Appeler la route qui va créer une résa
const createBooking = async (restoId, numberGuests, hour, date, comment) => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.post(
    "http://localhost:3100/bookings/create/" + restoId,
    { numberGuests, hour, date, comment },
    config
  );
};

const getUserBookings = async () => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.get("http://localhost:3100/bookings/getUserBookings", config);
};

// Annuler une réservation
const cancelBooking = async (bookingId) => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.put(
    "http://localhost:3100/bookings/cancel/" + bookingId,
    {},
    config
  );
};

// Fonction qui récupère les bookings d'un resto
const getRestoBookings = async () => {
  const resto = getItemJSON("resto");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };
  return axios.get("http://localhost:3100/bookings/getRestoBookings", config);
};

// Fonction qui permet au resto de refuser une résa
const refuseBooking = async (bookingId) => {
  const resto = getItemJSON("resto");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };
  return axios.put(
    "http://localhost:3100/bookings/refuseBooking/" + bookingId,
    {},
    config
  );
};

// Fonction qui permet au resto d'accepter une résa
const acceptBooking = async (bookingId) => {
  const resto = getItemJSON("resto");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };
  return axios.put(
    "http://localhost:3100/bookings/acceptBooking/" + bookingId,
    {},
    config
  );
};

export {
  registerResto,
  registerUser,
  loginUser,
  loginResto,
  getAllRestos,
  getRestoById,
  createBooking,
  getUserBookings,
  cancelBooking,
  getRestoBookings,
  refuseBooking,
  acceptBooking,
};
