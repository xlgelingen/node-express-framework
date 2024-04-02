const ClueModel = require("../models/clue");
const Clue = new ClueModel();
const moment = require("moment");
const urp = require('../middlewares/user_role_permission');

const clue = {
  index: async function (req, res, next) {
    const userId = req.body.userId;
    const userName = req.body.userName;
    console.log('线索管理，userId:',userId)
    console.log('线索管理，userName:',userName)

    const rpData = await urp.getRPData(userId);
    const role = rpData.role_id;
    var sale_name = userName

    var clues = null;
    if (role == 1) {
      clues = await Clue.all();
    } else if (role == 2) {
      clues = await Clue.select({ sale_name });
    }
    try {
      const cluesInfo = clues.map((data) => {
        switch (data.status) {
          case 1:
            data.statusName = "没有意向";
            break;
          case 2:
            data.statusName = "意向一般";
            break;
          case 3:
            data.statusName = "意向强烈";
            break;
          case 4:
            data.statusName = "完成销售";
            break;
          case 5:
            data.statusName = "取消销售";
            break;
        }
        data.create_time = moment(data.create_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return data;
      });
      res.json({ code: 200, data: {code:200, cluesInfo}});
    } catch (e) {
      res.json({ code: 0, data:{code: 0, msg: e.message} });
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let utm = req.body.utm;
    if (!name || !phone || !utm) {
      res.json({ code: 0, data: {code: 0, msg:"params empty!"} });
      return;
    }
    try {
      const clue = await Clue.insert({ name, phone, utm });
      res.json({ code: 200, data: {code: 200, clue:clue} });
    } catch (e) {
      res.json({ code: 0, data:{code: 0, msg: e.message} });
    }
  },

  renderEdit: async function (req, res, next) {
    try {
      var id = req.body.id;
      // console.log("角色控制/renderEdit/id：", id);

      const roleArr = await Role.select({ id });
      const role = roleArr[0];
      // console.log("角色控制/renderEdit/role：", role);

      var pData = await urp.getPData(id);
      var permissionsId = pData.permissions_id;
      // console.log("角色控制/renderEdit/permissionsId：", permissionsId);

      const roleInfo = { ...role, permissions: permissionsId };
      // console.log("角色控制/renderEdit/roleInfo：", roleInfo);

      res.json({ code: 200, data: { code: 200, roleInfo: roleInfo } });
    } catch (e) {
      res.json({ code: 0, data: { code: 0, e } });
    }
  },

  update: async function (req, res, next) {
    let sale_name = req.body.sale_name;
    let status = req.body.status;
    let remark = req.body.remark;
    let id = req.body.id;
    if (!sale_name || !status || !remark || !id) {
      res.json({ code: 0, data: {code: 0, msg:"params empty!"} });
      return;
    }
    try {
      const log = await Clue.update(id, { sale_name, status, remark });
      res.json({ code: 200, data: {code: 200, log} });
      console.log(log);
    } catch (e) {
      res.json({ code: 0, data: {code: 200, e} });
    }
  },
};

module.exports = clue;
