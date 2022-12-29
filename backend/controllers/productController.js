const mongoose = require('mongoose');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeaures = require('../utils/apiFeatures');

//List All Products
exports.getAllProducts = CatchAsyncErrors(async (req, res) => {
    const apiFeatures = new ApiFeaures(Product.find(), req.query )
        .search();
    const product = await apiFeatures.query;
    res.status(200).json({
        success: true,
        product
    })
});


//List single Product
exports.getProductDetails = CatchAsyncErrors( async (req, res, next) => {
    const productId = new mongoose.Types.ObjectId(req.params.id);
    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(500, 'Producto no encontrado'))
    }

    res.status(200).json({
        success: true,
        product
    })
});


//Create Product --ADMIN
exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

});

//Update Products --ADMIN
exports.updateProduct = CatchAsyncErrors( async (req, res, next) => {
    let productId = new mongoose.Types.ObjectId(req.params.id);
    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(500, 'Producto no encontrado'))
    }

    product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
});

//Delete product --ADMIN
exports.deleteProduct = CatchAsyncErrors( async (req, res, next) => {
    const productId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(500, 'Producto no encontrado'))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente.'
    })

});