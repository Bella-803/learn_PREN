import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class processToken{

    static async signToken(payload){
        const token = jwt.sign(payload, process.env.SECRET);
        return token;
    }
    static async verifyToken(token){
        const verifiedToken = jwt.verify(token, process.env.SECRET)
        return verifiedToken;
    }
}
export default processToken;