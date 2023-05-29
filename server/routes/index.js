const Router = require("express").Router
const router = new Router();
const userRouter = require('./user-router');
const pokemonRouter = require('./pokemon-router');

router.use("/auth",userRouter)
router.use("/pokemon",pokemonRouter)

module.exports = router;