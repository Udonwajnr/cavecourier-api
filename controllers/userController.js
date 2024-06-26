const asyncHandler = require("express-async-handler")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer")
const {validationResult} =require('express-validator')
const {sendingOtp} = require("../middleware/sendingOtpMAil")
const JWT = require("jsonwebtoken")
const Token = require("../model/token")
const crypto = require('crypto')
const { sendingResetPasswordLink } = require("../middleware/sendingResetPasswordLink")
// get all user
const getAllUsers =asyncHandler(async(req,res)=>{
    const users = await User.find()
    return res.status(200).json(users)
})

// get User by id
const getUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(400).json({msg:"User does not exist"})
    }
    return res.status(200).json(user)
})

// User registration
const register = asyncHandler(async(req,res)=>{
    const error = validationResult(req)
      if(!error.isEmpty()){
          return res.status(400).json({error:error.array()})
      }
  
    const {fullName,email,phoneNumber,password,otp,username} = req.body  
    let user = await User.findOne({
      email:email
    })
    if(user){
      return res.status(422).json({msg:"Email is Already registered"})
      }
  
      const generatedUserOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    await sendingOtp({
      otp:generatedUserOtp,
      email:email
      })
      
      // const token = JWT.sign({id:user._id},process.env.JWT_SECRET)
      let data = {
        fullName,
        email,
        phoneNumber,
        password:await bcrypt.hash(password, 10),
        otp:generatedUserOtp,
        username
    }
  const newUser = new User(data)
  
  await newUser.save();
  res.status(200).json({message:"Registration Successful"})    
})

const verifyEmail =asyncHandler(async(req,res)=>{
    const {email,otp} = req.body
    const user = await User.findOne({email})
  
    if(!user){
      return res.status(400).json({msg:'user not found'})
    }
    if(user && user.otp !==otp){
      return res.status(500).json({msg:"Invalid Opt"})
    }
    res.send(user)
  })
  
  // ======= resend otp =======
const resendOpt =asyncHandler(async(req,res)=>{
  
    const {email} = req.body
    const user = await User.findOne({
      email
    })
    if(!user){
      return res.status("400").json("User Does not exist")
    }
    
    const generatedUserOtp = otpGenerator.generate(6,  { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });  
    const updatedUserOtp = await User.findOneAndUpdate({email:email},{otp:generatedUserOtp},{new:true})  
    await sendingOtp({otp:generatedUserOtp,email:email})
  
    res.status(200).json(updatedUserOtp)
  })

  // ======= login =======
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
 
     const user = await User.findOne({
       email
     })
 
     if(!user){
       return res.status(400).json({msg:"User Not Found"})
     }
     const passwordMatch = await bcrypt.compare(password,user.password);
     
     if (!passwordMatch) {
       return res.status(401).json({ message: "Invalid email or password" });
     }
 
     const token = JWT.sign({id:user._id,email:user.email},
       process.env.JWT_SECRET || "1234!0@#%<{*&)",
     { expiresIn: "1h" })
 
 
     return res.status(200).json({ message: "Login Successful", data: user, token });
 })

 const requestPasswordReset =asyncHandler(async(req,res)=>{
    const {email} = req.body
    if (!email){
      return res.status(422).json({ msg: "Email is required" })
    };
    
      const user = await User.findOne({email});
      
      // Check the user
      if (!user){
        return res.status(400).json("User not found");
      }
  
      let token = await Token.findOne({
        userId:user._id
      })
  
      if(!token){
        token = await new Token({
          userId:user._id,
          token:crypto.randomBytes(32).toString("hex"),
        }).save()
      }
  
      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`; 
      await sendingResetPasswordLink({link,email})
  
      return res.status(200).json({msg:"Email Sent",token:link})
  })

  // ======= password reset =======

const resetPassword =asyncHandler(async(req,res)=>{
    const {password} = req.body
    const user = await User.findById(req.params.userId);
  
    if (!user) return res.status(400).send("invalid link or expired");
  
    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");
    
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    await token.deleteOne();
  
    res.send("password reset successfully.");
  })
  
  
  const updateUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
      throw new error("User not found")
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateUser)
  })
module.exports = {getUser,getAllUsers,register,verifyEmail,resendOpt,login,requestPasswordReset,resetPassword,updateUser}