var models = require("../models");
const bcrypt = require("bcryptjs");
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
