import jwt from "jsonwebtoken"
import graphqlauthmodel from "../models/GraphqlAuth/graphqlauthmodel.js"
import { rule } from 'graphql-shield'
export const isAuthenticatedUser=rule()(async(parent,args,ctx,info)=>{
    
    const authorizationToken = ctx.req.headers.authorization
    let token
    if(authorizationToken && authorizationToken.startsWith("bearer")){
      token = authorizationToken.split(' ')[1]

    }
    
    const {userId} = jwt.verify(token,process.env.SECRET_KEY)
    const getUser = await graphqlauthmodel.findById(userId)
    if(!getUser){
      return new Error("user was not found access denied")
    }
    if(getUser.status === "inactive"){
      return new Error("user has been deactivated")
    }
   
    return getUser.role === "USER";
    
})
export const isAuthenticatedAdmin=rule()(async(parent,args,ctx,info)=>{
    
    const authorizationToken = ctx.req.headers.authorization
    let token
    if(authorizationToken && authorizationToken.startsWith("bearer")){
      token = authorizationToken.split(' ')[1]

    }
    
    const {userId} = jwt.verify(token,process.env.SECRET_KEY)
    const getUser = await graphqlauthmodel.findById(userId)
    if(!getUser){
      return new Error("user was not found... access denied")
    }
    if(getUser.status === "inactive"){
      return new Error("user has been deactivated")
    }
   
    return getUser.role === "ADMIN";
    
})

