//mélange les pokemon
function randomize(listePokemon) {
  let i, j, tmp;
  for (i = listePokemon.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = listePokemon[i];
    listePokemon[i] = listePokemon[j];
    listePokemon[j] = tmp;
  }
  return listePokemon;
}

let nombreDePaireTrouvee = 0;
let listePokemon = [];
let premierPokemon = null;
let premierIndex = null;
let clickOff = false;

//verifie que tous les pok sont capturés
function tousPokemonAttrapé() {
  if (nombreDePaireTrouvee === listePokemon.length / 2) {
    alert("Félicitations ! Vous avez capturé tous les Pokémon !");
    resetButton();
  }
}

//affiche bouton rejouer
function resetButton() {
  const replay = document.querySelector("#rejouer");
  replay.style.display = "block";
  replay.addEventListener("click", restart);
}

//reinitilise le jeu
function restart() {
  nombreDePaireTrouvee = 0;
  premierPokemon = null;
  premierIndex = null;
  clickOff = false;

  const replayButton = document.querySelector("#rejouer");
  replayButton.style.display = "none";

  // Réinitialiser les buisson
  const boites = document.querySelectorAll(".box");
  boites.forEach((boite) => {
    const pokemonSprite = boite.querySelector(".pokemon");
    const pokeballSprite = boite.querySelector(".pokeball");
    const buisson = boite.querySelector(".bush");
    // Enleve les Pokémon
    if (pokemonSprite) {
      pokemonSprite.remove();
    } // enleve les pokeball
    if (pokeballSprite) {
      pokeballSprite.remove();
    }
    // Réaffiche les buissons
    if (buisson) {
      buisson.style.display = "block";
    }
  });

  // Relance la grille
  initilisationGrille();
}

//récupération des pokemon
async function getPokemon() {
  const url = "http://localhost:5500/data/pokemon.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    listePokemon = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
await getPokemon();

console.log(listePokemon);

function initilisationGrille() {
  const selectPokemon = randomize(listePokemon).slice(0, 6);
  const pairPokemon = [...selectPokemon, ...selectPokemon];
  listePokemon = randomize(pairPokemon);
}

initilisationGrille();

const boites = document.querySelectorAll(".box");

boites.forEach((boite, index) => {
  const nomPokemonDuBuisson = listePokemon[index].name;
  const pokemonSprite = document.createElement("img");
  pokemonSprite.src = listePokemon[index].sprite;
  pokemonSprite.style.display = "block";
  pokemonSprite.classList.add("pokemon");

  const buisson = boite.querySelector(".bush");

  buisson.addEventListener("click", () => {
    console.log(clickOff);
    if (clickOff) return;

    buisson.style.display = "none";
    pokemonSprite.style.display = "block";
    pokemonSprite.classList.add("afficher");

    if (premierPokemon === null) {
      premierPokemon = nomPokemonDuBuisson;
    } else if (premierPokemon === nomPokemonDuBuisson) {
      console.log("les pokemon ok");
      premierPokemon = null;
      // Trouver les pokemons trouvé, stocker le parent element dans une constante boxElement
      // avec createElement créer une balise <img>, stocker le résultat de createElement dans une constante pokeballSprite
      // sur pokeballSprite, lui ajouter une classe "pokeball" et lui ajouter un attribut (setAttribute) src qui prend pour valeur le lien d'image de la pokeball
      document.querySelectorAll(".afficher").forEach((pokemonSprite) => {
        const box = pokemonSprite.parentElement;
        const pokeballSprite = document.createElement("img");
        pokeballSprite.classList.add("pokeball");
        pokeballSprite.setAttribute("src", "./assets/pokeball.png");
        box.appendChild(pokeballSprite);
        pokemonSprite.classList.remove("afficher");
      });
      const pokemonAttrapé = document.querySelector(".liste_pokemons_captures");
      pokemonAttrapé.appendChild(pokemonSprite);
      // Affiche le pokemon dans capturés
      console.log("Pokemon trouvé: ", nomPokemonDuBuisson);

      nombreDePaireTrouvee = nombreDePaireTrouvee + 1;
      tousPokemonAttrapé();
    } else if (
      premierPokemon != nomPokemonDuBuisson &&
      premierPokemon != null
    ) {
      console.log("les pokemon repondent pas");
      clickOff = true;
      setTimeout(() => {
        clickOff = false;
        document.querySelectorAll(".afficher").forEach((pokemonSprite) => {
          const bush = pokemonSprite.parentElement.querySelector(".bush");
          bush.style.display = "initial";
          pokemonSprite.classList.remove("afficher");
        });

        premierPokemon = null;
      }, 1000);
    }
  });
  pokemonSprite.style.display = "block";
  pokemonSprite.classList.add("pokemon");

  boite.appendChild(pokemonSprite);
});
