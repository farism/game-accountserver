import ORM from '../orm'

export default ORM().Model.extend({
  tableName: 'password_reset_requests',
  hasTimestamps: true,
})
