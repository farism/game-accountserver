require('dotenv').config()

const { PG_HOST, PG_PASSWORD, PG_USERNAME, PG_DATABASE } = process.env

const connection = {
  host: PG_HOST,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
}

module.exports = {

  development: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

}
