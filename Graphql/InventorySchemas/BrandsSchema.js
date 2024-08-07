export const InventoryBrandTypeDef = /* GraphQL */ `
    type Brand {
        id:ID!
        userId:String
        brand:String
        image:String
        description:String
    }
    type Query {
        brands(userId:String!):[Brand]
        brand(id:String!):Brand
    }
    type Response {
        status:String!
        message:String!
    }

    type Mutation{
        updateBrand(id:String!,userId:String!,brand:String,image:String,description:String):Brand
        createBrand(userId:String!,brand:String!,image:String,description:String!):Brand
        deleteBrand(id:String!):Response
    }


`