exports.up = function (knex) {
  return (
    knex.schema
      // 用户
      .createTable('users', function (table) {
        table.increments('id');
        table.string('name', 255);
        table.string('phone', 255);
        table.string('password', 255);
        table.timestamp('create_time').defaultTo(knex.fn.now());
      })
      // 角色
      .createTable('roles', function (table) {
        table.increments('id');
        table.string('name', 255).unique();
        table.string('slug', 255);
        table.string('describe', 255);
        table.timestamp('create_time').defaultTo(knex.fn.now());
      })
      .createTable('user_role', function (table) {
        table.integer('user_id', 11)
        table.integer('role_id', 11)
      })
      // 权限
      .createTable('permissions', function (table) {
        table.increments('id');
        // table.integer('group_id')
        table.string('slug').unique();
        table.string('name', 255).unique();
        table.timestamp('create_time').defaultTo(knex.fn.now());
      })
      .createTable('role_permission', function (table) {
        table.integer('role_id', 11)
        table.integer('permission_id', 11)
      })
      //线索
      .createTable('clues', function (table) {
        table.increments('id');
        table.string('name', 255);
        table.string('phone', 255);
        table.string('utm', 255);
        table.timestamp('create_time').defaultTo(knex.fn.now());
        table.string('sale_name', 255);
        table.integer('status', 11);
        table.string('remark', 255);
      })
      .createTable('clue_log', function (table) {
        table.increments('id');
        table.integer('clue_id', 11);
        table.timestamp('create_time').defaultTo(knex.fn.now());
        table.string('content', 255);
      })
  );
};


exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("roles")
    .dropTable("user_role")
    .dropTable("permissions")
    .dropTable("role_permission")
    .dropTable("clues")
    .dropTable("clue_log");
};

exports.config = { transaction: false };
