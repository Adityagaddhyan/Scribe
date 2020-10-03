const bcrypt=require("bcrypt");
const saltRounds=20000;

genPassword=(password)=>{
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(password,salt,(err,hash)=>{
            return{
                salt:salt,
                hash:hash
            }
        })
    });
}

module.exports.genPassword=this.genPassword;