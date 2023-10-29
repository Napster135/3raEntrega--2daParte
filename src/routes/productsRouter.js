const { Router } = require('express')
const {
  addProductsController,
  getProductsByIdController,
  getProductsController,
  updateProductController,
  deleteProductController,
} = require('../controllers/productsController')
const { handlePolicies } = require('../middlewares/authMiddleware')
const { onlyAdm } = require('../middlewares/roleMiddleware')
const passport = require('passport')

const router = Router()

router.get(
  "/GET",
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  getProductsController
)
router.get(
  "/GET/:pid",
  handlePolicies(["USER", "ADMIN"]),
  getProductsByIdController
)
router.post("/POST", onlyAdm, addProductsController);
router.post("/", handlePolicies(["PREMIUM"]), addProductsController);
router.put(
  "/PUT/:pid",
  handlePolicies(["PREMIUM", "ADMIN"]),
  updateProductController
)
router.delete(
  "/DELETE/:pid",
  handlePolicies(["PREMIUM", "ADMIN"]),
  deleteProductController
)

module.exports = router
