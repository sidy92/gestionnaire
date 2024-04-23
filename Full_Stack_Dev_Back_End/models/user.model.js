const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('./../config');

const { Schema } = mongoose;

const UserSchema = new Schema ({
    fullname: {
        type: String
    },
    job: {
        type: String
    },
    role: {
        type: String,
        enum: ['rh', 'admin', 'employee'],
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }]
}, {
    timestamps: true
});

UserSchema.pre('save', async function(next){
    if (this.password) {
        if (this.isModified('password') || this.isNew){
            this.password = bcrypt.hashSync(this.password,8 )
        }
        else{
            next()
        }
    }
    else {
        next()
    }
})

UserSchema.methods.comparePassword = function (pw) {
    let passwordIsValid = bcrypt.compareSync(pw,this.password)

    return !!passwordIsValid
}

UserSchema.methods.getJWT = function () {
    return jwt.sign({
        id : this._id.toString()
    },config.TOKEN_SECRET,{
        expiresIn:86400
    });
}

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;
