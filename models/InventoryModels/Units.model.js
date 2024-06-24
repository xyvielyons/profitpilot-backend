import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is a required field"]
    },
    unit:{
        type:String,
        required:[true,"Unit is required field"],
       
    },
    shortName:{
        type:String,
        required:[true,"shortName is required field"],
        
    },
    baseUnit:{
        type:String,
        required:[true,"baseUnit is required field"],
       
    },
    operator:{
        type:String,
        required:[true,"Operator is required field"],
        
    },
    operatorValue:{
        type:String,
        required:[true,"OperatorValue is required field"],
        
    },
    

})

export default mongoose.model('unit',UnitSchema)