const express = require("express")
const router = express.Router()

const {getMenu,getAllMenu,createMenu,deleteMenu,updateMenu} = require('../controllers/menuController')

router.route("/").get(getAllMenu)
router.route("/:id").get(getMenu)
router.route("/").post(createMenu)
router.route("/:id").put(updateMenu)
router.route("/:id").delete(deleteMenu)

module.exports=router