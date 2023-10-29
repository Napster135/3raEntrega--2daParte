const { Router } = require('express')
const { getMsg } = require('../controllers/messagerController')
const { onlyUser } = require('../middlewares/roleMiddleware')
const passport = require('passport')

const router = Router()

router.get("/", onlyUser, getMsg)

module.exports = router
