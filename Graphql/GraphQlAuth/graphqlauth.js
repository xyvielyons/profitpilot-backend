export const graphqlAuthTypeDef = /* GraphQL */ `
    type User {
        id:ID!
        name:String
        role:String
        email:String
        password:String
    }
    type Query {
        users:[User]
        user(id:ID!):User
    }
    type AuthPayload {
        token:String
        user:User

    }
    type Mutation{
        signup(name:String!,role:String!,email:String!,password:String!,confirmPassword:String!):AuthPayload
        login(email:String!,password:String!):AuthPayload
    }


`