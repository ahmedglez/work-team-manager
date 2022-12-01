const passport = require("passport");

const LocalStrategy = require("./strategies/local.strategy");

passport.use(LocalStrategy);

module.exports = passport;
