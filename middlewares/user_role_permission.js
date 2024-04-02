const RoleModel = require("../models/roles.js");
const Role = new RoleModel();
const userRoleModel = require("../models/user_role.js");
const userRole = new userRoleModel();
const rolePermissionModel = require("../models/role_permission.js");
const rolePermission = new rolePermissionModel();
const permissionModel = require("../models/permissions.js");
const permission = new permissionModel();

const urp = {
  getRPData: async function (user_id) {
    const role = await userRole.select({ user_id: user_id });
    // console.log('role-user:',role)
    var roleID = role[0].role_id;
    var roleArr = await Role.select({ id: roleID });
    var roleName = roleArr[0].slug;
    // console.log('roleid:',roleID)
    const permissions = await rolePermission.select({ role_id: roleID });
    console.log('urp的选择permissions：',permissions)
    var permissionsID = permissions.map((data) => data.permission_id);
    var permissionsNamePromises = permissionsID.map(async function (data) {
      dataItem = await permission.select({ id: data });
      return dataItem[0].slug;
    });
    
    // 使用 Promise.all 等待所有异步操作完成，并获取结果
    var permissionsName = await Promise.all(permissionsNamePromises);
    console.log('urp文件permissionsName:',permissionsName)
    return {
      role_id: roleID,
      role_name: roleName,
      permissions_id: permissionsID,
      permissions_name: permissionsName
    };
  },

  getPData: async function (role_id) {
    var roleID = role_id;
    const permissions = await rolePermission.select({ role_id: roleID });
    var permissionsID = permissions.map((data) => data.permission_id);
    return {
      permissions_id: permissionsID,
    };
  },
};

module.exports = urp;