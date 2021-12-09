const express = require("express");
const express = require("express");

const router = express.Router();

router.get("/basket", (req, res, next) => {
  render("screens/header/basket");
});

export default headerRouter;
