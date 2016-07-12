import Boom from 'boom'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import User from '../db/User'

export default {
  method: 'POST',
  path: '/login',
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(20).required(),
      },
    },
  },
  handler: async ({ payload: { email, password } }, reply) => {
    const user = await new User({ email }).fetch()

    if (user) {
      if (bcrypt.compareSync(password, user.attributes.password)) {
        return reply('Login Successful!')
      }
    }

    return reply(Boom.unauthorized('Bad email or password'))
  },
}
