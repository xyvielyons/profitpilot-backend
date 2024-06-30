export const InventoryUnitsTypeDef = /* GraphQL */`
    type Units{
        id:ID!
        userId:String!
        unit:String!
        shortName:String!
        baseUnit:String!
        operator:String!
        operatorValue:String!
    }
    type Query {
        units(userId:String!):[Units]
        unit(id:String!):Units
    }
    type Response {
        status:String!
        message:String!
    }
    
    type Mutation{
        updateUnit(id:String!,userId:String!,unit:String,shortName:String,baseUnit:String,operator:String,operatorValue:String):Units
        createUnit(userId:String!,unit:String!,shortName:String!,baseUnit:String!,operator:String!,operatorValue:String!):Units
        deleteUnit(id:String!):Response
    }


`