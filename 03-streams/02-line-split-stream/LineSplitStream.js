const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.store = '';
  }

  _transform(chunk, encoding, callback) {
    const strings = Buffer.concat([chunk]).toString('utf-8').split(os.EOL);

    if (strings.length === 1) {
      this.store = this.store.concat(strings[0]);
    } else {
      strings[0] = this.store.concat(strings[0]);

      strings.forEach((el, indx, arr) => {
        if (indx === arr.length - 1) {
          this.store = el;
        } else {
          this.push(el);
        }
      });
    }

    callback();
  }

  _flush(callback) {
    this.push(this.store);
    this.store = '';
    callback();
  }
}

module.exports = LineSplitStream;
