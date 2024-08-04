const cookieParser = require("cookie-parser");

const useCookieParser = (app) => {
  app.use(cookieParser());
};

module.exports = useCookieParser;
