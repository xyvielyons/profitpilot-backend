import VariationModel from "../../models/InventoryModels/Variation.model.js";

export const InventoryVariantsResolvers = {
    Query:{
        variants:async(obj,args,context)=>{
           
                const getallvariants = await VariationModel.find({userId:args.userId})
                if(!getallvariants){
                  return new Error("error fetching variants")
                }
                return getallvariants;

            
            
        },

        variant:async(obj,args,context)=>{
      
                const getvariant = await VariationModel.findById(args.id)
                if(!getvariant){
                    return new Error('error fetching variant')
                }


                return getvariant;
                
         
        }

    },
    Mutation:{
        createVariant:async(obj,args,context)=>{
           
                

                const createVariant = new UnitsModel({
                    userId:args.userId,
                    name:args.name,
                    values:args.values
    
                })
               
                await createVariant.save()
                
                if(!createVariant){
                    return new Error('error creating variant')
                }
    
                return createVariant


           
            

        }

    }
}