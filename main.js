//Récupération de la liste des pokemons
let listePokemon;

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

const buissons = document.querySelectorAll(".bush");
console.log(buissons);

const boites = document.querySelectorAll(".box");
boites.forEach((boite, index) => {
  const pokemonSprite = document.createElement("img");
  pokemonSprite.src = listePokemon[index].sprite;
  pokemonSprite.style.display = "none";
  pokemonSprite.classList.add("pokemon");
  console.log(index);
  boite.appendChild(pokemonSprite);
});

buissons.forEach((buisson) =>
  buisson.addEventListener("click", (event) => {
    const pokemonSprite = event.currentTarget.nextElementSibling;
    buisson.style.display = "none";
    pokemonSprite.style.display = "block";
  })
);
