import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'

import routes from './routes'

const { PORT } = process.env

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

server.connection({ port: PORT })

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
