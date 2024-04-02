const PermissionModel = require("./../models/permissions.js");
const Permission = new PermissionModel();
const urp = require('../middlewares/user_role_permission');

const permissionlController = {
  index: async function (req, res, next) {
    try {
      const permissions = await Permission.all();
      res.json({ code: 200, data: { code: 200, permissions: permissions } });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e: e.message } });
    }
  },
  select: async function (req, res, next) {
    try {
      const userId = req.body.userId;
      console.log('被调用了，userId:',userId)
      var rpData = await urp.getRPData(userId);
      var permissions = rpData.permissions_name;
      console.log('权限控制/登录用户权限：',permissions)
      res.json({ code: 200, data: { code: 200, permissions: permissions } });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e: e.message } });
    }
  },
};

module.exports = permissionlController;
