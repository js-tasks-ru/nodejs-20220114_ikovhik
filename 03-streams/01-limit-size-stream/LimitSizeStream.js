const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.store = Buffer.from([]);
  }

  _transform(chunk, encoding, callback) {
    this.store = Buffer.concat([this.store, chunk]);

    if (this.store.length > this.limit) {
      this.emit('error', new LimitExceededError());
      return;
    }

    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
