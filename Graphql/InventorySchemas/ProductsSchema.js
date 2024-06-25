export const InventoryProductsTypeDef = /* GraphQL */ `
    type Products {
        id:ID!
        userId:String!
        product:String!
        image:String!
        type:String!
        category:String!
        brand:String!
        salePrice:Float!
        purchasePrice:Float!
        stockUnit:Float!
        warehouse:String!
    }

    type Query {
        product(id:ID!):Products
        products(userId:String!):[Products]
    }
    type Mutation{
        updateProduct(id:ID!,userId:String!,product:String,image:String,type:String,category:String,brand:String,salePrice:Float,purchasePrice:Float,stockUnit:Float,warehouse:String):Products
        createProduct(userId:String!,product:String,image:String,type:String,category:String,brand:String,salePrice:Float,purchasePrice:Float,stockUnit:Float,warehouse:String):Products

    }



`