const { Router } = require('express')
const { viewCartController } = require('../controllers/cartsController')
const router = Router()

router.get("/:cid", viewCartController)

module.exports = router
