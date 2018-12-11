const Update = require('../models/Update')

class UpdateDAO {
  create (update) {
    return Update.create(update)
  }
}

module.exports = new UpdateDAO()
