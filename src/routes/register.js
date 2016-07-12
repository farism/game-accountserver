import Boom from 'boom'
import Joi from 'joi'

import User from '../db/User'

export default {
  method: 'POST',
  path: '/register',
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(20).required(),
        username: Joi.string().min(2).max(20).required(),
      },
    },
  },
  handler: async ({ payload }, reply) => {
    const user = await new User({ email: payload.email }).fetch()

    if (user) {
      return reply(Boom.badRequest('Email already in use'))
    }

    try {
      const newUser = await new User(payload).save()
      const { attributes: { email, password } } = newUser
      reply(`user ${email} with password ${password} saved`)
    } catch (e) {
      return reply(Boom.badImplementation('Invalid request'))
    }
  },
}
