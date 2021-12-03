const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const globalRouter = require("./routers/globalRouter");
const loginRouter = require("./routers/loginRouter");
dotenv.config();

const app = express();
const PORT = 5000;

app.set("view engine", "pug");
app.use(morgan(`dev`));

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/", globalRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
    console.log(`${PORT} SERVER START!`);
});