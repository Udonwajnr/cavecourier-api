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
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true  
    },
    image:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('MenuItem', menuItemSchema);