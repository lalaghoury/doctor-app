const useMiddlewares = (app) => {
  // Configuring Express JSON
  const useJson = require("../middlewares/json");
  useJson(app);

  // Configuring CORS
  const useCors = require("../middlewares/cors");
  useCors(app);

  // Configuring Cookie Parser
  const useCookieParser = require("../middlewares/cookie-parser");
  useCookieParser(app);

  // Configuring Error Handler
  // const useErrorHandler = require("../middlewares/error-handler");
  // useErrorHandler(app);
};

module.exports = useMiddlewares;
