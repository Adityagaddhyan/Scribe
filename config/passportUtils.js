const bcrypt=require("bcrypt");
const { Passport } = require("passport");
const saltRounds=12;

const genPassword = function(password){
    return bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log(hash);
        return hash;
    });
}
module.exports=exports=genPassword;

