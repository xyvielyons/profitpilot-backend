import mongoose from 'mongoose'

const VariationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is a required field"]

    },
    name:{
        type:String,
        required:[true,"Product is required field"],

    },
    values:[String],
   

})

export default mongoose.model('variation',VariationSchema)