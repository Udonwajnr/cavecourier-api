const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:false
  },
  image:{
    type:String,
    required:false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports=mongoose.model('Category', categorySchema)