const { Router } = require('express')
const { generateProduct } = require('../utils')

const router = Router()

router.get("/", async (req, res) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    res.send({ status: "success", payload: products })
})

module.exports = router