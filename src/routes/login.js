import Boom from 'boom'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import User from '../models/User'

export default {
  method: 'POST',
  path: '/login',
  config: {
    tags: ['api'],
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(20).required(),
      },
    },
  },
  handler: async ({ payload: { email, password } }, reply) => {
    const user = await new User({ email }).fetch()

    console.log(user)

    if (user) {
      if (bcrypt.compareSync(password, user.attributes.password)) {
        const { id, username } = user.attributes
        const session = v4()

        return reply({
          id,
          username,
          session,
        })
      }
    }

    return reply(Boom.unauthorized('Invalid email or password'))
  },
}
