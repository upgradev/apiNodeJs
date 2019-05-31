const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: true, select: false },
    created: { type: Date, default: Date.now }

});

UserSchema.pre('save', async function(next) {
    let user = this;
    //if not modified password
    if(!user.isModified('password')) return next();

    //else
    user.password = await bcrypt.hash(user.password, 10);
    return next();


});

module.exports = mongoose.model('User', UserSchema);