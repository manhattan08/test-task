const UserRouter = require("express").Router;
const pokemonController = require('../controllers/pokemon-controller')
const router = new UserRouter();


router.post("/setFavouritePokemon",pokemonController.setFavoutirePokemons)
router.get("/getFavouritePokemons/:id",pokemonController.getFavouritePokemons)
router.post("/removeFavouritePokemons",pokemonController.removeFavouritePokemon)


module.exports = router