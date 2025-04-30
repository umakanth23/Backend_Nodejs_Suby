const mongoose = require("mongoose");

//creating product same
const productSchema = new mongoose.Schema({

    productName :{
        type :String,
        required : true
    },
    price :{
        type :String,
        required:true,
    },
    category:{

        type : [
            {
                type:String,
                enum : ['veg','non-veg']
            }
        ]
    },
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    //creating relation between firm and product
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
});

const Product = mongoose.model('product',productSchema);
module.exports = Product
