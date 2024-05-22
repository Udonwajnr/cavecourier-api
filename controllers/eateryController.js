const asyncHandler = require("express-async-handler")
const Menu = require("../model/menuItem")
const Eatery = require("../model/eatery")

const getAllEatery=asyncHandler(async(req,res)=>{
    const eatery = await Eatery.find().populate("categories")
    return res.status(200).json(eatery)
})

const getEatery=asyncHandler(async(req,res)=>{
    const eatery = await Eatery.findById(req.params.id)
    if(!eatery){
        return res.status(400).json({msg:"Eatery Does not exist"})
    }
    return res.status(200).json(eatery)
})

const createEatery =asyncHandler(async(req,res)=>{
    const {name,location,address,contact,cuisine,rating,menu,image,category} = req.body
    const eatery = new Eatery({name,location,address,contact,cuisine,rating,menu,image,category})
    await eatery.save()
    res.status(200).json({message:"Eatery Created Successfully"})
})

const updateEatery =asyncHandler(async(req,res)=>{
    const eatery = await Eatery.findById(req.params.id)
    if(!eatery){
        throw new error("Eatery not Found")
    }
    const updateEatery = await Eatery.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateEatery)
})

const deleteEatery = asyncHandler(async(req,res)=>{
    const eatery = await Eatery.findById(req.params.id)
    if(!eatery){
        throw new Error("Eatery Not found")
    }
    await Eatery.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})


module.exports={getAllEatery,getEatery,createEatery,updateEatery,deleteEatery}
