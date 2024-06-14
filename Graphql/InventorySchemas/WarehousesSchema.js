export const InventoryWarehouseTypeDef = /* GraphQL */ `
    type Warehouse {
        id:ID!
        userId:String!
        warehouse:String
        phone:String
        country:String
        city:String
        email:String
        zipCode:String
    }

    type Query {
        warehouse(id:ID!):Warehouse
        warehouses(userid:ID!):[Warehouse]
    }
    type Mutation{
        updateWarehouse(id:String!,userid:String!,warehouse:String,phone:String,country:String,city:String,email:String,zipCode:String):Warehouse
        createWarehouse(userId:String!,warehouse:String!,phone:String!,country:String!,city:String!,email:String!,zipCode:String!):Warehouse

    }



`