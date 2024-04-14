import axios from "axios";
import { getItemJSON } from "../helpers/storage";

const uriPath = "https://restoresy-back.vercel.app/";

// APIService est le fichier qui contient toutes les fonctions qui vont intéragir avec le backend. On utilise la bibliothèque axios pour faire des requêtes http à notre serveur sur les différentes routes. Ex : /restos/register : ceci est une route qui est préalablement créée sur notre backend. Data : correspond à toutes les données qu'on envoie dans le body de la requête. Les données dans data doivent être strictement similaires aux données attendues côté backend respectant exactement la même nomenclature.

const registerResto = async (data) => {
  return axios.post(uriPath + "/restos/register", data);
};

const registerUser = async (data) => {
  return axios.post(uriPath + "/users/register", data);
};

const loginUser = async (data) => {
  return axios.post(uriPath + "/users/login", data);
};

const loginResto = async (data) => {
  return axios.post(uriPath + "/restos/login", data);
};

const getAllRestos = async () => {
  return axios.get(uriPath + "/users/get/restos");
};

// service qui récupère un resto avec son id
const getRestoById = async (restoId) => {
  return axios.get(uriPath + "/users/get/resto/" + restoId);
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
    uriPath + "/bookings/create/" + restoId,
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
  return axios.get(uriPath + "/bookings/getUserBookings", config);
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
  return axios.put(uriPath + "/bookings/cancel/" + bookingId, {}, config);
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
  return axios.get(uriPath + "/bookings/getRestoBookings", config);
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
    uriPath + "/bookings/refuseBooking/" + bookingId,
    {}, // On n'envoie pas d'infos mais le statut qu'on précise.
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
    uriPath + "/bookings/acceptBooking/" + bookingId,
    {},
    config
  );
};

const searchRestos = async (query) => {
  return axios.post(uriPath + "/users/searchResto", { query });
};

// Service qui permet de créer un rating
const createRating = async (data) => {
  //data contient tous les states stockés dedeans
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.post(
    uriPath + "/ratings/create/" + data.restoId,
    data, // On envoie data (c'est un objet) qui contient toutes les données
    config
  );
};

// Service qui récupère tous les avis d'un resto
const getRestoRatings = async (restoId) => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.get(uriPath + "/ratings/getRestoRatings/" + restoId, config);
};

//Service qui récupère tous les avis PAR un resto
const getMyRatings = async () => {
  const resto = getItemJSON("resto");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };
  return axios.get(uriPath + "/ratings/getMyRatings", config);
};

// Service pour permettre au resto de répondre à un avis
const replyRating = async (ratingId, restoReply) => {
  const resto = getItemJSON("resto"); // Le resto doit être authentifié
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };

  return axios.put(
    uriPath + "/ratings/replyRating/" + ratingId,
    { restoReply },
    config
  );
};

// Service qui permet de mettre à jour les infos du resto
const updateResto = (data) => {
  const resto = getItemJSON("resto"); // Le resto doit être authentifié
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${resto.token}`,
    },
  };
  return axios.put(uriPath + "/restos/update", data, config);
};

// Service qui permet de mettre à jour les infos du user
const updateUser = (data) => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.put(uriPath + "/users/update", data, config);
};

const uploadUserPhoto = async (formData) => {
  const user = getItemJSON("user");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  };

  return axios.post(uriPath + "/users/uploadUserPhoto", formData, config);
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
  searchRestos,
  createRating,
  getRestoRatings,
  getMyRatings,
  replyRating,
  updateResto,
  updateUser,
  uploadUserPhoto,
};
