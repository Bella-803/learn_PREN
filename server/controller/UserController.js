import model from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import processToken from "../helpers/processToken";
dotenv.config();

const {Users} = model;

class UserController {

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns user data response
     */

    static async signUp(req,res){
        
         try {

            const {fullName,password,email} = req.body;

                const user = {
                    fullName,
                    password,
                    email
                };

                const createUser = await Users.create(user);
               
             if (createUser){
 
             createUser.dataValues.password = undefined;
                    /**
                     * user{
                     *     id = createUser.datavalues.id
                     *     email = createUser.datavalues.email
                     * }
                     */
                
                res.status(201).json({
                  user: createUser.dataValues
              });
             }

         } catch (error) {
             res.status(500).send({
                 messsage: 'system error: '+error
             });
         }
       
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns 
     */

    static async login(req,res){
        try {
            const {
                email,
                password
            } = req.body;

            const findUser = await Users.findOne( { where: { email }});

            if(findUser){
                if(bcryptjs.compareSync(password,findUser.dataValues.password)){
                    const payload = {
                        id: findUser.dataValues.id,
                        email: findUser.dataValues.email
                    };
                    //const token = jwt.sign(payload, process.env.SECRET);

                   const token = await processToken.signToken(payload);
                   
                //    const verifyT = await processToken.verifyToken(token);
                //    const info = verifyT;
                //    console.log(info.id);
                    return res.status(200).json({
                        token: token,
                        messsage: 'Logged in successfully'
                    });
                }
                res.status(400).json({
                    error: "Password does not match"
                });
            }

            res.status(404).json({
                error: "email not found"
            });
        } catch (error) {
            res.status(500).send({
                messsage: "System error: "+error
            })
        }
    }
}

    export default UserController;