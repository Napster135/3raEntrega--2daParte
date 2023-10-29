const UsersManager = require('../dao/mongoManagers/UsersManager')
const { generateToken } = require('../utils')

const userManager = new UsersManager()

exports.registerUserController = async (req, res) => {
    const newUser = await userManager.createUser(req.body);
    const token = generateToken(newUser);
    res.cookie("token", token);
    if (newUser) {
        res.redirect("/views");
    } else {
        res.redirect("/views/registerError");
    }
}

exports.logoutController = async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
        }
        res.redirect("/views");
    });
}
