const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();

// models
require('./models/UserModel');

// ** IMPORTANT: If you're using the above instead of require syntax for models, you need to make sure to run the passport code after the imports
require('./services/passport'); // this type of import runs the file but doesn't allow you to use it in the current file

const PORT = process.env.PORT || 3029;

const app = express();

app.get('/', (req, res) => res.send('Server is working!'));

// final steps for setting up the OAuth flow
app.use(cookieSession({ // instructs Express to use cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());


// configuring the database
mongoose.Promise = global.Promise;
const databaseOptions = {
    useNewUrlParser: true,
}
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL, databaseOptions);
mongoose.connection
    .once('open', () => console.log(`The database is connected!`))
    .on('error', (err) => console.log(`There was an error starting the database: \n${err}`));

// routers

require('./routes/authRoutes')(app);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));