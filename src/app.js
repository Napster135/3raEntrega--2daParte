const express = require("express");
const productsRouter = require('./routes/productsRouter')
const cartsRouter = require('./routes/cartsRouter')
const viewProds = require('./routes/viewProdsRouter')
const viewCart = require('./routes/viewCartRouter')
const chatRouter = require('./routes/chatRouter')
const handlebars = require('express-handlebars')
//const { __dirname } = require('./utils')
const http = require('http')
const socketIO = require('socket.io')
require('./dao/mongoManagers/dbConfig')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const viewsRouter = require('./routes/viewRouter')
const usersRouter = require('./routes/usersRouter')
const mockRouter = require('./routes/mockRouter')
const sessionsRouter = require('./routes/sessionsRouter')
const mongoStore = require('connect-mongo')
const passport = require('passport')
const CustomError = require('./utils/errors/CustomError')
require('./passport/passportStrategies')
const config = require('./config')
const { errorMiddleware } = require('./utils/errors/errorsMiddleware')
const logger = require('./utils/winston')
const { createLog } = require('./middlewares/winstonMiddleware')
const loggerTest = require('./routes/loggerTestRouter')

const app = express()
const PORT = config.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))




/* Configurar cookieParser, session con mongo session */
app.use(cookieParser());
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: config.MONGOURL,
    })
  })
);

/* Passport */
app.use(passport.initialize())
app.use(passport.session())

/* Servidor HTTP */
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server OK en puerto ${PORT}`)
})

/* Servidor WebSocket */
const socketServer = socketIO(server);

/* Redireccionar login */
app.get("/", (req, res) => {
  res.redirect("/views")
})

/* Configurar Handlebars */
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

/* Rutas */
app.use("/products/", viewProds)
app.use("/carts", viewCart)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/users", usersRouter)
app.use("/views", viewsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/chat", chatRouter)
app.use("/mockingproducts", mockRouter)
app.use("/loggerTest", loggerTest)

/* Middleware de error */
app.use(errorMiddleware)
app.use(createLog)
