const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// criptografar senha
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
});

// preparando antes de salvar um novo usuário

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted) =>{
        user.password = encrypted;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);