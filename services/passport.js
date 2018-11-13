const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const UserModel = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    UserModel.findById(id)
        .then(user => done(null, user));
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // this is the URL the user will be redirected to after logging in with OAuth
    }, (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ googleID: profile.id })
            .then(user => {
                if (user !== null) {
                    console.log(`Found!`);
                    done(null, user);
                } else {
                    console.log(`Creating new user`)
                    new UserModel({ googleID: profile.id })
                        .save()
                        .then(newUser => done(null, newUser));
                }
            });
    })
);