const moment = require("moment");
const UserModel = require("../models/user");
const User = new UserModel();
const userRoleModel = require("../models/user_role.js");
const userRole = new userRoleModel();
// const urp = require("../middlewares/user_role_permission");
// var jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

const user = {
  index: async function (req, res, next) {
    var users = await User.all();
    try {
      var usersInfo = users.map((data) => {
        data.create_time = moment(data.create_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return data;
      });
      // console.log("userContrl：", usersInfo);
      res.json({ code: 200, data: { usersInfo: usersInfo } });
    } catch (e) {
      res.locals.error = e;
      res.json({ code: 0, data: e });
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let role = req.body.role;
    // console.log(name, phone, password, role);
    if (!name || !phone || !password || !role) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      const user = await User.insert({ name, phone, password });
      const userId = user[0];
      await userRole.insert({
        user_id: userId,
        role_id: role,
      });
      res.json({
        code: 200,
        data: { code: 200, id: userId },
        message: "创建成功",
      });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e } });
    }
  },
  renderEdit: async function (req, res, next) {
    try {
      var id = req.body.id;
      // console.log("用户控制/renderEdit/id：", id);
      const userArr = await User.select({ id });
      const user = userArr[0];
      // console.log("用户控制/renderEdit/user：", user);
      const role = await userRole.select({ user_id: id });
      var roleID = role[0].role_id;
      // console.log("用户控制/renderEdit/roleID：", roleID);
      const userInfo = { ...user, role: `${roleID}`};
      console.log("用户控制/renderEdit/userInfo：", userInfo);
      res.json({ code: 200, data: { code: 200, userInfo: userInfo } });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e } });
    }
  },
  update: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let roleID = req.body.role;
    let id = req.body.id;
    if (!name || !phone || !password || !roleID || !id) {
      res.json({ code: 0, data: "params empty!" });
      return;
    }
    try {
      await User.update(id, { name, phone, password });
      await userRole.where({ user_id: id }).update({ role_id: roleID });
      res.json({
        code: 200,
        data: { code: 200, message: "编辑成功"},
      });
    } catch (e) {
      console.log(e.message);
      res.json({ code: 0, data: e.message || e.errors });
    }
  },

  delete: async function (req, res, next) {
  },
};

module.exports = user;
