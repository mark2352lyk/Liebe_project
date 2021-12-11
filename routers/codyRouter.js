const express = require("express");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config(); 

const dbConfig = {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    db_name: process.env.db_name,
};

const db = mysql2.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db_name,
});

const router = express.Router();

router.get("/", (req,res,next) => {
    res.render("screens/header/cody", { cody : "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png" });
})

router.get("/upload", (req,res,next) => {
    res.render("screens/codyUpload");
});
 
router.post("/check", (req,res) => {
    
})

module.exports = router;

module.exports = router;
