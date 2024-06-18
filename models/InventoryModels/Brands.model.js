import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is required field"]

    },
    brand:{
        type:String,
        required:[true,"brand is required field"],
        
    },
    image:{
        type:String,
        required:[true,"Image is required field"],
        
    },
    
    description:{
        type:String,
        required:[true,"description is required field"],
        
    },

})

export default mongoose.model('Brand',BrandSchema)