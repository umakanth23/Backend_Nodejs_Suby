const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    username:{
        type :String,
        required :true
    },
    email:{
        type:String,
        required :true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
    //vendor and firm is connected. 
})

const Vendor = mongoose.model('Vendor',vendorSchema);
module.exports = Vendor