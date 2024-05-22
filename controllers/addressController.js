const asyncHandler = require("express-async-handler")
const Address = require("../model/address")
const User = require("../model/user")

const getAllAddresses =asyncHandler(async(req,res)=>{
    const address = await Address.find().populate('user')
    return res.status(200).json(address)
})

const getAddress =asyncHandler(async(req,res)=>{
    const address = await Address.findById(req.params.id)
    if(!address){
        return res.status(400).json({msg:"Eatery Does not exist"})
    }s
    return res.status(200).json(address)
})

const createAddress = asyncHandler(async (req, res) => {
    const { user,label, address, city, state, zipCode, country, coordinates} = req.body;
    // const userId = req.user.id; // Assuming user ID is obtained from the authenticated user
  
    const newAddress = new Address({
      user,
      label,
      address,
      city,
      state,
      zipCode,
      country,
      coordinates
    });
  
    await newAddress.save();
    
    const userAddress = await User.findById(user);
    userAddress.addresses.push(newAddress.id);
    await userAddress.save();
  
    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  });

  const updateAddress=asyncHandler(async(req,res)=>{
    const address = await Address.findById(req.params.id)
    if(!address){
        throw new error("Address not Found")
    }
    const updateAddress = await Address.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateAddress)
  })


const deleteAddress = asyncHandler(async(req,res)=>{
    const address = await Address.findById(req.params.id)
    if(!address){
        throw new Error("Address Not found")
    }
    await Address.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})

module.exports = {getAllAddresses,getAddress,createAddress,deleteAddress}