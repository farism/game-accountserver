import Hapi from 'hapi'

import routes from './routes'

const webServer = new Hapi.Server()

webServer.connection({ host: 'localhost', port: 8080 })

webServer.route(routes)

webServer.start((err) => {
  if (err) {
    throw err
  }

  console.log('Server running at:', webServer.info.uri)
})
