const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create new Order
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,totalPrice,paymentInfo,itemsPrice,taxPrice,shippingPrice} = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        totalPrice,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(200).json({
        success:true,
        order,
    });
});

// Get Single Order

exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order) {
        return next(new ErrorHandler(`No Order Found With This Id`,404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});