const asyncHandler = require("express-async-handler")
const Menu = require("../model/menuItem")
const Category = require("../model/category")
const Eatery = require("../model/eatery")
const getAllMenu =asyncHandler(async(req,res)=>{
    const menu = await Menu.find()
    return res.status(200).json(menu)
})

const getMenu = asyncHandler(async(req,res)=>{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
        return res.status(400).json({msg:"Menu does not exist"})
    }
     return res.status(200).json(menu)
})

const createMenu = asyncHandler(async (req, res) => {
    const { name, description, price, category, image, eatery } = req.body;
        // Create new menu item
    const menu = new Menu({
        name,
        description,
        price,
        category,
        image,
        eatery
    });
    await menu.save();
    
        // Find the eatery by ID and update its menu
        const eateryToUpdate = await Eatery.findById(eatery);
        if (eateryToUpdate) {
            eateryToUpdate.menu.push(menu._id);
            await eateryToUpdate.save();
            res.status(200).json({ message: "Menu Item Created Successfully" });
        } else {
            res.status(404).json({ message: "Eatery not found" });
        }
    }); 

const updateMenu = asyncHandler(async(req,res)=>{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
        throw new error("Menu not Found")
    }
    const updateMenu = await Menu.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateMenu)
})

const deleteMenu = asyncHandler(async(req,res)=>{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
        throw new Error("Menu Not found")
    }
    await Menu.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})

module.exports={getMenu,getAllMenu,createMenu,updateMenu,deleteMenu}