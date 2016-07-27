import Promise from 'bluebird'
import Boom from 'boom'
import Joi from 'joi'
import nodemailer from 'nodemailer'
import { v4 } from 'uuid'
import { createHmac } from 'crypto'

import PasswordResetRequest from '../models/PasswordResetRequest'
import User from '../models/User'

const { GMAIL_USER, GMAIL_PASSWORD } = process.env

const url = `smtps://${GMAIL_USER}%40gmail.com:${GMAIL_PASSWORD}@smtp.gmail.com`

const transporter = nodemailer.createTransport(url)

const mailOptions = {
  from: '<noreply@placeholdergamename.com>',
  subject: 'Reset password',
}

const sendMail = ({ to, text }) => new Promise((resolve, reject) => {
  transporter.sendMail({
    ...mailOptions,
    to,
    text,
  }, (err, info) => {
    if (err) {
      reject(err)
    }

    resolve(info)
  })
})

export default {
  method: 'POST',
  path: '/reset-pw',
  config: {
    tags: ['api'],
    validate: {
      payload: {
        email: Joi.string().email().required(),
      },
    },
  },
  handler: async ({ payload: { email } }, reply) => {
    const user = await new User({ email }).fetch()
    const uuid = v4()

    if (!user) {
      return reply(Boom.unauthorized('User not found'))
    }

    try {
      // create pw reset record
      await new PasswordResetRequest({
        user_id: user.attributes.id,
        reset_code: createHmac('sha256', uuid).digest('hex'),
      }).save()
    } catch (e) {
      console.error('pwreset record creation error', e)
      return reply(Boom.badImplementation('Invalid request'))
    }

    //TODO invalidate old pw reset records after requesting new pw reset

    try {
      // send out email with reset id
      await sendMail({ to: email, text: uuid })

      return reply(`Email to reset password sent to ${email}`)
    } catch (e) {
      console.error('sendmail error', e)
      return reply(Boom.badImplementation('Invalid request'))
    }
  },
}
