var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenController = {
  sign: async function (info) {
    var token = await jwt.sign(info, JWT_SECRET, { expiresIn: "30d" });
    return token;
  },
  verify: async function (req,res,next) {
    try {
      var token = req.body.token;
      console.log('token控制/token解码/传过来的token：',token)
      var decode = await jwt.verify(token, JWT_SECRET);
      var userInfo = {
          id: decode.user_id,
          name: decode.user_name,
          phone: decode.user_phone,
          password: decode.user_password,
          role: decode.user_role,
          permissions: decode.user_permissions,
      };
      res.json({code:200, data:{user:userInfo}})
    } catch (err) {
      console.error('JWT verification failed:', err);
      return null;
    }
  }
  
};

module.exports = tokenController;
