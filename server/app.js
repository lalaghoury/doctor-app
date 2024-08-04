const app = require("express")();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Configuring Middlewares
const useMiddlwares = require("./utils/useMiddlewares");
useMiddlwares(app);

// Configuring Routes
const useRoutes = require("./utils/useRoutes");
useRoutes(app);

// Connecting to MongoDB
const connectDB = require("./utils/db");
connectDB().then(() => {
  // Starting Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
