import UnitsModel from "../../models/InventoryModels/Units.model.js";

export const InventoryUnitsResolvers = {
    Query:{
        units:async(obj,args,context)=>{
           
                const getallunits = await UnitsModel.find({userId:args.userId})
                if(!getallunits){
                  return new Error("error fetching units")
                }
                return getallunits;

            
            
        },

        unit:async(obj,args,context)=>{
      
                const getsingleunit = await UnitsModel.findById(args.id)
                if(!getsingleunit){
                    return new Error('error fetching unit')
                }


                return getsingleunit;
                
         
        }

    },
    Mutation:{
        updateUnit:async(obj,args,context)=>{
                const getUnit = await UnitsModel.find({id:args.id,userId:args.userId})
                if(!getUnit){
                    return new Error("the unit was not found")
                }
            
                const updateunit = await UnitsModel.findByIdAndUpdate(args.id,{
                    unit:args.unit,
                    shortName:args.shortName,
                    baseUnit:args.baseUnit,
                    operator:args.operator,
                    operatorValue:args.operatorValue
                    
                })
                if(!updateunit){
                  return new Error('error updating unit')
                }

                const getUpdatedUnit = await UnitsModel.findById(args.id)
                
                return getUpdatedUnit

           
          


        },
        createUnit:async(obj,args,context)=>{
           
                

                const createUnit = new UnitsModel({
                    userId:args.userId,
                    unit:args.unit,
                    shortName:args.shortName,
                    baseUnit:args.baseUnit,
                    operator:args.operator,
                    operatorValue:args.operatorValue
    
                })
               
                await createUnit.save()
                
                if(!createUnit){
                    return new Error('error creating unit')
                }
    
                return createUnit


           
            

        },
        deleteUnit:async(obj,args,context)=>{
            const deleteUnit = await UnitsModel.findByIdAndDelete(args.id)
            
            if(deleteUnit){
                return {
                    status:"Success",
                    message:"unit deleted successfully"
                }
            }
            if(!deleteUnit){
                return new Error("failed to delete unit")
            }
        }

    }
}