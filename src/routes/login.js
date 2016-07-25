import Boom from 'boom'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import User from '../models/User'

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
        return reply({
          id: user.attributes.id,
          username: user.attributes.username,
        })
      }
    }

    return reply(Boom.unauthorized('Invalid email or password'))
  },
}
