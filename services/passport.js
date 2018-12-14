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
    callbackURL: '/auth/google/callback', // this is the URL the user will be redirected to after logging in with OAuth
    proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await UserModel.findOne({ googleID: profile.id })
        if (existingUser !== null) {
            console.log(`Existing user found!`);
            return done(null, existingUser);
        } 
        
        console.log(`Creating new user`)
        const newUser = await new UserModel({ googleID: profile.id }).save();
        return done(null, newUser);
        
    })
);