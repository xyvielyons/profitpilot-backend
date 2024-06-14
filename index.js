import express from "express"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import cors from 'cors'
import xss from 'xss-clean'
import {ruruHTML} from 'ruru/server'
import { createYoga } from "graphql-yoga"
import { schema } from "./Graphql/schema.js"
import { applyMiddleware } from 'graphql-middleware'
import { shield,rule } from 'graphql-shield'
import jwt from "jsonwebtoken"
import graphqlauthmodel from "./models/GraphqlAuth/graphqlauthmodel.js"

const port = process.env.PORT || 5000;
let errorobj;
dotenv.config()

const app = express()




connectDB()



const corsOptions = {
    origin:'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(xss())

const isAuthenticated=rule()(async(parent,args,ctx,info)=>{
    
    const authorizationToken = ctx.req.headers.authorization
    let token
    if(authorizationToken && authorizationToken.startsWith("bearer")){
      token = authorizationToken.split(' ')[1]

    }
    
    const {userId,Role} = jwt.verify(token,process.env.SECRET_KEY)
    const getUser = await graphqlauthmodel.findById(userId)
   
    return getUser.role === "USER";
    
})

// const isAuthenticated=rule()(async(parent,args,ctx,info)=>{
//       return new Error("you cant do that ")
// })
// const isAuthenticated=rule()(async(parent,args,ctx,info)=>{
//     return ctx.req.headers.userid == "1"
// })

const permissions = shield({
  Query:{
  warehouses:isAuthenticated
  
  },
  Mutation:{
    
  }
})

const newSchemaWithMiddleware = applyMiddleware(schema,permissions)


const yoga = createYoga({
  maskedErrors:false,
  schema:newSchemaWithMiddleware,
  context:async()=>{
    return {
      
      hello:errorobj
    }
  }
})

app.all('/graphql',yoga)

app.get('/',(req,res)=>{
  res.type('html');
  res.end(ruruHTML({endpoint:'/graphql'}))
})


app.listen(port,() => console.log(`db connectio successful server running at port: ${port}`))
