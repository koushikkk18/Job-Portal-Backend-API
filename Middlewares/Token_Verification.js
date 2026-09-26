import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
    const accessToken = req.cookies.accessToken; 
    if(accessToken===undefined){ {  
        res.json({ message: "Please login" });
    }

}
    else{
        try{
            let decodedToken=jwt.verify(accessToken, "abcdef"); // Verify the token using the secret key
            req.user=decodedToken;
            next();
        }
        catch(err){
            res.json({ message: "Invalid Token" });
        }
    }
}