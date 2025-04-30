console.log("Hello World , Nodemon installed successfull")

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const verifyToken = require('./middlewares/verifyToken');
const productRoutes = require('./routes/productRoutes');
const path = require('path');


const app = express();
//const PORT = 4000;
const PORT = process.env.PORT || 4000;
dotenv.config();

//connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB successfully connected");
}).catch((error)=>{
    console.log(error)
});

app.use(bodyParser.json()); // this is a middleware, using this, we converting user data to json format.
//creating http method
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

// to start server
app.listen(PORT,()=>{
    console.log(`Server is created at PORT-${PORT}`);
})

//creating route using server

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to SUBY Project</h1>")
})