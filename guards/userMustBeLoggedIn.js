//var express = require("express");
//const jwt = require("jsonwebtoken");
const passport = require("passport");

function userMustBeLoggedIn() {
  return passport.authenticate("local", { session: false });
}
