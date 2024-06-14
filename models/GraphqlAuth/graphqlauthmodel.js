import mongoose from 'mongoose'

const GraphqlAuthModelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required field"],
      
    },
    role:{
        type:String,
        required:[true,"role is required field"],
        enum:['USER','ADMIN']
        
        
    },
    
    email:{
        type:String,
        required:[true,"email is required field"],
        
    },
    password:{
        type:String,
        required:[true,"password is required field"],
        
    },

})

export default mongoose.model('auth',GraphqlAuthModelSchema)