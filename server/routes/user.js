import express from "express";
import userController from "../controller/UserController";
import businessController from "../controller/businessController";
import productController from "../controller/productController";
import processToken from "../helpers/processToken";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup",userController.signUp);
router.post("/login",userController.login);

router.post("/createBusiness/:userId",businessController.createBusiness);
router.get("/allBusiness",businessController.findAllBusiness);
router.get("/findBusiness/:id",businessController.findBusinessById);
router.put("/modifyBus/:businessId",businessController.modifyBusiness);
router.delete("/deleteBus/:businessId",businessController.deleteBus);

router.post("/product/:businessId",productController.createProduct);
router.get("/allProducts",productController.allProduct);
router.get("/product/:productId",productController.findProductById);
router.put("/product/:productId",productController.modifyProduct);
router.delete("/product/:productId",productController.deleteProduct);

router.post("/registerB",businessController.registerBusiness);
router.get("/me",(req, res) => {
    
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ message: "no token found" });
    }

     const ver = jwt.verify(token,process.env.SECRET);
    //const ver = processToken.verifyToken(token);
    const info = ver;
    // const u = info.user.Id;
     console.log(info.id);
    return res.status(200).send({
        info
    })

    // jwt.verify(token,process.env.SECRET,(err,decoded) =>{
    //     if(err) return res.status(500).send({ auth: false, message: 'no token found'});

    //     res.status(200).send(decoded);
    // });
    
});


export default router;
