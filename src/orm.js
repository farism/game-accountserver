import knex from 'knex'
import bookshelf from 'bookshelf'

const { PG_HOST, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env

let orm = null

export default () => {
  if (!orm) {
    const client = knex({
      client: 'pg',
      connection: {
        host: PG_HOST,
        user: PG_USERNAME,
        password: PG_PASSWORD,
        database: PG_DATABASE,
      },
    })

    client.on('query', (data) => {
      console.log(data.sql)
    })

    orm = bookshelf(client)
  }

  return orm
}
