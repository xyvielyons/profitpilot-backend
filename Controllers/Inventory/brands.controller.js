import BrandsModel from '../../models/InventoryModels/Brands.model.js'
export const InventoryBrandsResolvers = {
    Query:{
        brands:async(obj,args,context)=>{
           
                const getallbrands = await BrandsModel.find({userId:args.userId})
                if(!getallbrands){
                  return new Error("error fetching brands")
                }
                return getallbrands;

            
            
        },

        brand:async(obj,args,context)=>{
      
                const getsinglebrand = await BrandsModel.findById(args.id)
                if(!getsinglebrand){
                    return new Error('error fetching brand')
                }


                return getsinglebrand;
                
         
        }

    },
    Mutation:{
        updateBrand:async(obj,args,context)=>{
                const getbrand = await BrandsModel.find({userId:args.userId,id:args.id})
                if(!getbrand){
                    return new Error("the brand was not found")
                }
            
                const updatebrand = await BrandsModel.findByIdAndUpdate(args.id,{
                    brand:args.brand,
                    image:args.image,
                    description:args.description

                })

                if(!updatebrand){
                  return graphqlErrorHandler('error updating brands')
                }

                const getBrand = await BrandsModel.findById(args.id)
                
                return getBrand

           
          


        },
        createBrand:async(obj,args,context)=>{
           
                const lookforduplicate = await BrandsModel.findOne({brand:args.brand})
                if(lookforduplicate){
                    return new Error('the brand name is a duplicate')

                }

                const createBrand = new BrandsModel({
                    userId:args.userId,
                    brand:args.brand,
                    image:args.image,
                    description:args.description
    
                })
               
                await createBrand.save()
                
                if(!createBrand){
                    return new Error('error creating brand')
                }
    
                return createBrand

        },
        deleteBrand:async(obj,args,context)=>{
            const deleteBrand = await BrandsModel.findByIdAndDelete(args.id)
            
            if(deleteBrand){
                return {
                    status:"Success",
                    message:"brand deleted successfully"
                }
            }
            if(!deleteBrand){
                return new Error("failed to delete brand")
            }
        }

    }
}