const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: 
        [{ 
        _id: {type: mongoose.Schema.Types.ObjectId, ref:"Products"},
        quantity: {type: Number, required: true, default: 1}
    }]
})

cartSchema.pre('findOne', function(next) {
    this.populate('products._id');
    next();
})

cartSchema.pre('find', function(next) {
    this.populate('products._id');
    next();
})

const cartsModel = mongoose.model("Carts", cartSchema)

module.exports = cartsModel
