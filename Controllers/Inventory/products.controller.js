import ProductsModel from "../../models/InventoryModels/Products.model.js";
import VariationModel from "../../models/InventoryModels/Variation.model.js";

export const InventoryProductsResolvers = {
    Query:{
        products:async(obj,args,context)=>{
           
                const getallproducts = await ProductsModel.find({userId:args.userId}).populate("variants")
                if(!getallproducts){
                  return new Error("error fetching products")
                }
                return getallproducts;

            
            
        },

        product:async(obj,args,context)=>{
      
                const getsingleproduct = await ProductsModel.findById(args.id).populate("variants")
                if(!getsingleproduct){
                    return new Error('error fetching product')
                }


                return getsingleproduct;
                
         
        }

    },
    Mutation:{
       
        createProduct:async(obj,args,context)=>{
                function mapToObjectArray(array) {
                    return array.map(obj => {
                      // Destructuring to get desired properties
                      const { userId, variantName, productCost, productPrice } = obj;
                      // Return a new object with the desired properties
                      return { userId, variantName, productCost, productPrice };
                    });
                  }

              
                 // 1. Process and Validate variants array
                const cleanVariants = mapToObjectArray(args.variants);

                // Perform any additional validation on the cleanVariants array (optional)
                // You can check if all required properties are present, data types are correct, etc.

                // 2. Create Variation Models from the cleanVariants array
                const createdVariations = await Promise.all(
                    cleanVariants.map(async variantData => {
                    const newVariation = new VariationModel(variantData);
                    await newVariation.save();
                    return newVariation; // Return the created variation object
                    })
                );
                


                if(!createdVariations){
                    return new Error('error creating variant')
                }
           

                const createProduct = new ProductsModel({
                    userId:args.userId,
                    warehouse:args.warehouse,
                    productName:args.productName,
                    productSlug:args.productSlug,
                    category:args.category,
                    brand:args.brand,
                    quantityAlert:args.quantityAlert,
                    unit:args.unit,
                    description:args.description,
                    variants:createdVariations,
                    purchasePrice:args.purchasePrice,
                    sellingPrice:args.sellingPrice,
                    openingStock:args.openingStock,
                    taxMethod:args.taxMethod,
                    tax:args.tax,
                    image:args.image
    
                })
               await createProduct.save()
                
                if(!createProduct){
                    return new Error('error creating product')
                }
                
    
                return createProduct


           
            

        },
        updateProduct:async(obj,args,context)=>{
            const getProducts = ProductsModel.find({userId:args.userId})   
            if(!getProducts){
                return new Error('no products by that user')

            }

                const updateProduct = ProductsModel.findByIdAndUpdate(args.id,{
                    warehouse:args.warehouse,
                    productName:args.productName,
                    productSlug:args.productSlug,
                    category:args.category,
                    brand:args.brand,
                    quantityAlert:args.quantityAlert,
                    unit:args.unit,
                    description:args.description,
                    purchasePrice:args.purchasePrice,
                    sellingPrice:args.sellingPrice,
                    openingStock:args.openingStock,
                    taxMethod:args.taxMethod,
                    tax:args.tax,
                    image:args.image
    
                })
            
                
                if(!updateProduct){
                    return new Error('error creating product')
                }
                
    
                return updateProduct


           
            

        },

        deleteProduct1: async(obj,args,context)=>{
            const findProduct = await ProductsModel.findById(args.id).populate("variants")
            const getvariantsarray = findProduct.variants
            const deleteVariants = await Promise.all(
                getvariantsarray.map(async variant => {
                   const res = await VariationModel.findByIdAndDelete(variant._id)
                   return res
                }
            ))
            
            const deleteProducts = await ProductsModel.findByIdAndDelete(args.id)

            if(!deleteProducts){
               
                    return new Error('error deleting product')
               
            }

            return {
                status:"success",
                message:"product deleted successfully"
            }




            
            return findProduct
            


        }

    }
}