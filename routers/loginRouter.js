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
    res.render("screens/login");
});

router.post("/check", (req,res,next) => {
    const check_login_query = `
    SELECT  email,
    password
    FROM  login
    WHERE  email = "${req.body.email}"
    AND  password = "${req.body.password}"
    `;
    
    db.query(check_login_query, (error,result) => {
        if (error) {
            return res.status(403).send("이메일 또는 비밀번호가 틀렸습니다.");
        } else {
            if(result.length > 0) {
                res.render("screens/main");
            } else {
                res.send("<script>alert('이메일 또는 비밀번호가 틀렸습니다.');location.href='/login';</script>");            
            }
        }
    });
});

router.get("/join", (req,res,next) => {
    res.render("screens/join");
});

router.post("/join/check", (req,res,next) => {
    const email_check_query = `
    SELECT  email
      FROM  login
     WHERE  email = "${req.body.email}";
    `;
    db.query(email_check_query, (error, result) => {
        if (error) {
            return res.status(403).send("애러 발생!");
        } else {
            if (result.length > 0) {
                return res.status(403).send("이미 가입된 이메일이 존재합니다");
            } else {
                const check_join_query = `
                INSERT INTO login (
                    email,
                    password,
                    name,
                    phoneNumber
                ) VALUES (
                    "${req.body.email}",
                    "${req.body.password}",
                    "${req.body.name}",
                    "${req.body.phoneNumber}"
                );
            `;
            db.query(check_join_query, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(400).send("회원가입에 실패했습니다.");
                } else {
                    res.render("screens/main");
                }
            });
            }
        }
    })
});

module.exports = router;