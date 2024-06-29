export const InventoryVariantsTypeDef = /* GraphQL */`
    type Variants{
        id:ID!
        userId:String!
        name:String!
        values:[String!]
    }

    type Query {
        variants(userId:String!):[Variants]
        variant(id:String!):Variants
    }
    
    type Mutation{
        updateVariant(id:String!,userId:String!,name:String,values:String):Variants
        createVariant(userId:String!,name:String!,values:String!):Variants
    }


`