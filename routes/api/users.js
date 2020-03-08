//Express router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//Item model
const User = require('../../models/User');

// @route POST request api/users
// @desc Resgister new user
// @access Public
router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    //Simple validation whether all fields are filled up
    if (!name || !email || !password) {
        return res.status(404).json({
            msg: 'Please enter all fields'
        });
    }

    //Check for existing user
    User.findOne({email})
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'User already exists'
                });
            }

            const newUser = new User({
                name,
                email,
                password
            });

            //Create the salt for the hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            //Token only to last for an hour
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                    }

                                    //Get a token for each user
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
});

module.exports = router;