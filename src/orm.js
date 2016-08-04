import knex from 'knex'
import bookshelf from 'bookshelf'

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env

let orm = null

export default () => {
  if (!orm) {
    const client = knex({
      client: 'pg',
      connection: {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
      },
    })

    client.on('query', (data) => {
      console.log(data.sql)
    })

    orm = bookshelf(client)
  }

  return orm
}
