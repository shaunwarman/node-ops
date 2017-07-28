const FS = require('fs');

const {
  IS_BUFFER,
  BUFFER_LIMIT,
  FILE_PATH,
  TO_FILE
} = process.env;

const defaults = {
  buffer: IS_BUFFER || false,
  bufferLimit: BUFFER_LIMIT || 5,
  file: TO_FILE || false,
  filePath: FILE_PATH || '/app/ops'
}

class Logger {
  constructor(options = {}) {
    this.buffer = options.buffer || defaults.buffer;
    this.bufferLimit = options.bufferLimit || defaults.bufferLimit;
    this.file = options.file || defaults.file;
    this.fileWriter = FS.createWriteStream(defaults.filePath);

    this.logs = [];
  }

  clear() {
    if (this.logs.length > 0) {
      this.logs.forEach(log => {
        if (this.file) {

        }
        else {
          console.log(JSON.stringify(log));
        }
      });
    }
  }

  log(log) {
    if (this.buffer) {
      this.logs.push(log);
      if (this.logs.length >= this.bufferLimit) {
        this.logs.forEach(log => {
          if (this.file) {

          }
          else {
            console.log(JSON.stringify(log));
          }
        });
        this.logs = [];
      }
    }
    else {
      console.log(JSON.stringify(log));
    }
  }
}

module.exports = Logger;
