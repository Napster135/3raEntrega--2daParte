const { dirname } = require ( 'path')
const { fileURLToPath } = require ( 'url')
const bcrypt = require ( 'bcrypt')
const jwt = require('jsonwebtoken')
const faker = require('@faker-js/faker')

//const _dirname = path.dirname(fileURLToPath(import.meta.url));
const _dirname = dirname(__filename);

const hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async function(password, passwordDB) {
  return await bcrypt.compare(password, passwordDB);
};

const generateToken = function(user) {
  return jwt.sign({ user }, "secretJWT", { expiresIn: "1d" });
};

const cookieExtractor = function(req) {
  const token = req.cookies.token;
  return token;
};

const createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const generateRandomString = function(num) {
  return [...Array(num)]
    .map(() => {
      const randomNum = ~~(Math.random() * 36);
      return randomNum.toString(36);
    })
    .join("")
    .toUpperCase();
};

faker.locale = "es";

const generateProduct = function() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.random.numeric(1),
    code: faker.random.alphaNumeric(5),
    _id: faker.database.mongodbObjectId(),
    category: faker.commerce.department(),
    status: true,
  };
};

module.exports ={
  hashPassword,
  comparePassword,
  generateToken,
  cookieExtractor ,
  createHash, 
  generateRandomString,
  generateProduct,
}
