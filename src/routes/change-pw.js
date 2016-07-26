import Boom from 'boom'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import User from '../models/User'

export default {
  method: 'POST',
  path: '/change-pw',
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        oldPassword: Joi.string().min(2).max(20).required(),
        newPassword: Joi.string().min(2).max(20).required(),
      },
    },
  },
  handler: async ({ payload: { email, oldPassword, newPassword } }, reply) => {
    const user = await new User({ email }).fetch()

    if (!user) {
      return reply(Boom.unauthorized('User not found'))
    }

    const oldHash = bcrypt.hashSync(oldPassword, 10)
    const newHash = bcrypt.hashSync(newPassword, 10)

    if (bcrypt.compareSync(user.attributes.password, oldHash)) {
      return reply(Boom.unauthorized('Invalid password'))
    }

    try {
      await user.set('password', newHash).save()

      return reply('Password updated successfully')
    } catch (e) {
      return reply(Boom.badImplementation('Invalid request'))
    }
  },
}
