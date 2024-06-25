import ProductsModel from "../../models/InventoryModels/Products.model.js";

export const InventoryProductsResolvers = {
    Query:{
        products:async(obj,args,context)=>{
           
                const getallproducts = await ProductsModel.find({userId:args.userId})
                if(!getallproducts){
                  return new Error("error fetching products")
                }
                return getallproducts;

            
            
        },

        product:async(obj,args,context)=>{
      
                const getsingleproduct = await ProductsModel.findById(args.id)
                if(!getsingleproduct){
                    return new Error('error fetching product')
                }


                return getsingleproduct;
                
         
        }

    },
    Mutation:{
        updateProduct:async(obj,args,context)=>{
                const getProduct= await ProductsModel.find({id:args.id,userId:args.userId})

                if(!getProduct){
                    return new Error("the product was not found")
                }
            
                const updateproduct = await ProductsModel.findByIdAndUpdate(args.id,{
                    product:args.product,
                    image:args.image,
                    type:args.type,
                    category:args.category,
                    brand:args.brand,
                    salePrice:args.salePrice,
                    purchasePrice:args.purchasePrice,
                    stockUnit:args.stockUnit,
                    warehouse:args.warehouse

                })
                if(!updateproduct){
                  return new Error('error updating products')
                }

                const getUpdatedProduct = await ProductsModel.findById(args.id)
                
                return getUpdatedProduct

           
          


        },
        createProduct:async(obj,args,context)=>{
           

                const createProduct = new ProductsModel({
                    userId:args.userId,
                    product:args.product,
                    image:args.image,
                    type:args.type,
                    category:args.category,
                    brand:args.brand,
                    salePrice:args.salePrice,
                    purchasePrice:args.purchasePrice,
                    stockUnit:args.stockUnit,
                    warehouse:args.warehouse
    
                })
               
                await createProduct.save()
                
                if(!createProduct){
                    return new Error('error creating product')
                }
    
                return createProduct


           
            

        }

    }
}