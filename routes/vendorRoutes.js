const vendorController = require("../controllers/vendorController");
const express = require("express");

const router = express.Router();

router.post('/register',vendorController.vendorRegister); // route is created with endpoint - register. and path as vendor

router.post('/login',vendorController.vendorLogin); // we using post here, because we taking data and comparing and sending to db

router.get('/all-vendors', vendorController.getAllVendors);
// router.get('/all-vendors', (req, res) => {
//     console.log('Route hit');
//     res.send('OK');
//   });
router.get('/single-vendor/:id',vendorController.getVendorById);

module.exports = router;


