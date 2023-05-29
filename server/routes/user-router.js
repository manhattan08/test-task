const UserRouter = require("express").Router;
const userController = require('../controllers/user-controller')
const router = new UserRouter();

router.post("/registration",userController.registration)
router.post("/login",userController.login)
router.post("/login/social",userController.loginWithSocialMedia)

router.post("")


module.exports = router