const Product = require('../models/Product');
const Firm = require('../models/Firm')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+ path.extname( file.originalname)); // Generating unique filename e.g., 1692812893891.png
    }
  });

  const upload = multer({storage:storage});

  // to add product

  const addProduct = async(req,res)=>{

    try{

        const { productName , price, category, bestseller, description} = req.body;
        const image = req.file?req.file.filename:undefined;   
        
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId); //fetching firm id from Firm

        if(!firm)
        {
            return res.status(404).json({error: "No firm found"});
        }

        //now creating a product object and adding above values to that object.
        const product = new Product({
            productName , price, category, bestseller, description,image,firm: firm._id
        })  

        const savedProduct = await product.save(); // adding newly created product-data to Product-Model

        firm.products.push(savedProduct); // Pushing New Product-details into Firm model

        await firm.save();

        res.status(200).json(savedProduct);


  }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
  }

}

const getProductByFirm = async(req,res)=>{
    try {

        //to get firmId
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm)
        {
            return res.status(404).json({error:"No firm Found"});
        }

        const restarantName = firm.firmName;
        //pusing products into firmId
        const products = await Product.find({firm:firmId}); // take product details based on firmId;

        res.status(200).json({restarantName,products});

    } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"});   
    }
}

//To Delete a product.
const deleteProductById = async(req,res)=>{
    try {
        
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId); // fetching product-details by productId and deleting using findByIdAndDelete

        if(!deletedProduct){
            return res.status(404).json({error: "No Product found"});

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
        
    }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
