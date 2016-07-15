import Boom from 'boom'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import User from '../db/User'

export default {
  method: 'POST',
  path: '/register',
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(20).required(),
        passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
        username: Joi.string().min(2).max(20).required(),
      },
    },
  },
  handler: async ({ payload: { email, password, username } }, reply) => {
    const user = await new User({ email }).fetch()

    if (user) {
      return reply(Boom.badRequest('Email already in use'))
    }

    try {
      const passwordHashed = bcrypt.hashSync(password, 10)

      await new User({ email, password: passwordHashed, username }).save()

      return reply(`user ${email} with password ${passwordHashed} saved`)
    } catch (e) {
      console.error(e)
      return reply(Boom.badImplementation('Invalid request'))
    }
  },
}
