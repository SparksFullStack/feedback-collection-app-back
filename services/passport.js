const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const UserModel = mongoose.model('users')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // this is the URL the user will be redirected to after logging in with OAuth
    }, (accessToken, refreshToken, profile, done) => {
        const newUser = new UserModel({ googleID: profile.id });
        console.log(newUser);
    })
);