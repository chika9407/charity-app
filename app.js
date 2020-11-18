var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
//var bodyParser = require("body-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectsRouter = require("./routes/projects");
var favoritesRouter = require("./routes/favorites");
var filtersRouter = require("./routes/filters");
//var passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;

require("./routes/passportConfig"); //(passport);
var app = express();

app.use(logger("dev"));
//app.use(express.bodyParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use(passport.initialize());
//app.use(passport.session());

//for production
app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/favorites", favoritesRouter);
app.use("/filters", filtersRouter);

//for production
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
