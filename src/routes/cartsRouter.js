const { Router } = require('express');
const {
  getCartByIdController,
  addCartController,
  addProductToCartController,
  deleteProductOnCartController,
  deleteCartController,
  updateCartController,
  updateQuantController,
  purchaseCartController,
} = require('../controllers/cartsController')
const { onlyAdm, onlyUser } = require('../middlewares/roleMiddleware')
const passport = require('passport')

const router = Router();

router.get("/GET/:cid", getCartByIdController);

router.post("/POST", addCartController);

router.post("/POST/:cid/product/:pid", addProductToCartController);

router.delete("/:cid/", deleteCartController);

router.delete("/:cid/products/:pid", deleteProductOnCartController);

router.put("/:cid", updateCartController);

router.put("/:cid/products/:pid", updateQuantController);

router.get("/:cid/purchase", onlyUser, purchaseCartController);

module.exports = router;
