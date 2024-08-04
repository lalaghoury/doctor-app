const passport = require("passport");

const usePassport = (app) => {
  // Initialize the passport
  app.use(passport.initialize());
};

module.exports = usePassport;
