import bcrypt from 'bcrypt'
import graphqlauthmodel from "../../models/GraphqlAuth/graphqlauthmodel.js"
import jwt from "jsonwebtoken"


export const AuthGraphqlResolver = {
    Query:{

    },
    Mutation:{
        signup:async(obj,args,context)=>{
            if(args.password !== args.confirmPassword){
                return Error('passwords do not match')

            }
            
             const searchUser = await graphqlauthmodel.findOne({email:args.email})
             console.log(searchUser)
            if(searchUser){
                return Error('email has already been taken')
            }

            const hashedpassword = await bcrypt.hashSync(args.password,10)
            
            const SaveUserToDB = new graphqlauthmodel({
                name:args.name,
                role:args.role,
                email:args.email,
                password:hashedpassword

            })

            await SaveUserToDB.save()

            const token = jwt.sign({userId:SaveUserToDB.id,Role:SaveUserToDB},process.env.SECRET_KEY)

            return {
                token,
                user:SaveUserToDB
            }



        },
       login:async(obj,args,context)=>{

            const getUserFromDB = await graphqlauthmodel.findOne({email:args.email})
            if(!getUserFromDB){
                return Error("user not found")
            }

            const valid = await bcrypt.compareSync(args.password,getUserFromDB.password)

            if(!valid){
                return Error("user password not valid")
            }

            const token = jwt.sign({userId:getUserFromDB.id,Role:getUserFromDB.role},process.env.SECRET_KEY)

            return {token,user:getUserFromDB}


        }

    }

}