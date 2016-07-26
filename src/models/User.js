import ORM from '../orm'

export default ORM().Model.extend({
  tableName: 'users',
  hasTimestamps: true,
})
