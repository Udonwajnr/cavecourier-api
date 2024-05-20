const express = require("express")
const router = express.Router()

const {getMenu,getAllMenu,createMenu} = require('../controllers/menuController')

router.route("/").get(getMenu)
router.route("/:id").get(getAllMenu)
router.route("/").post(createMenu)
// router.route("/:id").put(updateCategory)
// router.route("/:id").delete(deleteCategory)

module.exports=router