const UserModel = require('../models/user');
const User = new UserModel();
const urp = require('../middlewares/user_role_permission');
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = {
    phoneLogin: async function (req, res, next) {
        let phone = req.body.phone;

        if (!phone) {
            res.json({ code: 0, data: 'params empty!' })
            return
        }

        try {
            let userArr = await User.select({ phone })
            let user = userArr[0];
            // console.log('登陆控制/user：',user)
            if (user) {
                var rpData = await urp.getRPData(user.id);
                var roleID = rpData.role_id;
                var roleName = rpData.role_name;
                var permissionsID = rpData.permissions_id;
                var permissionsName = rpData.permissions_name;
                console.log('login文件：','roleID:',roleID, 'roleName：',roleName ,'permissionsid:',permissionsID,'permissionsName:',permissionsName,)
                var token = jwt.sign({ user_id: user.id, user_name: user.name, user_phone: user.phone, user_password: user.password, user_role: roleName, user_permissions: permissionsName},JWT_SECRET,{ expiresIn: "30d" })
                console.log('登陆控制/token：',token)
                res.json({data: { code: 200, token: token, msg: '登陆成功' } })
            } else {
                res.json({data: { code: 0, msg: '没有此用户' } })
            }
        } catch (e) {
            console.log(e,e.message)
            res.json({ code: 0, data: {code: 200, msg: e.message} })
        }
    },

    accountLogin: async function (req, res, next) {
        let phone = req.body.phone;
        let password = req.body.password

        if (!phone || !password) {
            res.json({ data: {code: 0, msg: 'params empty!'} })
            return
        }

        try {
            let userArr = await User.select({ phone,password })
            let user = userArr[0];
            // console.log('登陆控制/user：',user)
            if (user) {
                var rpData = await urp.getRPData(user.id);
                var roleID = rpData.role_id;
                var roleName = rpData.role_name;
                var permissionsID = rpData.permissions_id;
                var permissionsName = rpData.permissions_name;
                console.log('login文件：','roleID:',roleID, 'roleName：',roleName ,'permissionsid:',permissionsID,'permissionsName:',permissionsName,)
                var token = jwt.sign({ user_id: user.id, user_name: user.name, user_phone: user.phone, user_password: user.password, user_role: roleName, user_permissions: permissionsName},JWT_SECRET,{ expiresIn: "30d" })
                console.log('登陆控制/token：',token)
                res.json({data: { code: 200, token: token, msg: '登陆成功' } })
            } else {
                res.json({data: { code: 0, msg: '没有此用户' } })
            }
        } catch (e) {
            console.log(e,e.message)
            res.json({data: {code: 0, msg: e.message} })
        }
    },

    logout: function (req, res, next) {
        res.clearCookie('web_token');
        res.redirect('/login'); 
    }
}

module.exports = login;