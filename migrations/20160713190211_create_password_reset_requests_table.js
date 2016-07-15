exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('password_reset_requests', table => {
    table.increments('id')
    table.string('user_id')
    table.string('reset_code')
    table.timestamps()
  }),
])

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('password_reset_requests'),
])
