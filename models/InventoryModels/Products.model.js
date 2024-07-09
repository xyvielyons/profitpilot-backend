import mongoose, { Schema } from 'mongoose'

const ProductSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is required field"]

    },
    warehouse:{
        type:String,
        required:[true,"warehouse is required field"]

    },
    productName:{
        type:String,
        required:[true,"productName is required field"]

    },
    productSlug:{
        type:String,
        required:[true,"productSlug is required field"]

    },
    category:{
        type:String,
        required:[true,"category is required field"]

    },
    brand:{
        type:String,
        required:[true,"brand is required field"]

    },
    quantityAlert:{
        type:String,
        required:[true,"quantityAlert is required field"]

    },
    unit:{
        type:String,
        required:[true,"unit is required field"]

    },
    description:{
        type:String,
        required:[true,"description is required field"]

    },
    variants:[{
        type:Schema.Types.ObjectId,
        ref:"variation"

    }],
    purchasePrice:{
        type:String,
        required:[true,"purchasePrice is required field"]

    },
    sellingPrice:{
        type:String,
        required:[true,"sellingPrice is required field"]

    },
   
    openingStock:{
        type:String,
        required:[true,"openingStock is required field"]

    },
    taxMethod:{
        type:String,
        required:[true,"taxMethod is required field"]

    },
    tax:{
        type:String,
        required:[true,"tax is required field"]

    },
   
    image:{
        type:String,
        required:[true,"image is required field"]

    },
   

})

export default mongoose.model('product',ProductSchema)