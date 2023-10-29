const productsModels = require('./models/productsModel')
const ProductsRepository = require('../../repositories/productsRepository')


class ProductManager {

  constructor(dao){
    this.dao = dao;
  
    //const productsRepository = new ProductsRepository()
}

  async addProducts(prod) {
    try {
      const newProd = await productsModels.create(prod);
      return newProd;
    } catch (error) {
      return console.log(error);
    }
  }

  async getProducts(limit, page, sort, query) {
    try {
      const getProd = await productsRepository.getProducts(
        limit,
        page,
        sort,
        query
      );
      return getProd;
    } catch (error) {
      return error;
    }
  }

  async getProductsById(id) {
    try {
      const prodByIdDB = await productsModels.findOne({ _id: id });
      return prodByIdDB;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(prod) {
    try {
      const updProd = await productsRepository.updateProduct(prod);
      return updProd;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(prodId) {
    try {
      const deleteProd = await productsModels.deleteOne({ _id: prodId });
      return deleteProd;
    } catch (error) {
      return error;
    }
  }

  async updateProductStock(pid, stock) {
    try {
      const updProdStock = await productsRepository.updateProductStock(
        pid,
        stock
      );
      return updProdStock;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProductManager
