const express = require("express")
const router = express.Router()

const {getAllEatery,getEatery,createEatery,deleteEatery,updateEatery} = require('../controllers/eateryController')

router.route("/").get(getAllEatery)
router.route("/:id").get(getEatery)
router.route("/").post(createEatery)
router.route("/:id").put(updateEatery)
router.route("/:id").delete(deleteEatery)

module.exports=router