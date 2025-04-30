const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');



dotenv.config();
const secretKey = process.env.WhatIsYourName;

const vendorRegister = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail)
        {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newVendor = new Vendor({
            username, email,
            password:hashedPassword
        });
        await newVendor.save(); // using save() method , we storing newVendor data into the database
        res.status(201).json({message:"Vendor registered successfully"});
        console.log("Vendor Details registed successfully");

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
    
};

// create vendor login

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password)))
        {
            return res.status(401).json({error:"Invalid username or password"});
        }

        const token = jwt.sign({vendorId : vendor._id},secretKey,{expiresIn:"7d"});  
        res.status(200).json({success:"Login successfully done",token});
        console.log(email, "this is token",token);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//creating a api for getting all vendor details
const getAllVendors = async(req,res)=>{
    
    try{
        // fetching all vendor details from Vendor-model and storing it in vendors.
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors} );
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
    
}
//fetching individual vendor details with their id 

const getVendorById = async(req,res)=>{
    
    //as we getting id from params = all-vendors
    const vendorId = req.params.id;

    try{

        //fetching id present in vendor-model
        const vendor = await Vendor.findById(vendorId).populate('firm');
        //if vendor is not present
        if(!vendor){
            return res.status(404).json({error:"Vendor not- found"});
        }
        //if vendor present
        res.status(200).json({vendor});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById};