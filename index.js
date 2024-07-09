import express from "express"
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js"
import cors from 'cors'
import xss from 'xss-clean'
import {ruruHTML} from 'ruru/server'
import { createYoga } from "graphql-yoga"
import { schema } from "./Graphql/schema.js"
import { applyMiddleware } from 'graphql-middleware'
import { shield,and,or } from 'graphql-shield'
import { isAuthenticatedAdmin } from "./middlewares/authmiddlewares.js"
import { isAuthenticatedUser } from "./middlewares/authmiddlewares.js"
const port = process.env.PORT || 5002
;
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




const permissions = shield({
  Query:{
  // warehouses:or (isAuthenticatedAdmin,isAuthenticatedUser),
  // warehouse:or(isAuthenticatedAdmin,isAuthenticatedUser)
  },
  Mutation:{
    // createWarehouse:or(isAuthenticatedAdmin,isAuthenticatedUser)
    
  }
})

const newSchemaWithMiddleware = applyMiddleware(schema,permissions)


// const yoga = createYoga({
//   maskedErrors:false,
//   schema:newSchemaWithMiddleware,
//   context:async()=>{
//     return {
      
//       hello:errorobj

//     }
//   }
// })

const yoga = createYoga({
  schema,
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
