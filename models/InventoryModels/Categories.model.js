import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    userId:{
       type:String,
       required:[true,"user id is required"]
    },
    category:{
        type:String,
        required:[true,"category is required field"],
    },
    
    description:{
        type:String,
        required:[true,"Description is required field"],
        
    },
    
})

export default mongoose.model('category',CategorySchema)