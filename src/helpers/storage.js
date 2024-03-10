// LocalStorage est un espace de stockage dans le navigateur. Il permet de stocker des données afin de pouvoir les récupérer ultérieurement. Le stockage dans localStorage n'est pas éphémère ce qui veut dire que tout ce qu'on y stocke persistera jusqu'à ce qu'on l'efface expressément.

// Cette fonction permet de stocker une donnée dans le localStorage. Elle prend en paramètres le nom de la donnée qu'on va stocker et la valeur de cette dernière.
const setItemJSON = (name, value) => {
  const string = JSON.stringify(value); // on trasnforme l'objet en chaine de caractère pour pouvoir le stocker dans le localstorage
  localStorage.setItem(name, string); // On stocke la variable dans le localStorage.
};

// Cette fonction permet de récupérer une donnée depuis le localStorage. Elle prend en paramètres le nom de la variable qu'on souhaite récupérer.
const getItemJSON = (name) => {
  let string = localStorage.getItem(name); // On récupère la donnée avec son nom.
  if (string) {
    // Si une telle donnée existe dans le localStorage avec ce nom
    return JSON.parse(string); // On convertit cette donnée en objet json et on la renvoie
  } else {
    // Sinon
    return null; // On renvoie null pour signifier qu'une telle donnée n'est pas présente dans le localStorage.
  }
};

// On créé une fonction permet de vider tout le localStorage
const clearAll = () => {
  localStorage.clear();
};

export { setItemJSON, getItemJSON, clearAll };
