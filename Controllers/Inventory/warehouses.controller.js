import WarehousesModel from '../../models/InventoryModels/Warehouses.model.js'
import { graphqlErrorHandler } from '../../utils/GraphqlErrorHandling.js'
export const InventoryWarehouseResolvers = {
    Query:{
        warehouses:async(obj,args,context)=>{
           
                const getallwarehouses = await WarehousesModel.find({userId:args.userid})
                if(!getallwarehouses){
                  return graphqlErrorHandler("error fetching warehouses","Internal server error",500)
                }
                return getallwarehouses;

            
            
        },

        warehouse:async(obj,args,context)=>{
      
                const getsinglewarehouse = await WarehousesModel.findById(args.id)
                if(!getsinglewarehouse){
                    return graphqlErrorHandler('error fetching warehouse',"Internal server error",500)
                }


                return getsinglewarehouse;
                
         
        }

    },
    Mutation:{
        updateWarehouse:async(obj,args,context)=>{
                const getWarehouse = await WarehousesModel.find({id:args.id,userId:args.userid})
                if(!getWarehouse){
                    return graphqlErrorHandler("the warehouse was not found","internal server error",404)
                }
            
                const updatewarehouse = await WarehousesModel.findByIdAndUpdate(args.id,{
                    warehouse:args.warehouse,
                    phone:args.phone,
                    country:args.country,
                    city:args.city,
                    email:args.email,
                    zipCode:args.zipCode

                })
                if(!updatewarehouse){
                  return graphqlErrorHandler('error updating warehouses','internal server error',500)
                }

                const getUpdatedWarehouse = await WarehousesModel.findById(args.id)
                
                return getUpdatedWarehouse

           
          


        },
        createWarehouse:async(obj,args,context)=>{
           
                const lookforduplicate = await WarehousesModel.findOne({warehouse:args.warehouse})
                if(lookforduplicate){
                    return graphqlErrorHandler('the warehouse name has already been used',"Internal server error",406)

                }

                const createWarehouse = new WarehousesModel({
                    userId:args.userId,
                    warehouse:args.warehouse,
                    phone:args.phone,
                    country:args.country,
                    city:args.city,
                    email:args.email,
                    zipCode:args.zipCode
    
                })
               
                await createWarehouse.save()
                
                if(!createWarehouse){
                    return graphqlErrorHandler('error creating warehouse',"Internal server error",500)
                }
    
                return createWarehouse


           
            

        }

    }
}