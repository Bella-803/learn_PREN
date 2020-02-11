import model from "../models";

const { Products } = model;
const { Businesses} = model;

class ProductController{
   
    static async createProduct(req,res){
        
        try {
            const { productName,price,category } = req.body;
            const { businessId } = req.params;

            const product = {
                businessId,
                productName,
                price,
                category
            }

            const findBusiness = await Businesses.findOne({
                where: {
                    id : businessId
                }
            });

            if(!findBusiness){
                return res.status(404).json({
                    message: "Business selected does not exist"
                })
            }

            const prod = await Products.create(product);
            if(prod){
                res.status(200).json({
                    message: "Product successfully created",
                    prod
                })
            }
            else{
                res.status(404).json({
                    message: " Error "
                })
            }

        } catch (error) {
            res.status(500).json({
                message: "System error : "+error
            })
        }
    }

    static async allProduct(req,res){

            return Products
            .findAll()
            .then(prods => {
                res.status(200).send( prods )
            })
       
    }

    static async modifyProduct(req,res){
        try {
           const { productName,price,category } = req.body;
           return Products
           .findByPk(req.params.productId)
           .then(prod => {
               prod.update({
                   productName: productName || prod.productName,
                   price: price || prod.price,
                   category: category || prod.category
               })
               .then(updatedProduct => {
                   res.status(200).json({
                       message: "Product updated successfully",
                       updatedProduct
                   })
               })
               .catch(error => res.status(404).json({ error: "could not update" }))
           })
           .catch(error => res.status(404).send({ message: "product not found" }))

            
        } catch (error) {
           res.status(404).send({
               message: "System error : "+error
           }) 
        }
    }

    static async deleteProduct(req,res){
        try {
            
            return Products
            .findByPk(req.params.productId)
            .then(prod => {
                prod.destroy()
                .then(() => res.status(200).json({ message: "Product deleted successfully "}))
                .catch(error => res.status(404).json({message: "Could not delete product "}))
            })
            .catch(error => res.status(404).json({ message: " Product not found " }))
        } catch (error) {
            res.status(500).json({
                message: "System Error : "+error
            })
        }
    }

    static async findProductById(req,res){
        try {
            return Products
            .findByPk(req.params.productId)
            .then(prod => res.status(200).json( prod ))
            .catch(error => res.status(500).json({ message: "Error occured : "+error }))
        } catch (error) {
           res.status(500).json({ message: "System Error: "+error }) 
        }
    }
}

    export default ProductController;