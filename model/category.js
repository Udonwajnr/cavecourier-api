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
  eatery:{
    type: mongoose.Types.ObjectId,
    ref: 'Eatery',
    required: true  
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