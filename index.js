const express = require('express');
const mongoose = require('mongoose');
require('./services/passport'); // this type of import runs the file but doesn't allow you to use it in the current file
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

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