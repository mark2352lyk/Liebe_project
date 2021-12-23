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
        SELECT  content,
                createdAt
          FROM  inquire
    `
    db.query(listQuery, (error,result) => {
        if(error) {
            console.log(error);
        }
        res.render("screens/inquire", {inquireList : result});
    });
});

router.post("/check", (req,res,next) => {
    const inquireQuery =`
        INSERT INTO inquire (
            content,
            createdAt
        ) VALUES (
            "${req.body.content}",
            now()
        );
    `
    db.query(inquireQuery, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).send("에러");
        } else {
            res.redirect("/inquire");
        }
    });
});

module.exports = router;