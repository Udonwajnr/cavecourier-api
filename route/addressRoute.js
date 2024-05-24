const express = require("express")
const router = express.Router()

const {getAllAddresses,getAddress,createAddress,updateAddress,deleteAddress} = require("../controllers/addressController")


router.route("/").get(getAllAddresses)
router.route("/:id").get(getAddress)
router.route("/").post(createAddress)
router.route("/:id").put(updateAddress)
router.route("/:id").delete(deleteAddress)

module.exports=router