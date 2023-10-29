const CartManager = require('../dao/mongoManagers/CartManager')
const ProductManager = require('../dao/mongoManagers/ProductManager')
const { ticketModel } = require('../dao/mongoManagers/models/ticketModel')

const cartManager = new CartManager()
const productManager = new ProductManager()

exports.getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  const cartById = await cartManager.getCartsById(cid);
  res.json({ cartById });
};

exports.addCartController = async (req, res) => {
  const addCart = await cartManager.addCart();
  res.json({ addCart });
};

exports.addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const addProdToCart = await cartManager.addProductToCart(cid, pid);
  res.json({ addProdToCart });
};

exports.deleteCartController = async (req, res) => {
  const { cid } = req.params;
  const dltCart = await cartManager.deleteCart(cid);
  res.json({ dltCart });
};

exports.deleteProductOnCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const dltProd = await cartManager.deleteProductOnCart(cid, pid);
  res.json({ dltProd });
};

exports.updateCartController = async (req, res) => {
  const newProds = req.body;
  const { cid } = req.params;
  const updCart = await cartManager.updateCart(newProds, cid);
  res.json({ updCart });
};

exports.updateQuantController = async (req, res) => {
  const newQuant = req.body;
  const { cid, pid } = req.params;
  const updStock = await cartManager.updateQuant(newQuant, cid, pid);
  res.json(updStock);
};

exports.viewCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);
    const cartProducts = cart.products; 

    res.render("cart", { cart: cartProducts }); 
  } catch (error) {
    return error;
  }
};

exports.purchaseCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { user } = req; 
    const productsBought = await cartManager.purchaseCart(cid, user);
    res.json(productsBought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
