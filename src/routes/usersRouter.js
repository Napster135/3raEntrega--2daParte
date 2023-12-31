const { Router } = require('express')
const passport = require('passport')
const {
  logoutController,
  registerUserController,
} = require('../controllers/usersController')
const logger = require('../utils/winston')

const router = Router()

router.post("/register", registerUserController)

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/views/loginError",
    successRedirect: "/products",
    passReqToCallback: true,
  })
)

router.get(
  "/registerGitHub",
  passport.authenticate("github", { scope: ["user:email"] })
)

router.get("/GitHub", passport.authenticate("github"), (req, res) => {
  req.session.email = req.user.email;
  res.redirect("/products/");
})

router.get("/logout", logoutController)

router.get("/recupero")

module.exports = router
