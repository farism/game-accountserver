import ORM from './ORM'

export default ORM().Model.extend({
  tableName: 'users',
  hasTimestamps: true,
})
