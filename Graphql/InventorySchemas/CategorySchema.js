export const InventoryCategoryTypeDef = /* GraphQL */`
    type Category{
        id:ID!
        userId:String!
        category:String!
        description:String!
    }
    type Response {
        status:String!
        message:String!
    }
    type Query {
        categories(userId:String!):[Category]
        category(id:String!):Category
    }
    type Mutation{
        updateCategory(id:String!,userId:String!,category:String,description:String):Category
        createCategory(userId:String!,category:String,description:String):Category
        deleteCategory(id:String!):Response
    }


`