const mongoose = require('mongoose')

const {Schema, model} = mongoose;

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Debe ingresar un nombre del producto.'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'Debe ingresar una descripcion del producto.']
    },
    price:{
        type: Number,
        required: [true, 'Debe ingresar un precio al producto'],
        maxLength: [2, 'El precio no debe exceder los 8 caracteres']
    },
    rating:{
        type: Number,
        default:0
    },
    images:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        },
    }],
    category:{
        type: String,
        required: [true, 'El producto debe tener una categoria asignada.']
    },
    stock:{
        type: Number,
        required: [true, 'El producto debe tener un stock positivo'],
        maxLength: [4,'El stock no puede exceder los 4 caracteres'],
    },
    reviews:[{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product', productSchema);