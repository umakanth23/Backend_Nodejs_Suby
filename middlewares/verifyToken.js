const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.WhatIsYourName;

//creating a middleware,

const verifyToken = async(req,res,next)=>{
    //passing token to header
    const token = req.headers.token;

    if(!token){
        //when token is present in header.
        return res.status(401).json({error:"Token is required"});
    }

    try{

        const decoded = jwt.verify(token,secretKey); // this is input token, decoded and storing in decoded variable
        const vendor = await Vendor.findById(decoded.vendorId); 

        if(!vendor){
            return res.status(404).json({error:"vendor not found"});
        }
        req.vendorId = vendor._id;
        next();

    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Invalid Token"});
    }
}

module.exports = verifyToken;