'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {questionSchema} = require('./question');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
    // questions: [{
    //     userId: mongoose.Schema.Types.ObjectId,
    //     question: String,
    //     answer: String,
    //     correct: Number
    // }]
    // NEED TO CHANGE MODEL
    // questions: { Type: object } 
});

userSchema.set('toObject', {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
});

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};  


module.exports = mongoose.model('User', userSchema);