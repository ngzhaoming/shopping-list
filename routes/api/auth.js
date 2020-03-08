//Express router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Item model
const User = require('../../models/User');

// @route POST request api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
    const {email, password} = req.body;

    //Simple validation whether all fields are filled up
    if (!email || !password) {
        return res.status(404).json({
            msg: 'Please enter all fields'
        });
    }

    //Check for existing user
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg: 'User does not exist'
                });
            }

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({msg: 'Invalid credentials'});
                }
        
                jwt.sign(
                    { id: user.id },
                    //Get the jwt secret
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
            })
        });
});

// @route GET request api/auth/user
// @desc Get user date
// @access Private
//Validate the user with the token
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;