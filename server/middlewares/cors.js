const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://aasilghourydevlms-aasil-ghourys-projects.vercel.app"],
      credentials: true,
    })
  );
};

module.exports = useCors; 
