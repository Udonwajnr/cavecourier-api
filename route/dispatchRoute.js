const express = require("express")
const router = express.Router()

const {createDispatchRider,deleteDispatchRider,getDispatchRiderById,getDispatchRiders,updateDispatchRider}  = require('../controllers/dispatchController')
router.route("/:id").get(getDispatchRiderById)
router.route("/").get(getDispatchRiders)
router.route("/").post(createDispatchRider)
router.route("/:id").put(updateDispatchRider)
router.route("/:id").delete(deleteDispatchRider)

module.exports=router