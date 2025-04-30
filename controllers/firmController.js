const Firm = require('../models/Firm');
const multer = require('multer');

//adding Firm to Vendor
const Vendor = require('../models/Vendor');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+ path.extname( file.originalname)); // Generating unique filename e.g., 1692812893891.png
    }
  });

  const upload = multer({storage:storage});

const addFirm = async(req,res)=>{
   

    try{
        const {firmName,area, category,region,offer} = req.body;

        const image = req.file?req.file.filename:undefined;
    
        // we also need vendorId, so 
        const vendor = await Vendor.findById(req.vendorId);

        //if vendor is false.(vendor not found);
        if(!vendor){
            res.status(404).json({message:"Vendor not found"});
        }
    
        // now storing above data into db, 
        const firm = new Firm({
            firmName,
            area, 
            category,
            region,
            offer,
            image,
            vendor:vendor._id
        })
    
        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm);

        await vendor.save();

        return res.status(201).json({message:"Firm added successfully"});

    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Internal server error "});
    }

}


//To Delete a Firm .
const deleteFirmById = async(req,res)=>{
  try {
      
      const firmId = req.params.productId;
      const deletedFirm = await Firm.findByIdAndDelete(firmId); // fetching product-details by productId and deleting using findByIdAndDelete

      if(!deletedFirm){
          return res.status(404).json({error: "No Firm found"});

      }

  } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"}); 
      
  }
}

module.exports = { addFirm:[upload.single('image'),addFirm],deleteFirmById};
