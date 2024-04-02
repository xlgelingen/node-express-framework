const config = require("./../knexfile.js");
const knex = require("knex")(config);

class Base {
  constructor(props) {
    this.table = props;
  }

  all() {
    return knex(this.table).select();
  }

  select(params) {
    return knex(this.table).select().where(params);
  }

  insert(params) {
    return knex(this.table).insert(params);
  }

  update(id, params) {
    return knex(this.table).where("id", "=", id).update(params);
  }

  delete(params) {
    return knex(this.table).where(params).del();
  }

  delPermission(params) {
    // const permissionIds = params.map(data => data.permission_id);
    // return knex(this.table).whereIn({permission_id: permissionIds}).andWhere({role_id: params[0].role_id}).del()
    const permissionIds = params.map((data) => data.permission_id);
    const roleId = params[0].role_id;
    return knex(this.table)
      .whereIn("permission_id", permissionIds)
      .andWhere("role_id", roleId)
      .del();
  }

  where(params) {
    return knex(this.table).where(params);
  }

  pagination(drift, size) {
    return knex(this.table).select().limit(size).offset(drift);
  }
}

module.exports = Base;
