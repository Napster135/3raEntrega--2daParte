const { Router } = require('express');
const { handlePolicies } = require('../middlewares/authMiddleware')
const { publicRoutes } = require('../middlewares/authMiddleware')
const { viewProdsController } = require('../controllers/productsController')

const router = Router()

router.get(
  "/",
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  viewProdsController
)

module.exports = router
