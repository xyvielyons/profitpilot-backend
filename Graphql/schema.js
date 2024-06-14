import { createSchema } from "graphql-yoga";
import _ from 'lodash';
import { InventoryProductsTypeDef } from "./InventorySchemas/ProductsSchema.js";
import { InventoryProductsResolvers } from "../Controllers/Inventory/products.controller.js";
import { InventoryBrandsResolvers } from "../Controllers/Inventory/brands.controller.js";
import { InventoryBrandTypeDef } from "./InventorySchemas/BrandsSchema.js";
import { InventoryWarehouseResolvers } from "../Controllers/Inventory/warehouses.controller.js";
import { InventoryWarehouseTypeDef } from "./InventorySchemas/WarehousesSchema.js";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { AuthGraphqlResolver } from "../Controllers/Auth/AuthGraphql.js";
import { graphqlAuthTypeDef } from "./GraphQlAuth/graphqlauth.js";
export const schema = createSchema({
    typeDefs:[
        InventoryProductsTypeDef,
        InventoryBrandTypeDef,
        InventoryWarehouseTypeDef,
        graphqlAuthTypeDef
    ],

    resolvers:_.merge(
        InventoryProductsResolvers,
        InventoryBrandsResolvers,
        InventoryWarehouseResolvers,
        AuthGraphqlResolver
    
    )
})