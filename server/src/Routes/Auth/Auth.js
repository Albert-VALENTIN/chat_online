const db = require('../../config/set_db')
const bcrypt = require('bcrypt')
const express = require('express')

const saltRounds = 10;

let router = express.Router()


router
    .route("/register")
    .post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, saltRounds, (err, hash)=> {
            if (err) {
                console.log(err);
            }

            db.query(
                "INSERT INTO users (username, password) VALUES (?,?)",
                [username, hash],
                (err, result) => {
                    console.log(err);
                }
            );
        });
    })

router
    .route("/login")
    .post( async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        await db.query(
            "SELECT * FROM users WHERE username = ?;",
            username,
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }

                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {
                            req.session.user = result;
                            console.log(req.session.user);
                            res.send(result);
                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    });
                } else {
                    res.send({ message: "User doesn't exist" });
                }
            }
        );
    })
    .get( (req, res) => {
        if (req.session.user) {
            res.send({ loggedIn: true, user: req.session.user });
        } else {
            res.send({ loggedIn: false });
        }
    })

module.exports = router
