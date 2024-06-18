import WarehousesModel from '../../models/InventoryModels/Warehouses.model.js'

export const InventoryWarehouseResolvers = {
    Query:{
        warehouses:async(obj,args,context)=>{
           
                const getallwarehouses = await WarehousesModel.find({userId:args.userid})
                if(!getallwarehouses){
                  return new Error("error fetching warehouse")
                }
                return getallwarehouses;

            
            
        },

        warehouse:async(obj,args,context)=>{
      
                const getsinglewarehouse = await WarehousesModel.findById(args.id)
                if(!getsinglewarehouse){
                    return new Error('error fetching warehouse')
                }


                return getsinglewarehouse;
                
         
        }

    },
    Mutation:{
        updateWarehouse:async(obj,args,context)=>{
                const getWarehouse = await WarehousesModel.find({id:args.id,userId:args.userid})
                if(!getWarehouse){
                    return new Error("the warehouse was not found")
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
                  return new Error('error updating warehouses')
                }

                const getUpdatedWarehouse = await WarehousesModel.findById(args.id)
                
                return getUpdatedWarehouse

           
          


        },
        createWarehouse:async(obj,args,context)=>{
           
                const lookforduplicate = await WarehousesModel.findOne({warehouse:args.warehouse})
                if(lookforduplicate){
                    return new Error('the warehouse name has already been used')

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
                    return new Error('error creating warehouse')
                }
    
                return createWarehouse


           
            

        }

    }
}