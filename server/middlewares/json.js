const express = require("express");

const useJson = (app) => {
  app.use(express.json());
};

module.exports = useJson;
