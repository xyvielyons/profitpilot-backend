import mongoose, { Schema } from 'mongoose'

const VariationSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is a required field"]

    },
    variantName:{
        type:String,
        required:[true,"VariantName is required field"],

    },
    productCost:{
        type:String,
        required:[true,"ProductCost is required field"],

    },
    productPrice:{
        type:String,
        required:[true,"ProductPrice is required field"],

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"product"
    }
   

})

export default mongoose.model('variation',VariationSchema)