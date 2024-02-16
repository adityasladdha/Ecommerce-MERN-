const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT =  require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please provide your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type: String,
        required:[true,"Please Enter your Email"],
        unique: true,
        validate:[validator.isEmail,"Please enter a valid Email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should  be at least 8 characters long"],
        select:false,
    },
    avatar:{
         public_id: {
            type: String,
            require: true,
          },
          url: {
            type: String,
            require: true,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save",async function(next){ 
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

// JWT TOKEN
userSchema.methods.getJwtToken=function(){
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}
//COmpare Password
userSchema.methods.comparePassword= async function (enteredPassowrd) {
    return await bcrypt.compare(enteredPassowrd,this.password)
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // generate a token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model("User",userSchema);