const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();



// passport.use(new GoogleStrategy());



app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));