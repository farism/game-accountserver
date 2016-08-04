import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'

import routes from './routes'

const { SERVER_HOST, SERVER_ADDRESS, SERVER_PORT } = process.env

const plugins = [
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: {
      info: {
        title: 'Test API Documentation',
        version: '1',
      },
    },
  },
]

const server = new Hapi.Server()

server.connection({
  host: SERVER_HOST,
  address: SERVER_ADDRESS,
  port: SERVER_PORT,
})

server.route(routes)

const start = async () => {
  try {
    await server.register(plugins)
  } catch (e) {
    console.error('could not register plugins: ', e)
  }

  try {
    await server.start()
    console.log('Server running at:', server.info.uri)
  } catch (e) {
    console.error('could not start server: ', e)
  }
}

start()
