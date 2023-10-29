const { Router } = require('express')
const logger = require('../utils/winston')

const router = Router()

router.get("/", (req, res) => {
    logger.fatal("Test log fatal")
    logger.error("Test log error")
    logger.warning("Test log warning")
    logger.info("Test log info")
    logger.http("Test log http")
    logger.debug("Test log debug")
})

module.exports = router;
