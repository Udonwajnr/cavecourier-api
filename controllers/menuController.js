const asyncHandler = require("express-async-handler")
const Menu = require("../model/menuItem")
const Category = require("../model/category")

const getAllMenu =asyncHandler(async()=>{
    const menu = await Menu.find()
    return res.status(200).json(menu)
})

// get user by id
const getMenu = asyncHandler(async(req,res)=>{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
        return res.status(400).json({msg:"Menu does not exist"})
    }
     return res.status(200).json(menu)
})

const createMenu =asyncHandler(async(req,res)=>{
    const {name,description,price,category,image} = req.body
    const menu = new Menu({
        name,description,price,category,image
    })
    res.status(200).json({message:"Category Created Successfully"})  
})


module.exports={getMenu,getAllMenu,createMenu}