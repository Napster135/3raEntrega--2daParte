const passport = require('passport')
const { userModel } = require('../dao/mongoManagers/models/userModel')
const { Strategy } = require('passport-local')
const { hashPassword, comparePassword } = require('../utils')
const { Strategy: GitHubStrategy } = require('passport-github2')
const { generateToken, cookieExtractor } = require('../utils')
const { ExtractJwt, Strategy: jwtStrategy } = require('passport-jwt')

passport.use(
  "register",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newUserDB = await userModel.create(newUser);
      done(null, newUserDB);
    }
  )
);

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      const isPassword = await comparePassword(password, user.password);
      if (isPassword) {
        done(null, user);
      }
    }
  )
);

passport.use(
  "github",
  new GitHubStrategy(
    {
    clientID: "Iv1.62b73e26b2db49ec",
    clientSecret: "044c63aca3eec915c8ccba90267c216a4d178c7e",
    callbackURL: "http://localhost:8080/users/GitHub",
  },
    async (accessToken, refreshToken, profile, done) => {
      const user = await userModel.findOne({ email: profile._json.email });
      if (!user) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
        };
        const userDB = await userModel.create(newUser);
        done(null, userDB);
      } else {
        done(null, user);
      }
    }
  )
);

passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: "secretJWT",
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload.user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
