const express = require('express');
require('./services/passport'); // this type of import runs the file but doesn't allow you to use it in the current file
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

// routers
require('./routes/authRoutes')(app);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));