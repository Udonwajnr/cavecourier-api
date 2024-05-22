const express = require("express")
const router = express.Router()

const {getAllAddresses,getAddress,createAddress} = require("../controllers/addressController")


router.route("/").get(getAllAddresses)
router.route("/:id").get(getAddress)
router.route("/").post(createAddress)
// router.route("/:id").put(updateCategory)
// router.route("/:id").delete(deleteCategory)

module.exports=router