var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports=function(req,res,next){
    res.locals.isLogin = false;
    res.locals.userInfo = {};
    var token = req.cookies.web_token;

    if(token){
        jwt.verify(token, JWT_SECRET, function(err,decode){
            if(!err){
                res.locals.isLogin = true;
                res.locals.userInfo = {
                    id: decode.user_id, 
                    name: decode.user_name, 
                    phone: decode.user_phone, 
                    password: decode.user_password,
                    role: decode.user_role,
                    permissions: decode.user_permissions
                }
                next();
            }else{
                next();
            }
        });
        return;
    }
    next();
}