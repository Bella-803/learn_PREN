import model from "../models";
import processToken from "../helpers/processToken";
import jwt from "jsonwebtoken";

const { Businesses } = model;
const { Users } = model;

  class businessController{

    static async createBusiness(req,res){

        try {
           
            const { name } = req.body;
            const { userId } = req.params;

            const business = {
                name,
                userId
            };


            const findUser = await Users.findOne( { where: { id : userId }});

            if(findUser){
                const createBus = await Businesses.create(business);

                if(createBus){
                    res.status(201).json({
                        message: "Business created successfully",
                        business: createBus.dataValues
                    });
                }
            }
            else{
                res.status(404).json({
                    error: "User not found"
                })
            }

        } catch (error) {
            res.status(500).send({
                message: "System error: "+error
            })
        }
        

    }

    static async findAllBusiness(req,res){

        return Businesses
        .findAll()
        .then(bus => {
            res.status(200).send( bus )
           
        })
        

    }

    static async findBusinessById(req,res){

        try {
            const findBus = await Businesses.findByPk(req.params.id);

            if(findBus){
                res.status(200).json({
                    bus: findBus.dataValues
                })
            }
            else{
                res.status(404).json({
                    message: "Business not found"
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "System Error : "+error
            })
        }
    }

    static async modifyBusiness(req,res){
        try {
            
            const { name } = req.body;
            return Businesses
            .findByPk(req.params.businessId)
            .then(busi => {
                busi.update({
                    name: name || busi.name
                })
                .then((updatedBusiness) => {
                    res.status(200).send({
                        message: "Business updated successfully",
                        date: {
                            name: name || updatedBusiness.name
                        }
                    })
                })
                .catch(erro => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));

        } catch (error) {
            res.status(500).send({
                message: "error "+error
            })
        }
    }

    static async deleteBus(req,res){
       
        try {
           return Businesses
           .findByPk(req.params.businessId)
           .then(busi => {
               if(!busi){
                   return res.status(404).send({
                       message: "Business not found"
                   })
               }
               return busi
               .destroy()
               .then(() => {
                   res.status(200).send({
                       message: "Business deleted successfully"
                   })
               })
               .catch(error => res.status(400).send(error))

           })
           .catch(error => res.status(400).send(error)) 
        } catch (error) {
            res.status(500).send({
                message: "System error "+error
            })
        }
       
        
    }

    static async registerBusiness(req,res){
        try {
            
            const token = req.headers['x-access-token'];
              if(!token) return res.status(404).send({message: "no token found"})

            const verifyT = jwt.verify(token, process.env.SECRET);
            const userId = verifyT.id;
            // console.log(userId);

            const { name } = req.body;
            const busi = {
                name,
                userId
            }
            const createBus = await Businesses.create(busi);
            if(createBus){
                res.status(201).json({
                    message: "Business created successfully",
                    business: createBus.dataValues
                });
            }
            else{
                return res.status(404).send(error)
            }

            // res.status(200).send({
            //     verifyT
            // })
        } catch (error) {
            res.status(500).send({
                message: "error : "+error
            })
        }
    }

  }

    export default businessController;