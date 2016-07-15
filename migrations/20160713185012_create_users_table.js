exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', table => {
    table.increments('id')
    table.string('username')
    table.string('email')
    table.string('password')
    table.boolean('deleted')
    table.timestamps()
  }),
])

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
])
