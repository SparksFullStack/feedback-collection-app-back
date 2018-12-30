const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 0,
    }
})

mongoose.model('users', userSchema);