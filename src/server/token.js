import jwt from 'jsonwebtoken';


const generateToken = async (user) => {
    try{
        const {email, role}= user;
        const token = await jwt.sign({email, role}, "secret");
        return token;
    }catch(error){
        console.log(error);
        console.log("token generation failed");
    }
};

export default generateToken;