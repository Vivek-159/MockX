const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        // match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        // match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
    },
    password:{
        type:String,
        required:true,
        // minlength: 8,
        // maxlength: 128,
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        //     "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character."],
    }
});

const UserModel = mongoose.model('user', userSchema)

module.exports={
    UserModel
}