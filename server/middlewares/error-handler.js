
const useErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
  });
};

module.exports = useErrorHandler;
