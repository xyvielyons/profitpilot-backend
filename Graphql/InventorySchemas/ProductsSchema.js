export const InventoryProductsTypeDef = /* GraphQL */ `
    type Products {
        id:ID!
        userId:String!
        warehouse:String!
        productName:String!
        productSlug:String!
        category:String!
        brand:String!
        quantityAlert:String!
        unit:String!
        description:String!
        variants:[Variant!]!
        purchasePrice:String!
        sellingPrice:String!
        openingStock:String!
        taxMethod:String!
        tax:String!
        image:String!
       
    }
    type Variant {
        id:ID!
        userId:String!
        variantName:String!
        productCost:String!
        productPrice:String!
    }
    input VariantInput {
        userId:String!
        variantName:String!
        productCost:String!
        productPrice:String!
    }

    type Query {
        product(id:ID!):Products
        products(userId:String!):[Products]
    }
    type Response {
        status:String!
        message:String!
    }
    type Mutation{

        updateProduct(id:ID!,userId:String!,warehouse:String,productName:String,productSlug:String,
         category:String,brand:String,quantityAlert:String,unit:String,description:String,
         purchasePrice:String,sellingPrice:String,openingStock:String,taxMethod:String,tax:String!,image:String):Products

         createProduct(
         userId:String!,
         warehouse:String!,
         productName:String!,
         productSlug:String!,
         category:String!,
         brand:String!,
         quantityAlert:String!,
         unit:String!,
         description:String!,
         variants:[VariantInput!]!
         purchasePrice:String!,
         sellingPrice:String!,
         openingStock:String!,
         taxMethod:String!,
         tax:String!,
         image:String!):Products

         deleteProduct1(id:String!):Response

        

    }
    



`