const { hashPassword, comparePassword } = require('../utils')
const { userModel } = require('../dao/mongoManagers/models/userModel')
const config = require('../config')
const CartManager = require('../dao/mongoManagers/CartManager')
const CustomError = require('../utils/errors/CustomError')
const { ErrorsMessage, ErrorsName } = require('../utils/errors/errorsEnum')
const logger = require('../utils/winston')

const cartManager = new CartManager()

class UsersRepository {
    constructor() {
        // constructor logic here
      }
    async createUserRep(user) {
        const { email, password } = user;
        const userExist = await userModel.find({ email, password });
        if (!userExist) {
            CustomError.createCustomError({
                name: ErrorsName.REGISTER_DATA_INCOMPLETE,
                message: ErrorsMessage.REGISTER_DATA_INCOMPLETE
            });
        } else if (email !== "adminCoder@coder.com" & userExist.length === 0) {
            const hashNewPassword = await hashPassword(password);
            const userCart = await cartManager.addCart();
            const newUser = { ...user, cartId: userCart._id, password: hashNewPassword };
            logger.info(`Usuario creado: ${newUser.email}`);
            return newUser;
        } else {
            if (email === "adminCoder@coder.com" & password === config.ADMIN_PASSWORD) {
                const hashNewPassword = await hashPassword(password);
                const newAdmin = { ...user, role: "admin", password: hashNewPassword };
                logger.warning(`Admin creado: ${newAdmin.email}`);
                return newAdmin;
            }
        }
    }

    async loginUserRep(user) {
        const { email, password } = user;
        logger.info(`Intento de logueo: ${email}`);
        const usr = await userModel.findOne({ email });
        if (!usr) {
            CustomError.createCustomError({
                name: ErrorsName.LOGIN_DATA_INCOMPLETE,
                message: ErrorsMessage.LOGIN_DATA_INCOMPLETE
            });
        }
        const newUsrCart = await cartManager.addCart();
        if (usr && comparePassword(password, usr.password)) {
            usr.cartId = newUsrCart._id;
            await usr.save();
            return usr;
        } else {
            return null;
        }
    }
}

module.exports =  UsersRepository;
