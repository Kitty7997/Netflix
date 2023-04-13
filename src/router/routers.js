const express = require('express');
const app = express();
const routers = express.Router();
const SignupUser = require('../models/Signup');
const bcrypt = require('bcryptjs');
const Login = require('../models/Login')
const alert = require('alert')
const session = require('express-session');
// const passport = require('passport')
// const db = require('../db/db')
const jwt = require('jsonwebtoken');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const LocalStrategy = require("passport-local");
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);

// const db = mongoose.connection; // Get the mongoose connection

// routers.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: db }), // Use connect-mongo as session store
//     cookie: {
//         secure: true,
//         maxAge: 60000
//     }
// }));


// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'https://mynetfile.onrender.com/auth/google/callback',
//     scope: ['profile', 'email']
// }, (accessToken, refreshToken, profile, cb) => {
//     cb(null, profile)
// }
// ));

// routers.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// routers.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Check if user is authenticated
//         if (req.isAuthenticated()) {
//             // Redirect to next page
//             res.redirect('http://localhost:3000');
//         } else {
//             // Show error message
//             res.send('Something went wrong with Google authentication. Please try again.');
//             res.redirect('http://localhost:3000/login');
//         }
//     }
// );

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// routers.get('/auth/logout', (req, res) => {
//     console.log('Logout successfully');
//     req.logout();
//     res.redirect('/');
// });

routers.post('/signup', async (req, res) => {
    const { email, password, cpassword, phone } = req.body;
    const existingUser = await SignupUser.findOne({ email: email });
    try {
        if (existingUser) {
            res.status(409).json('User already exist')
        } else {

            if (password == cpassword) {
                const UserData = new SignupUser({
                    email: email,
                    password: password,
                    cpassword: cpassword,
                    phone: phone
                });
                const token = await UserData.generateAuthToken();
                // res.cookie('netflix', token, {
                //     expires: new Date(Date.now() + 600000),
                //     httpOnly: true
                // })
                await UserData.save();
                res.status(201).json({ message: 'exist' })
            } else {
                res.status(400).json({ message: 'notexist' })
            }
        }
    } catch (error) {
        console.log(error)
    }
});

routers.post('/login', async (req, res) => {
    const { phonemail, mailpassword } = req.body;
    const Compare = await SignupUser.findOne({ email: phonemail });
    const isMatch = await bcrypt.compare(mailpassword, Compare.password);
    // console.log(isMatch)
    // const token = await Compare.generateAuthToken();
    // res.cookie('netflix', token, {
    //     expires: new Date(Date.now() + 600000),
    //     httpOnly: true
    // })
    try {
        if (isMatch) {
            res.status(201).json({ message: 'exist' })
            // alert('Signup Successfully')
        } else {
            res.status(400).json({ message: 'notexist' })
            // alert('Either email or password are not matching')
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = routers;