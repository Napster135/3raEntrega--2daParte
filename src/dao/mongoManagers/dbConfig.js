const mongoose = require('mongoose')
const config = require('../../config')

const URI = config.MONGOURL

mongoose.set("strictQuery", false)

mongoose.connect(URI)

if (mongoose.connect(URI)) {
    console.log("Conectado a la DB")
}
