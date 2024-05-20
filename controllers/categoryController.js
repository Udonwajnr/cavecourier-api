const asyncHandler = require("express-async-handler")
const Category = require("../model/category")

const getAllCategory =asyncHandler(async(req,res)=>{
    const category = await Category.find()
    return res.status(200).json(category)
})

const getCategory=asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({msg:"Menu does not exist"})
    }
    return res.status(200).json(category)
})

const createCategory = asyncHandler(async(req,res)=>{
    const {name,description,image} = req.body

    const category = new Category({name,description,image})
    await category.save()
    res.status(200).json({message:"Category Created Successfully"})  
})  

const updateCategory = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        throw new error("Post not Found")
    }
    const updateCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateCategory)
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        throw new Error("Post Not found")
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})


module.exports={getAllCategory,getCategory,createCategory,updateCategory,deleteCategory}