import mongoose from 'mongoose'

const WarehouseSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    warehouse:{
        type:String,
        required:[true,"warehouse is required field"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"Phone is required field"],
        
    },
   
    country:{
        type:String,
        required:[true,"Country is required field"],
        
    },
    city:{
        type:String,
        required:[true,"City is required field"],
        
    },
    email:{
        type:String,
        required:[true,"email is required field"],
        
    },
    zipCode:{
        type:String,
        required:[true,"zipcode is required field"],
        
    },
    

})

export default mongoose.model('warehouse',WarehouseSchema)