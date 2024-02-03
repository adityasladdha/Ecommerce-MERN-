const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//create products -- admin
exports.createProduct = catchAsyncError(async (req,res,next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

// get all products


exports.getAllProducts = catchAsyncError (async (req,res)=>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    });
});

// Get product detail

exports.getProductDetails =catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    res.status(200).json({success:true,product})

}); 
//Update Product -- Admin

exports.updateProduct = catchAsyncError(async(req,res,next)=>{

    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
    useFindAndModify:false});

    res.status(200).json({
        success:true,
        product,
    })
});

//Delete Product

exports.deleteProduct = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    
    await product.deleteOne();
    
    res.status(200).json({success:true,message:"Product deleted successfully"})
});