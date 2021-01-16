var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt")
const passport = require('passport')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Load User model
const User = require("../models/Users");

require('../passport-strategy')(passport);

// GET request
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// POST request
// Add a user to db
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password: req.body.password
    });

    await newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user',
        successFlash: true,
        // console.log("logged in successfully")
        // successRedirect: true,
        failureRedirect: '/login',
        failureFLash: true
    })(req, res, next);
});

module.exports = router;

