const logger = require('../utils/winston')

exports.createLog = (req, res, next) => {
    logger.info(`Method: ${req.method} - URL:${req.url} - date:${Date().toString()}`)
    next();
}
