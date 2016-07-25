import Boom from 'boom'
import Joi from 'joi'
import moment from 'moment'
import { createHmac } from 'crypto'
import { hashSync } from 'bcrypt'

import PasswordResetRequest from '../models/PasswordResetRequest'
import User from '../models/User'

export default {
  method: 'POST',
  path: '/new-pw',
  config: {
    validate: {
      payload: {
        reset_code: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(2).max(20).required(),
        passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
      },
    },
  },
  handler: async ({ payload: { password, reset_code } }, reply) => {
    const validDate = moment().subtract(1, 'd')
    const resetCodeHashed = createHmac('sha256', reset_code).digest('hex')
    const pwreset = await PasswordResetRequest
      .where('reset_code', resetCodeHashed)
      .where('created_at', '>', validDate)
      .fetch()

    if (!pwreset) {
      return reply(Boom.unauthorized('Invalid reset_code'))
    }

    try {
      const user = await new User({ id: pwreset.attributes.user_id }).fetch()
      user.set('password', hashSync(password, 10)).save()

      //TODO invalidate pw reset record after changing pw

      return reply('Password changed')
    } catch (e) {
      console.error(e)
      return reply(Boom.badImplementation('Invalid request'))
    }
  },
}
