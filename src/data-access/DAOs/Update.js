class UpdateDAO {
  constructor (db) {
    this.db = db
  }

  create (update) {
    return this.db.Update.create(update)
  }
}

module.exports = UpdateDAO
