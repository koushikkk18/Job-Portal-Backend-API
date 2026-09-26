export function allowedRoles(...roles){
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        }
        else{
            res.json("Invalid Role!!!");
        }
    }
}