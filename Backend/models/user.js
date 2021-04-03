const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const e = require('express');
const {ObjectId}=mongoose.Schema

const userShema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Name is required"]
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    role:{
        type:Number,
        default:0
    },
    category:{
        type:ObjectId,
        required:[true,"Please Select Category"],
        ref:"Category"
    },
    active:{
        type:Boolean,
        default:true
    },
    resetToken:String,
    expireToken:Date,
}, { timestamps: true })



userShema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



userShema.statics.login = async function (email, password,role,active) {
    if(role===1){
        const user=User.find({role:1});
        return user;
    }else{
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        console.log("The value of auth",auth,password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
}
    throw Error('incorrect email');
}

const User = mongoose.model('User', userShema);

module.exports = User;