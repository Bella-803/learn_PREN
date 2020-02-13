import validator from "../helpers/validator";
import model from "../models";

  const { Users } = model;

class UserMiddleware{
    static async checkSignUp(req,res,next){
        const { fullName,password,email } = req.body;

        if(!validator.isValidEmail(email)){
            return res.status(400).json({ error: "Wrong email, use this format: abc@example.com"});
            
        }
        else if(!validator.isValidPassword(password)){
            return res.status(400).json({ error: "Invalid password"});
        }
        else if(!validator.isValidName(fullName)){
            return res.status(400).json({ error: "Invalid Name"});
        }

        next();

    }
}

export default UserMiddleware;