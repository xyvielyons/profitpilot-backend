import CategoriesModel from "../../models/InventoryModels/Categories.model.js";

export const InventoryCategoryResolvers = {
    Query:{
        categories:async(obj,args,context)=>{
           
                const getallcategories = await CategoriesModel.find({userId:args.userId})
                if(!getallcategories){
                  return new Error("error fetching categories")
                }
                return getallcategories;

            
            
        },

        category:async(obj,args,context)=>{
      
                const getsinglecategory = await CategoriesModel.findById(args.id)
                if(!getsinglecategory){
                    return new Error('error fetching caregory')
                }


                return getsinglecategory;
                
         
        }

    },
    Mutation:{
        updateCategory:async(obj,args,context)=>{
                const getCategory = await CategoriesModel.find({id:args.id,userId:args.userId})
                if(!getCategory){
                    return new Error("the category was not found")
                }
            
                const updatecategory = await CategoriesModel.findByIdAndUpdate(args.id,{
                    category:args.category,
                    description:args.description,
                    
                })
                if(!updatecategory){
                  return new Error('error updating categories')
                }

                const getUpdatedCategory = await CategoriesModel.findById(args.id)
                
                return getUpdatedCategory

           
          


        },
        createCategory:async(obj,args,context)=>{
           
                

                const createCategory = new CategoriesModel({
                    userId:args.userId,
                    category:args.category,
                    description:args.description
    
                })
               
                await createCategory.save()
                
                if(!createCategory){
                    return new Error('error creating category')
                }
    
                return createCategory


           
            

        },
        deleteCategory:async(obj,args,context)=>{
            const deleteCategory = await CategoriesModel.findByIdAndDelete(args.id)
            console.log(args)
            console.log(deleteCategory)
            if(deleteCategory){
                return {
                    status:"Success",
                    message:"Category deleted successfully"
                }
            }
            if(!deleteCategory){
                return new Error("failed to delete category")
            }

        }

    }
}