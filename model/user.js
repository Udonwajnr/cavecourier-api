const mongoose = require("mongoose")
const userSchema =mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type: String,
        required: true,
    },
     // favoriteEateries:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //         ref:'eatery',
    //         required:false
    // }]

    role: {
        type: String,
        enum: ['Customer', 'Admin'],
        default: 'Customer'
    },
    addresses:[{
        type: mongoose.Types.ObjectId,
        ref: 'Address'
    }],
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
    type: Date,
    default: Date.now
    }
})

module.exports = mongoose.model("User",userSchema)