class Response {
  constructor ({ code = 200, payload = {} }) {
    this.code = code
    this.payload = payload
  }

  respond (res) {
    res.status(this.code).send(this.payload)
  }
}

module.exports = Response
