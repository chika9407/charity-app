var models = require("../models");
const bcrypt = require("bcryptjs");
<<<<<<< HEAD
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    //defines strategy
    new localStrategy((username, password, done) => {
<<<<<<< HEAD
      models.User.findOne({ username: username }, (err, user) => {
=======
      //lookup user in the database
      models.Users.findOne({ where: { username: username } }, (err, user) => {
<<<<<<< HEAD
>>>>>>> staging
=======
        console.log("find 1");
>>>>>>> staging
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  //stores a cookie with the user id
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  //takes the cookie & returns a user
  passport.deserializeUser((id, cb) => {
<<<<<<< HEAD
    models.User.findOne({ id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
=======
    models.Users.findOne({ id }, (err, user) => {
      cb(err, user);

      // const userInformation = {
      //   username: user.username,
      // };
      // cb(err, userInformation);
>>>>>>> staging
    });
  });

  // passport.serializeUser((user, done) => done(null, user.id));
  // passport.deserializeUser((id, done) => {
  //   return done(null, getUserById(id));
  // });
};
=======
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secret = process.env.SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, cb) {
      const user = await models.Users.findOne({ where: { username } });

      if (!user) {
        console.log("user does not exist");
        return cb(null, false, { message: "Incorrect username or password." });
      }

      //verify password
      const correctPassword = await bcrypt.compare(password, user.password);

      //incorrect password
      if (!correctPassword) {
        console.log("wrong pass");
        return cb(null, false, { message: "Incorrect username or password." });
      }

      //everything is fine
      console.log("everything is fine");
      return cb(null, user, { message: "Logged In Successfully" });
    }
  )
);

//use the JWT strategy to verify a user (authorization)
passport.use(
  new JWTStrategy(
    {
      // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJWT.fromHeader("x-access-token"),
      secretOrKey: secret,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return models.Users.findOne({ where: { id: jwtPayload.user_id } })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

//local strategy only with cookies

// module.exports = function (passport) {
//   passport.use(
//     //defines strategy
//     new localStrategy((username, password, done) => {
//       //lookup user in the database
//       models.Users.findOne({ where: { username: username } }, (err, user) => {
//         console.log("find 1");
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );
//   //stores a cookie with the user id
//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });
//   //takes the cookie & returns a user
//   passport.deserializeUser((id, cb) => {
//     models.Users.findOne({ id }, (err, user) => {
//       cb(err, user);

//       // const userInformation = {
//       //   username: user.username,
//       // };
//       // cb(err, userInformation);
//     });
//   });

//   // passport.serializeUser((user, done) => done(null, user.id));
//   // passport.deserializeUser((id, done) => {
//   //   return done(null, getUserById(id));
//   // });
// };
>>>>>>> staging
