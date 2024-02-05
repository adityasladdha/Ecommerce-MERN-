const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:[true,"please Enter product Name"]},
    description:{type:String,required:[true,"Please enter product description"]},
    price:{type:Number,required:[true,"Please enter product price"],maxLength:[8,"Price cannot exceed 8 cahracters"]},
    rating:{type:Number,default:0},
    images:[
       { public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
    },}
],
    category:{type:String,required:[true,"Please enter Product Category"]},
    stock:{type:Number,requied:[true,"Please enter product Stock"],maxLength:[4,"Stock cannot exceed 4 characters"],default:1},
    reviews:[{name:{type:String,required:true,},rating:{type:Number,required:true,},comment:{type:String,required:true,}}],
   
   user:{
    type : mongoose.Schema.ObjectId ,
    ref: "User",
    required:true,
   },
    createdAt:{
        type:Date,default:Date.now
    }

})

module.exports = mongoose.model("Products",productSchema);