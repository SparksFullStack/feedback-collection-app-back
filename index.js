const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // this is the URL the user will be redirected to after logging in with OAuth
    }, (accessToken) => console.log(accessToken))
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', (req, res) => res.send('working!'))
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));