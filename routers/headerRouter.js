const express = require("express");
const { render } = require("pug");

const router = express.Router();

router.get("/basket", (req, res, next) => {
  render("screens/header/basket");
});
