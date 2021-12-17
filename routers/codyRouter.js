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
    const listQuery = `
        SELECT  imgd
          FROM  cody;
    `

    db.query(listQuery, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(400).send("에러 발생");
        }
  
        res.render("screens/header/cody", { imgList : result});
    });
});

router.get("/upload", (req,res,next) => {
    res.render("screens/codyUpload");
});
 
router.post("/check", (req,res) => {
    const imgQuery = `
        INSERT INTO cody (
            imgd
        ) VALUES (
            "${req.body.fileUrl}"
        );
    `
    db.query(imgQuery, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).send("에러 발생");
        } else {
            res.redirect("/cody");
        }
    });
});

module.exports = router;
