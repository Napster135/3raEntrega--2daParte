const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  code: {
    type: Number,
    unique: true,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
  },
  thumbnails: {
    type: String,
  },
  owner: { type: String, required: true, default: "admin", ref: "users" },
})

productsSchema.plugin(mongoosePaginate)

const productsModels = mongoose.model("Products", productsSchema)

module.exports = productsModels
