const mongoose = require("mongoose");
const eatery = require("./eatery");

const menuItemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    eatery:{
        type: mongoose.Types.ObjectId,
        ref: 'Eatery',
        required: true  
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true  
    },
    image:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('MenuItem', menuItemSchema);