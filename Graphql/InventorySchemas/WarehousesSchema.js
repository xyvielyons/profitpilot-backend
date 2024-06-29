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
    type Response {
        status:String!
        message:String!
    }

    type Query {
        warehouse(id:ID!):Warehouse
        warehouses(userid:String!):[Warehouse]
    }
    type Mutation{
        updateWarehouse(id:String!,userId:String!,warehouse:String,phone:String,country:String,city:String,email:String,zipCode:String):Warehouse
        createWarehouse(userId:String!,warehouse:String!,phone:String!,country:String!,city:String!,email:String!,zipCode:String!):Warehouse
        deleteWarehouse(id:String!):Response

    }



`