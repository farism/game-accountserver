import bcrypt from 'bcrypt'

import ORM from './ORM'

export default ORM().Model.extend({
  tableName: 'users',
  hasTimestamps: ['inserted_at', 'updated_at'],
  initialize: function() {
    this.on('creating', (model) => {
      model.set('password', bcrypt.hashSync(model.attributes.password, 10))
    })
  },
})
