const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    contactNumber: {
        type: Number,
        required: true,
        unique: true, // Ensures contact number is unique
        match: [/^\d{10}$/, 'Please enter a valid contact number'] // Validates for a 10-digit number
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);