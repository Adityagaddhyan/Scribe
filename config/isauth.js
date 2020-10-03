module.exports.isauth=  (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).json({msg:"unauthorized"});
    }
}
module.exports.isadmin=(req,res,next)=>{
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}