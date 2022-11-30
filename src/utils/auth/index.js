const passport = require("passport");

const LocalStrategy = require("./strategies/local.strategy");

passport.use(require(LocalStrategy));

module.exports = passport;
