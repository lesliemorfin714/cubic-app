const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    username: {
        type: String,
        unique: true, 
        required: true,
        minlength: 5,
        maxlength: 15,
    },
    password: {
        type: String,
        unique: true, 
        required: true,
        minlength: 5,
    },
    token: {
        type: String,
    }
});

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 9);
    next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

userSchema.methods.generateToken = function(callback) {
    let user = this; // "this" is the user obj from database
    let token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    user.save(function(err, user) {
        if(err) return callback(err);
        callback(null, user);
    });
};

userSchema.statics.findByToken = function(token, callback) {
    let user = this;
    jwt.verify(token, process.env.SECRET, function (err, decode) {
        user.findOne({"_id": decode, "token": token}, function (err, user) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};

userSchema.methods.deleteToken = function (token, cb) {
    let user = this;
    user.updateOne({$unset : {token: 1}}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;