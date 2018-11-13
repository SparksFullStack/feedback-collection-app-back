const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true,
    },
})

mongoose.model('users', userSchema);