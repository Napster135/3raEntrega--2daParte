const ProductManager = require('../dao/mongoManagers/ProductManager')
const { cartsModel } = require('../dao/mongoManagers/models/cartsModel')
const { ticketModel } = require('../dao/mongoManagers/models/ticketModel')
const CustomError = require('../utils/errors/CustomError')
const { ErrorsMessage, ErrorsName } = require('../utils/errors/errorsEnum')

const productManager = new ProductManager();

class CartsRepository {
  async addProductToCart(cartId, prodId) {
    const cart = await cartsModel.findById(cartId);
    const product = await productManager.getProductsById(prodId);
    if (!product || !cart) {
      CustomError.createCustomError({
        name: ErrorsName.CARTPRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    }

    const cartProduct = cart.products.find((prod) => prod._id == prodId);

    if (!cartProduct) {
      const newProd = {
        _id: prodId,
        quantity: 1,
      };
      cart.products.push(newProd);
    } else {
      cartProduct.quantity += 1;
    }

    const updatedCart = await cart.save();
    return updatedCart;
  }

  async deleteCart(cartId) {
    const cartById = await cartsModel.findById(cartId);
    if (!cartById) {
      CustomError.createCustomError({
        name: ErrorsName.DELETE_DATA_INCOMPLETE,
        message: ErrorsMessage.CART_DATA_INCOMPLETE,
      });
    } else {
      const productsLength = cartById.products.length;
      cartById.products.splice(0, productsLength);
      await cartById.save();
      return cartById;
    }
  }

  async deleteProductOnCart(cartId, prodId) {
    const cartById = await cartsModel.findById(cartId);
    const findProd = cartById.products.find((prod) => prod.id === prodId);
    if (!cartById || !findProd) {
      CustomError.createCustomError({
        name: ErrorsName.DELETE_DATA_INCOMPLETE,
        message: ErrorsMessage.DLTPRODCART_DATA_INCOMPLETE,
      });
    } else {
      const indexProd = cartById.products.indexOf(findProd);
      cartById.products.splice(indexProd, 1);
      return await cartById.save();
    }
  }

  async updateCart(newProds, cid) {
    const cartById = await cartsModel.findById(cid);
    const cartNewProds = {
      id: cid,
      products: newProds,
    };
    if (!cartById || !cartNewProds) {
      CustomError.createCustomError({
        name: ErrorsName.UPDCART_DATA_INCOMPLETE,
        message: ErrorsMessage.UPDCART_DATA_INCOMPLETE,
      });
    } else {
      return await cartById.save();
    }
  }

  async updateQuant(quant, cid, pid) {
    const cartById = await cartsModel.findById(cid);
    const findProd = cartById.products.find((prod) => prod.id === pid);
    if (!cartById || !findProd) {
      CustomError.createCustomError({
        name: ErrorsName.UPDCART_DATA_INCOMPLETE,
        message: ErrorsMessage.UPDCARTQUANT_DATA_INCOMPLETE,
      });
    } else {
      const prodNewQuant = {
        _id: pid,
        quantity: quant.quantity,
      };
      const indexProd = cartById.products.indexOf(findProd);
      cartById.products.splice(indexProd, 1);
      cartById.products.push(prodNewQuant);
      await cartById.save();
      return cartById;
    }
  }

  async purchaseCart(cartId, user) {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart || !user) {
        throw new Error("Cart ID/User inexist");
      }

      let total = 0;
      const cartProducts = cart.products;
      const productsBought = [];
      const productsNotBought = [];

      for (let i = 0; i < cartProducts.length; i++) {
        const product = cartProducts[i];
        const dbProduct = await productManager.getProductsById(product._id);

        if (!dbProduct) {
          throw new Error(`Product with ID ${product._id} not found`);
        }

        if (product.quantity <= dbProduct.stock) {
          let quantPrice = product.quantity * dbProduct.price;
          total += quantPrice;
          const updStock = dbProduct.stock - product.quantity;
          await productManager.updateProductStock(dbProduct._id, updStock);

          productsBought.push({
            _id: dbProduct._id,
            quantity: product.quantity,
            price: dbProduct.price,
          });
        } else {
          productsNotBought.push({
            _id: dbProduct._id,
            stock: dbProduct.stock,
            quantity: product.quantity,
          });
        }
      }

      if (productsNotBought.length > 0) {
        throw new Error(
          `No hay suficiente stock para los siguientes productos: ${productsNotBought
            .map((product) => `${product._id} (${product.stock})`)
            .join(", ")}`
        );
      } else {
        const ticket = await ticketModel.create({
          purchaser: user.email,
          amount: total,
        });
        return {
          productsBought,
          ticket,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartsRepository();
